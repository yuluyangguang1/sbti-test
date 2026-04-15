from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, glob, math

src_dir = "/tmp/sbti-test/public/avatars-original"
dst_dir = "/tmp/sbti-test/public/avatars-original"
backup_dir = "/tmp/sbti-test/public/avatars-original-flat"

# Backup originals first
if not os.path.exists(backup_dir):
    os.makedirs(backup_dir, exist_ok=True)
    for f in glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")):
        import shutil
        shutil.copy2(f, backup_dir)
    print(f"Backed up originals to {backup_dir}")

files = sorted(glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")))
print(f"Processing {len(files)} files")

def apply_character_3d(img):
    """Apply internal 3D lighting to the character itself"""
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    w, h = img.size
    r, g, b, a = img.split()
    
    # 1. Create a directional light gradient (top-left light source)
    # This creates a gradient that's bright on top-left, dark on bottom-right
    light = Image.new('L', (w, h))
    light_px = light.load()
    for y in range(h):
        for x in range(w):
            # Normalize to 0-1 range
            nx = x / w
            ny = y / h
            # Top-left is bright (255), bottom-right is dark (0)
            val = 1.0 - (nx * 0.5 + ny * 0.5)
            light_px[x, y] = int(val * 255)
    
    # Blur the light map for smooth transitions
    light = light.filter(ImageFilter.GaussianBlur(radius=max(8, w // 15)))
    
    # 2. Create highlight layer (bright areas where light hits)
    # Only apply where character exists (alpha > 0)
    highlight = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    highlight_px = highlight.load()
    img_px = img.load()
    light_map = light.load()
    
    for y in range(h):
        for x in range(w):
            _, _, _, pa = img_px[x, y]
            if pa > 10:
                lv = light_map[x, y]
                # Bright areas: add white tint
                if lv > 160:
                    alpha = int((lv - 160) * 0.4)
                    highlight_px[x, y] = (255, 255, 255, min(alpha, 60))
    
    # 3. Create shadow layer (dark areas)
    shadow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    shadow_px = shadow.load()
    
    for y in range(h):
        for x in range(w):
            _, _, _, pa = img_px[x, y]
            if pa > 10:
                lv = light_map[x, y]
                # Dark areas: add dark tint
                if lv < 100:
                    alpha = int((100 - lv) * 0.5)
                    shadow_px[x, y] = (20, 15, 30, min(alpha, 70))
    
    # 4. Create rim light on edges (top-left edge highlight)
    rim = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    rim_px = rim.load()
    for y in range(1, h-1):
        for x in range(1, w-1):
            _, _, _, pa = img_px[x, y]
            if pa > 100:
                # Check top-left neighbor
                _, _, _, na = img_px[x-1, y-1]
                if na < pa // 3:
                    # This is a top-left edge - add rim light
                    rim_px[x, y] = (255, 255, 240, 45)
    
    rim = rim.filter(ImageFilter.GaussianBlur(radius=1))
    
    # 5. Create ambient occlusion on bottom-right edges
    ao = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    ao_px = ao.load()
    for y in range(1, h-1):
        for x in range(1, w-1):
            _, _, _, pa = img_px[x, y]
            if pa > 100:
                _, _, _, na = img_px[x+1, y+1]
                if na < pa // 3:
                    ao_px[x, y] = (15, 10, 25, 40)
    
    ao = ao.filter(ImageFilter.GaussianBlur(radius=1))
    
    # 6. Composite everything
    result = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    result = Image.alpha_composite(result, img)        # Base character
    result = Image.alpha_composite(result, ao)          # Ambient occlusion (dark edges)
    result = Image.alpha_composite(result, shadow)      # Directional shadow
    result = Image.alpha_composite(result, highlight)   # Directional highlight
    result = Image.alpha_composite(result, rim)         # Rim light
    
    # 7. Final enhancements
    result_rgb = result.convert('RGB')
    result_rgb = ImageEnhance.Contrast(result_rgb).enhance(1.15)
    result_rgb = ImageEnhance.Color(result_rgb).enhance(1.05)
    result_rgb = ImageEnhance.Sharpness(result_rgb).enhance(1.1)
    
    # Add back alpha
    final = result_rgb.convert('RGBA')
    final.putalpha(a.split()[0])
    
    return final

for fpath in files:
    fname = os.path.basename(fpath)
    print(f"Processing {fname}...")
    img = Image.open(fpath)
    result = apply_character_3d(img)
    result.save(fpath, "PNG")

print(f"\nDone! {len(files)} images updated in-place")
print(f"Originals backed up to {backup_dir}")
