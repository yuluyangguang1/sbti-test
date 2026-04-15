from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, glob, shutil

src_dir = "/tmp/sbti-test/public/avatars-original"

# Restore from backup
backup_dir = "/tmp/sbti-test/public/avatars-original-flat"
if os.path.exists(backup_dir):
    for f in glob.glob(os.path.join(backup_dir, "*")):
        shutil.copy2(f, src_dir)
    print("Restored from backup")

files = sorted(glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")))
print(f"Processing {len(files)} files")

def process_avatar(img):
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    w, h = img.size  # expect ~800x800
    
    # Fixed crop: remove top ~20% (text area) and bottom ~5% (footer)
    # Text typically occupies y=0 to ~140
    # Footer text at y=~770-800
    crop_top = int(h * 0.26)     # ~208px - cut ALL text (title + name + code)
    crop_bottom = int(h * 0.91)  # ~728px - cut footer text
    
    # Find horizontal bounds of character in the cropped region
    pixels = img.load()
    min_x, max_x = w, 0
    for y in range(crop_top, crop_bottom):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 80 and not (r > 248 and g > 248 and b > 248):
                min_x = min(min_x, x)
                max_x = max(max_x, x)
    
    if max_x <= min_x:
        min_x, max_x = 0, w
    
    # Crop with small horizontal padding
    pad = 8
    crop_box = (
        max(0, min_x - pad),
        crop_top,
        min(w, max_x + pad),
        crop_bottom
    )
    
    char_img = img.crop(crop_box)
    char_w, char_h = char_img.size
    
    # Scale to fill 90% of 800x800 canvas
    target = 800
    scale = (target * 0.92) / max(char_w, char_h)
    new_w = int(char_w * scale)
    new_h = int(char_h * scale)
    char_img = char_img.resize((new_w, new_h), Image.LANCZOS)
    
    # Center on clean canvas
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
    
    # 3D lighting on character
    cpx = canvas.load()
    for y in range(max(0, oy - 3), min(target, oy + new_h + 3)):
        for x in range(max(0, ox - 3), min(target, ox + new_w + 3)):
            r, g, b, a = cpx[x, y]
            if a > 80 and not (r > 248 and g > 248 and b > 248):
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
    img = Image.open(fpath)
    result = process_avatar(img)
    result.save(fpath, "PNG")

print("\nDone!")
