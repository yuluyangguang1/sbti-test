from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, glob

src_dir = "/tmp/sbti-test/public/avatars-original"

# Restore from flat backup
backup_dir = "/tmp/sbti-test/public/avatars-original-flat"
if os.path.exists(backup_dir):
    import shutil
    for f in glob.glob(os.path.join(backup_dir, "*")):
        shutil.copy2(f, src_dir)
    print("Restored from backup")

files = sorted(glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")))
print(f"Processing {len(files)} files")

def find_text_gap_y(img):
    """Find the Y coordinate where text ends and gap before character begins"""
    w, h = img.size
    pixels = img.load()
    
    # Scan rows from top, find the gap between text and character
    # Text region: rows with non-white pixels at the top
    # Gap: rows that are mostly white (low density of non-white pixels)
    # Character: rows with high density of non-white pixels
    
    row_densities = []
    for y in range(h):
        non_white_count = 0
        for x in range(w // 4, 3 * w // 4):  # Check center columns only
            r, g, b, a = pixels[x, y]
            if a > 80 and r < 200 and g < 200 and b < 200:
                non_white_count += 1
        row_densities.append(non_white_count)
    
    # Find the transition: from low density (text/gap) to high density (character)
    # First find the text region (top section with some non-white pixels)
    text_end_y = 0
    in_text = False
    found_gap = False
    
    for y in range(h):
        density = row_densities[y]
        if density > 10 and y < h * 0.3:
            in_text = True
        elif in_text and density < 5:
            found_gap = True
            text_end_y = y
            break
    
    if not found_gap:
        # Fallback: estimate text region is top 25%
        text_end_y = int(h * 0.22)
    
    return text_end_y

def find_character_bottom_y(img):
    """Find where character ends (before bottom text)"""
    w, h = img.size
    pixels = img.load()
    
    # Scan from bottom up
    for y in range(h - 1, int(h * 0.5), -1):
        non_white_count = 0
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 80 and r < 200 and g < 200 and b < 200:
                non_white_count += 1
        if non_white_count > 10:
            # Found character at this row
            # Add small padding below
            return min(y + 10, h)
    
    return h

def process_avatar(img):
    """Remove text, enlarge character to fill canvas"""
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    w, h = img.size
    
    # Find text/character boundaries
    text_gap_y = find_text_gap_y(img)
    char_bottom_y = find_character_bottom_y(img)
    
    # Find left/right bounds of character
    pixels = img.load()
    min_x, max_x = w, 0
    for y in range(text_gap_y, char_bottom_y):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 80 and r < 200 and g < 200 and b < 200:
                min_x = min(min_x, x)
                max_x = max(max_x, x)
    
    if max_x <= min_x:
        print(f"  WARN: no character found, skipping crop")
        return img
    
    # Add padding
    pad_x = 5
    pad_top = 5
    pad_bottom = 15
    crop_box = (
        max(0, min_x - pad_x),
        max(0, text_gap_y - pad_top),
        min(w, max_x + pad_x),
        min(h, char_bottom_y + pad_bottom)
    )
    
    print(f"  Text gap at y={text_gap_y}, char bottom={char_bottom_y}")
    print(f"  Crop box: {crop_box}")
    
    # Crop character
    char_img = img.crop(crop_box)
    char_w, char_h = char_img.size
    
    # Scale to fill canvas (90%)
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
    shadow_draw.ellipse([cx - sw, cy - sh, cx + sw, cy + sh], fill=(50, 40, 60, 28))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=8))
    canvas = Image.alpha_composite(canvas, shadow)
    
    # 3D lighting on character pixels
    cpx = canvas.load()
    for y in range(max(0, oy - 5), min(target, oy + new_h + 5)):
        for x in range(max(0, ox - 5), min(target, ox + new_w + 5)):
            r, g, b, a = cpx[x, y]
            if a > 80 and r < 200 and g < 200 and b < 200:
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
    alpha = canvas.split()[3]
    edges = alpha.filter(ImageFilter.FIND_EDGES)
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
    result = ImageEnhance.Sharpness(result).enhance(1.12)
    return result.convert('RGBA')

for fpath in files:
    fname = os.path.basename(fpath)
    if fname.endswith('.jpg'):
        continue
    print(f"Processing {fname}...")
    img = Image.open(fpath)
    result = process_avatar(img)
    result.save(fpath, "PNG")

print("\nDone!")
