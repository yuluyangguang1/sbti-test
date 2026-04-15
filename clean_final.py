from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, glob, shutil

src_dir = "/tmp/sbti-test/public/avatars-original"

# Restore from backup
backup_dir = "/tmp/sbti-test/public/avatars-original-flat"
if os.path.exists(backup_dir):
    for f in glob.glob(os.path.join(backup_dir, "*")):
        fname = os.path.basename(f)
        if fname.endswith(('.png', '.jpg')):
            shutil.copy2(f, src_dir)

files = sorted(glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")))
print(f"Processing {len(files)} files")

def process_avatar(fpath):
    img = Image.open(fpath)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    w, h = img.size
    pixels = img.load()
    
    # Count non-white pixels per row (sampled)
    row_counts = []
    for y in range(h):
        count = sum(1 for x in range(0, w, 3) 
                    if pixels[x, y][3] > 80 and pixels[x, y][0] < 220)
        row_counts.append(count)
    
    # Smooth the counts
    smoothed = []
    for y in range(h):
        window = row_counts[max(0,y-3):min(h,y+4)]
        smoothed.append(sum(window) / len(window))
    
    # Find the densest region - that's the character body
    # Use a sliding window to find the region with highest total density
    best_score = 0
    best_start = 0
    best_end = 0
    
    # Try windows of various sizes (character body is typically 300-600px tall)
    for win_size in range(200, 500, 10):
        for start in range(0, h - win_size, 5):
            score = sum(smoothed[start:start+win_size])
            if score > best_score:
                best_score = score
                best_start = start
                best_end = start + win_size
    
    # Find horizontal bounds within the character region
    min_x, max_x = w, 0
    for y in range(best_start, best_end):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 80 and r < 220 and g < 220 and b < 220:
                min_x = min(min_x, x)
                max_x = max(max_x, x)
    
    if max_x <= min_x:
        min_x, max_x = 0, w
    
    print(f"  Character: y={best_start}-{best_end} ({best_end-best_start}px), x={min_x}-{max_x}")
    
    # Crop with padding
    pad = 12
    crop_box = (
        max(0, min_x - pad),
        best_start,
        min(w, max_x + pad),
        best_end
    )
    
    char_img = img.crop(crop_box)
    cw, ch = char_img.size
    
    # Scale to 92% of canvas
    target = 800
    scale = (target * 0.92) / max(cw, ch)
    nw, nh = int(cw * scale), int(ch * scale)
    char_img = char_img.resize((nw, nh), Image.LANCZOS)
    
    # Clean canvas
    canvas = Image.new('RGBA', (target, target), (255, 255, 255, 255))
    ox = (target - nw) // 2
    oy = (target - nh) // 2
    canvas.paste(char_img, (ox, oy), char_img)
    
    # Ground shadow
    shadow = Image.new('RGBA', (target, target), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([target//2 - int(nw*0.4), oy+nh+4, target//2 + int(nw*0.4), oy+nh+int(nh*0.03)+4],
               fill=(50, 40, 60, 30))
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(radius=8)))
    
    # 3D lighting
    cpx = canvas.load()
    for y in range(max(0, oy-3), min(target, oy+nh+3)):
        for x in range(max(0, ox-3), min(target, ox+nw+3)):
            r, g, b, a = cpx[x, y]
            if a > 80 and not (r > 245 and g > 245 and b > 245):
                nx = (x - ox) / nw
                ny = (y - oy) / nh
                light = 1.0 - (nx * 0.5 + ny * 0.5)
                if light > 0.6:
                    f = 1.0 + (light - 0.6) * 0.7
                    r, g, b = min(255, int(r*f)), min(255, int(g*f)), min(255, int(b*f))
                elif light < 0.4:
                    f = max(0.7, light / 0.4)
                    r, g, b = int(r*f), int(g*f), int(b*f)
                cpx[x, y] = (r, g, b, a)
    
    # Rim light
    alpha = canvas.split()[3]
    edges = alpha.filter(ImageFilter.FIND_EDGES)
    epx = edges.load()
    for y in range(1, target-1):
        for x in range(1, target-1):
            if epx[x, y] > 30:
                r, g, b, a = cpx[x, y]
                if a > 80:
                    _, _, _, na = cpx[x-1, y-1]
                    if na < 50:
                        cpx[x, y] = (min(255,r+30), min(255,g+30), min(255,b+25), a)
                    _, _, _, na2 = cpx[x+1, y+1]
                    if na2 < 50:
                        cpx[x, y] = (max(0,r-20), max(0,g-20), max(0,b-15), a)
    
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
