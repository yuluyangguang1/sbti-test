from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, glob, math, shutil

src_dir = "/tmp/sbti-test/public/avatars-original"
backup_dir = "/tmp/sbti-test/public/avatars-original-flat"

# Restore from backup
if os.path.exists(backup_dir):
    for f in glob.glob(os.path.join(backup_dir, "*")):
        shutil.copy2(f, src_dir)
    print("Restored from backup")
else:
    print("No backup found, using current files")

files = sorted(glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")))
print(f"Processing {len(files)} files")

def apply_character_3d(img):
    """Modify character PIXELS directly for 3D lighting"""
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    w, h = img.size
    pixels = img.load()
    
    # Step 1: Find character bounding box (non-white, non-transparent area)
    min_x, min_y, max_x, max_y = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # Character pixels: not pure white and not transparent
            if a > 50 and not (r > 245 and g > 245 and b > 245):
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    
    if max_x <= min_x or max_y <= min_y:
        return img
    
    char_w = max_x - min_x
    char_h = max_y - min_y
    char_cx = (min_x + max_x) / 2
    char_cy = (min_y + max_y) / 2
    
    print(f"  Character bbox: ({min_x},{min_y})-({max_x},{max_y}) size={char_w}x{char_h}")
    
    # Step 2: Create a light direction gradient within character area
    # Light from top-left (45 degrees)
    light_map = {}
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            r, g, b, a = pixels[x, y]
            if a > 50 and not (r > 245 and g > 245 and b > 245):
                # Normalize position within character (0-1)
                nx = (x - min_x) / char_w
                ny = (y - min_y) / char_h
                # Light value: top-left = 1.0, bottom-right = 0.0
                light = 1.0 - (nx * 0.6 + ny * 0.4)
                light_map[(x, y)] = light
    
    # Step 3: Apply brightness adjustment to character pixels
    for (x, y), light in light_map.items():
        r, g, b, a = pixels[x, y]
        
        # Calculate brightness multiplier
        # Light areas: brighten up to 40%
        # Dark areas: darken up to 30%
        if light > 0.55:
            # Bright area
            factor = 1.0 + (light - 0.55) * 0.9  # up to 1.4x
            r = min(255, int(r * factor))
            g = min(255, int(g * factor))
            b = min(255, int(b * factor))
        elif light < 0.45:
            # Dark area
            factor = light / 0.45  # down to 0.0... but clamp
            factor = max(0.65, factor)  # don't go below 0.65
            r = int(r * factor)
            g = int(g * factor)
            b = int(b * factor)
        
        pixels[x, y] = (r, g, b, a)
    
    # Step 4: Detect and enhance edges
    # Create edge map from alpha channel
    alpha_img = img.split()[3]
    edges = alpha_img.filter(ImageFilter.FIND_EDGES)
    edge_px = edges.load()
    
    # Add rim light on top-left edges, shadow on bottom-right
    for y in range(1, h-1):
        for x in range(1, w-1):
            edge_val = edge_px[x, y]
            if edge_val > 30:
                r, g, b, a = pixels[x, y]
                if a > 50:
                    # Check if this is a top-left edge (neighbor is background)
                    _, _, _, na_tl = pixels[x-1, y-1]
                    _, _, _, na_br = pixels[x+1, y+1]
                    
                    if na_tl < 50:
                        # Top-left edge: add bright rim
                        r = min(255, r + 40)
                        g = min(255, g + 40)
                        b = min(255, b + 35)
                        pixels[x, y] = (r, g, b, a)
                    elif na_br < 50:
                        # Bottom-right edge: darken
                        r = max(0, r - 30)
                        g = max(0, g - 30)
                        b = max(0, b - 25)
                        pixels[x, y] = (r, g, b, a)
    
    # Step 5: Add a subtle shadow below character (on the white background)
    shadow_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    shadow_w = int(char_w * 0.5)
    shadow_h = int(char_h * 0.04)
    shadow_cx = int(char_cx)
    shadow_cy = max_y + 8
    shadow_draw.ellipse(
        [shadow_cx - shadow_w, shadow_cy - shadow_h, shadow_cx + shadow_w, shadow_cy + shadow_h],
        fill=(50, 40, 60, 35)
    )
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=max(6, char_w // 20)))
    
    result = Image.alpha_composite(img, shadow_layer)
    
    # Step 6: Final quality boost
    result_rgb = result.convert('RGB')
    result_rgb = ImageEnhance.Contrast(result_rgb).enhance(1.12)
    result_rgb = ImageEnhance.Sharpness(result_rgb).enhance(1.15)
    
    final = result_rgb.convert('RGBA')
    final.putalpha(result.split()[3])
    
    return final

for fpath in files:
    fname = os.path.basename(fpath)
    if fname.endswith('.jpg'):
        continue  # Skip jpg, only process png
    print(f"Processing {fname}...")
    img = Image.open(fpath)
    result = apply_character_3d(img)
    result.save(fpath, "PNG")

print(f"\nDone!")
