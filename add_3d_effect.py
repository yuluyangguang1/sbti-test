from PIL import Image, ImageFilter, ImageDraw, ImageEnhance
import os, glob

src_dir = "/tmp/sbti-test/public/avatars-original"
dst_dir = "/tmp/sbti-test/public/avatars-original-3d"
os.makedirs(dst_dir, exist_ok=True)

TARGET_W, TARGET_H = 800, 800

files = sorted(glob.glob(os.path.join(src_dir, "*.png")) + glob.glob(os.path.join(src_dir, "*.jpg")))
print(f"Found {len(files)} files")

def add_3d_effect(img):
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    orig_w, orig_h = img.size
    pad = 50
    max_cw = TARGET_W - pad * 2
    max_ch = TARGET_H - pad * 2
    scale = min(max_cw / orig_w, max_ch / orig_h)
    nw, nh = int(orig_w * scale), int(orig_h * scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    ox = (TARGET_W - nw) // 2
    oy = (TARGET_H - nh) // 2
    
    canvas = Image.new('RGBA', (TARGET_W, TARGET_H), (255, 255, 255, 255))
    
    # === 1. Multi-layer drop shadow for depth ===
    r, g, b, a = img.split()
    
    # Layer 1: Close, dark shadow
    s1 = Image.new('RGBA', img.size, (45, 35, 55, 65))
    s1.putalpha(a)
    sl1 = Image.new('RGBA', (TARGET_W, TARGET_H), (0, 0, 0, 0))
    sl1.paste(s1, (ox + 5, oy + 5))
    sl1 = sl1.filter(ImageFilter.GaussianBlur(radius=8))
    canvas = Image.alpha_composite(canvas, sl1)
    
    # Layer 2: Far, soft shadow
    s2 = Image.new('RGBA', img.size, (50, 40, 60, 35))
    s2.putalpha(a)
    sl2 = Image.new('RGBA', (TARGET_W, TARGET_H), (0, 0, 0, 0))
    sl2.paste(s2, (ox + 12, oy + 14))
    sl2 = sl2.filter(ImageFilter.GaussianBlur(radius=18))
    canvas = Image.alpha_composite(canvas, sl2)
    
    # === 2. Paste character ===
    cl = Image.new('RGBA', (TARGET_W, TARGET_H), (0, 0, 0, 0))
    cl.paste(img, (ox, oy))
    canvas = Image.alpha_composite(canvas, cl)
    
    # === 3. Strong edge bevel — top-left light source ===
    # Create inner shadow (ambient occlusion) on bottom-right edges
    inner_shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    is_draw = ImageDraw.Draw(inner_shadow)
    pixels = img.load()
    is_pixels = inner_shadow.load()
    for y in range(nh):
        for x in range(nw):
            _, _, _, pa = pixels[x, y]
            if pa > 100:
                # Check if this pixel is on the edge (neighbor is transparent or different)
                is_edge = False
                for dx, dy in [(1, 0), (0, 1), (1, 1)]:
                    nx2, ny2 = x + dx, y + dy
                    if nx2 < nw and ny2 < nh:
                        _, _, _, na = pixels[nx2, ny2]
                        if na < pa // 2:
                            is_edge = True
                            break
                if is_edge:
                    # Dark edge on bottom-right (ambient occlusion)
                    is_pixels[x, y] = (30, 25, 40, 45)
    
    is_layer = Image.new('RGBA', (TARGET_W, TARGET_H), (0, 0, 0, 0))
    is_layer.paste(inner_shadow, (ox, oy))
    canvas = Image.alpha_composite(canvas, is_layer)
    
    # Highlight on top-left edges
    highlight = Image.new('RGBA', img.size, (0, 0, 0, 0))
    hl_px = highlight.load()
    for y in range(nh):
        for x in range(nw):
            _, _, _, pa = pixels[x, y]
            if pa > 100:
                is_edge = False
                for dx, dy in [(-1, 0), (0, -1), (-1, -1)]:
                    nx2, ny2 = x + dx, y + dy
                    if 0 <= nx2 < nw and 0 <= ny2 < nh:
                        _, _, _, na = pixels[nx2, ny2]
                        if na < pa // 2:
                            is_edge = True
                            break
                    else:
                        is_edge = True
                if is_edge:
                    hl_px[x, y] = (255, 255, 255, 50)
    
    hl_layer = Image.new('RGBA', (TARGET_W, TARGET_H), (0, 0, 0, 0))
    hl_layer.paste(highlight, (ox, oy))
    hl_layer = hl_layer.filter(ImageFilter.GaussianBlur(radius=1))
    canvas = Image.alpha_composite(canvas, hl_layer)
    
    # === 4. Ground contact shadow ===
    ground = Image.new('RGBA', (TARGET_W, TARGET_H), (0, 0, 0, 0))
    gs_draw = ImageDraw.Draw(ground)
    sw = int(nw * 0.5)
    sh = int(nh * 0.04)
    cx = TARGET_W // 2
    cy = oy + nh + 6
    gs_draw.ellipse(
        [cx - sw // 2, cy - sh, cx + sw // 2, cy + sh],
        fill=(40, 30, 50, 50)
    )
    ground = ground.filter(ImageFilter.GaussianBlur(radius=10))
    canvas = Image.alpha_composite(canvas, ground)
    
    # === 5. Final processing ===
    out = canvas.convert('RGB')
    out = ImageEnhance.Contrast(out).enhance(1.15)
    out = ImageEnhance.Color(out).enhance(1.08)
    out = ImageEnhance.Sharpness(out).enhance(1.12)
    
    return out

for fpath in files:
    fname = os.path.basename(fpath)
    print(f"Processing {fname}...")
    img = Image.open(fpath)
    result = add_3d_effect(img)
    out_name = os.path.splitext(fname)[0] + ".png"
    result.save(os.path.join(dst_dir, out_name), "PNG")

print(f"\nDone! {len(files)} images -> {dst_dir}")
