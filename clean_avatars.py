from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, glob, shutil

src_dir = "/tmp/sbti-test/public/avatars-original"

files = sorted(glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")))
print(f"Processing {len(files)} files")

def process_avatar(img):
    """Remove text, enlarge character, keep 3D lighting"""
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    w, h = img.size
    pixels = img.load()
    
    # Step 1: Find character bounding box (skip white and transparent pixels)
    min_x, min_y, max_x, max_y = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 80 and not (r > 248 and g > 248 and b > 248):
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    
    if max_x <= min_x or max_y <= min_y:
        return img
    
    # Add small padding around character
    pad = 8
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(w, max_x + pad)
    max_y = min(h, max_y + pad)
    
    print(f"  Character: ({min_x},{min_y})-({max_x},{max_y})")
    
    # Step 2: Crop to character area only
    char_img = img.crop((min_x, min_y, max_x, max_y))
    char_w, char_h = char_img.size
    
    # Step 3: Scale character to fill most of the canvas
    target_size = 800
    # Scale up to 85% of canvas
    scale = (target_size * 0.85) / max(char_w, char_h)
    new_w = int(char_w * scale)
    new_h = int(char_h * scale)
    char_img = char_img.resize((new_w, new_h), Image.LANCZOS)
    
    # Step 4: Create clean canvas with character centered
    canvas = Image.new('RGBA', (target_size, target_size), (255, 255, 255, 255))
    ox = (target_size - new_w) // 2
    oy = (target_size - new_h) // 2 - 10  # Slight upward offset for aesthetics
    
    # Paste character
    canvas.paste(char_img, (ox, oy), char_img)
    
    # Step 5: Add subtle shadow below character
    shadow = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    sw = int(new_w * 0.45)
    sh = int(new_h * 0.03)
    cx = target_size // 2
    cy = oy + new_h + 5
    shadow_draw.ellipse(
        [cx - sw, cy - sh, cx + sw, cy + sh],
        fill=(50, 40, 60, 30)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=8))
    canvas = Image.alpha_composite(canvas, shadow)
    
    # Step 6: 3D lighting on character
    char_pixels = canvas.load()
    char_cx = target_size / 2
    char_cy = oy + new_h / 2
    
    for y in range(oy - 5, oy + new_h + 5):
        for x in range(ox - 5, ox + new_w + 5):
            if 0 <= x < target_size and 0 <= y < target_size:
                r, g, b, a = char_pixels[x, y]
                if a > 80 and not (r > 248 and g > 248 and b > 248):
                    # Light gradient: top-left bright, bottom-right dark
                    nx = (x - ox) / new_w
                    ny = (y - oy) / new_h
                    light = 1.0 - (nx * 0.5 + ny * 0.5)
                    
                    if light > 0.6:
                        factor = 1.0 + (light - 0.6) * 0.7
                        r = min(255, int(r * factor))
                        g = min(255, int(g * factor))
                        b = min(255, int(b * factor))
                    elif light < 0.4:
                        factor = max(0.7, light / 0.4)
                        r = int(r * factor)
                        g = int(g * factor)
                        b = int(b * factor)
                    
                    char_pixels[x, y] = (r, g, b, a)
    
    # Step 7: Edge rim light
    alpha_img = canvas.split()[3]
    edges = alpha_img.filter(ImageFilter.FIND_EDGES)
    edge_px = edges.load()
    
    for y in range(1, target_size - 1):
        for x in range(1, target_size - 1):
            if edge_px[x, y] > 30:
                r, g, b, a = char_pixels[x, y]
                if a > 80:
                    _, _, _, na_tl = char_pixels[x-1, y-1]
                    _, _, _, na_br = char_pixels[x+1, y+1]
                    if na_tl < 50:
                        r = min(255, r + 35)
                        g = min(255, g + 35)
                        b = min(255, b + 30)
                        char_pixels[x, y] = (r, g, b, a)
                    elif na_br < 50:
                        r = max(0, r - 25)
                        g = max(0, g - 25)
                        b = max(0, b - 20)
                        char_pixels[x, y] = (r, g, b, a)
    
    # Final quality
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

print(f"\nDone! All avatars cleaned and enlarged.")
