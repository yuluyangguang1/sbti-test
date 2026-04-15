from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, glob, shutil

src_dir = "/tmp/sbti-test/public/avatars-original"

# Restore from the TRUE original (avatars-original-flat has the original untouched files)
backup_dir = "/tmp/sbti-test/public/avatars-original-flat"
if os.path.exists(backup_dir):
    for f in glob.glob(os.path.join(backup_dir, "*")):
        fname = os.path.basename(f)
        if fname.endswith(('.png', '.jpg')):
            shutil.copy2(f, src_dir)
    print("Restored from flat backup")

files = sorted(glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")))
print(f"Processing {len(files)} files")

def process_avatar(fpath):
    img = Image.open(fpath)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    w, h = img.size
    pixels = img.load()
    
    # Step 1: Find the CHARACTER bounds (skip text area)
    # Scan all non-white pixels
    char_min_y = h
    char_max_y = 0
    char_min_x = w
    char_max_x = 0
    
    # Track row densities to find text vs character
    row_densities = []
    for y in range(h):
        count = 0
        for x in range(0, w, 4):  # Sample every 4th pixel for speed
            r, g, b, a = pixels[x, y]
            if a > 80 and r < 220 and g < 220 and b < 220:
                count += 1
        row_densities.append(count)
    
    # Find the main character block: the tallest continuous non-white region
    # Skip the text region at the top (usually low density, scattered)
    # Character has HIGH density over a large vertical span
    
    # Find all regions with density > threshold
    threshold = w // 20  # At least ~40 non-white pixels per row
    in_region = False
    regions = []
    region_start = 0
    
    for y in range(h):
        if row_densities[y] > threshold:
            if not in_region:
                region_start = y
                in_region = True
        else:
            if in_region:
                regions.append((region_start, y, y - region_start))
                in_region = False
    if in_region:
        regions.append((region_start, h, h - region_start))
    
    # Find the tallest region (that's the character)
    if regions:
        regions.sort(key=lambda r: -r[2])
        char_start_y = regions[0][0]
        char_end_y = regions[0][1]
        
        # But if there are multiple close regions, merge them
        all_y_start = min(r[0] for r in regions if r[2] > 50)
        all_y_end = max(r[1] for r in regions if r[2] > 50)
        
        # Find horizontal bounds in the character region
        for y in range(all_y_start, all_y_end):
            for x in range(w):
                r, g, b, a = pixels[x, y]
                if a > 80 and r < 220 and g < 220 and b < 220:
                    char_min_x = min(char_min_x, x)
                    char_max_x = max(char_max_x, x)
        
        char_min_y = all_y_start
        char_max_y = all_y_end
    else:
        # Fallback
        char_min_y = int(h * 0.42)
        char_max_y = int(h * 0.88)
        char_min_x = 0
        char_max_x = w
    
    print(f"  Character: y={char_min_y}-{char_max_y}, x={char_min_x}-{char_max_x}")
    print(f"  Regions: {regions[:3]}")
    
    # Crop with padding
    pad = 10
    crop_box = (
        max(0, char_min_x - pad),
        max(0, char_min_y - pad),
        min(w, char_max_x + pad),
        min(h, char_max_y + pad)
    )
    
    char_img = img.crop(crop_box)
    char_w, char_h = char_img.size
    
    # Scale to fill 92% of 800x800 canvas
    target = 800
    scale = (target * 0.92) / max(char_w, char_h)
    new_w = int(char_w * scale)
    new_h = int(char_h * scale)
    char_img = char_img.resize((new_w, new_h), Image.LANCZOS)
    
    # Create clean canvas
    canvas = Image.new('RGBA', (target, target), (255, 255, 255, 255))
    ox = (target - new_w) // 2
    oy = (target - new_h) // 2
    canvas.paste(char_img, (ox, oy), char_img)
    
    # Ground shadow
    shadow = Image.new('RGBA', (target, target), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    sw = int(new_w * 0.4)
    sh = int(new_h * 0.03)
    cx = target // 2
    cy = oy + new_h + 4
    shadow_draw.ellipse([cx - sw, cy - sh, cx + sw, cy + sh], fill=(50, 40, 60, 30))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=8))
    canvas = Image.alpha_composite(canvas, shadow)
    
    # 3D lighting
    cpx = canvas.load()
    for y in range(max(0, oy - 3), min(target, oy + new_h + 3)):
        for x in range(max(0, ox - 3), min(target, ox + new_w + 3)):
            r, g, b, a = cpx[x, y]
            if a > 80 and not (r > 245 and g > 245 and b > 245):
                nx = (x - ox) / new_w
                ny = (y - oy) / new_h
                light = 1.0 - (nx * 0.5 + ny * 0.5)
                if light > 0.6:
                    f = 1.0 + (light - 0.6) * 0.7
                    r, g, b = min(255, int(r * f)), min(255, int(g * f)), min(255, int(b * f))
                elif light < 0.4:
                    f = max(0.7, light / 0.4)
                    r, g, b = int(r * f), int(g * f), int(b * f)
                cpx[x, y] = (r, g, b, a)
    
    # Rim light
    alpha_img = canvas.split()[3]
    edges = alpha_img.filter(ImageFilter.FIND_EDGES)
    epx = edges.load()
    for y in range(1, target - 1):
        for x in range(1, target - 1):
            if epx[x, y] > 30:
                r, g, b, a = cpx[x, y]
                if a > 80:
                    _, _, _, na = cpx[x-1, y-1]
                    if na < 50:
                        cpx[x, y] = (min(255, r+30), min(255, g+30), min(255, b+25), a)
                    _, _, _, na2 = cpx[x+1, y+1]
                    if na2 < 50:
                        cpx[x, y] = (max(0, r-20), max(0, g-20), max(0, b-15), a)
    
    result = canvas.convert('RGB')
    result = ImageEnhance.Contrast(result).enhance(1.10)
    return result.convert('RGBA')

for fpath in files:
    fname = os.path.basename(fpath)
    if fname.endswith('.jpg'):
        continue
    print(f"{fname}...")
    result = process_avatar(fpath)
    result.save(fpath, "PNG")

print("\nDone!")
