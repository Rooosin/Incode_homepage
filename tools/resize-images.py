# Shrinks photos so the site stays fast: width <= 1600px, JPEG quality 85.
# GitHub Actions runs this on every new or changed image. You can also run it by hand:
#   python tools/resize-images.py img/photos/2026/2026-10-20.jpg ...   (no arguments = every image under img/)
import sys, pathlib
from PIL import Image, ImageOps

MAX_W, MAX_BYTES = 1600, 600_000
files = sys.argv[1:] or [str(p) for p in pathlib.Path("img").rglob("*")]
done = []
for f in files:
    p = pathlib.Path(f)
    ext = p.suffix.lower()
    if ext not in (".jpg", ".jpeg", ".png", ".webp") or not p.is_file():
        continue
    im = Image.open(p)
    if im.width <= MAX_W and p.stat().st_size <= MAX_BYTES:
        continue
    before = (im.width, im.height, p.stat().st_size)
    # phone photos store rotation in EXIF: apply it, because saving drops EXIF (this also removes GPS location)
    im = ImageOps.exif_transpose(im)
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    if ext in (".jpg", ".jpeg"):
        im.convert("RGB").save(p, quality=85, optimize=True)
    elif ext == ".webp":
        im.save(p, quality=85)
    else:
        im.save(p, optimize=True)
    done.append(f"{p}: {before[0]}x{before[1]} {before[2] // 1024}KB -> {im.width}x{im.height} {p.stat().st_size // 1024}KB")
print("\n".join(done) or "nothing to resize")
