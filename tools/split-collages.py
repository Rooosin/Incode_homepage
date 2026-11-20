# Splits collage photos (several pictures joined with white gutters) into separate files.
#   python tools/split-collages.py          -> dry run: shows how each photo would be split
#   python tools/split-collages.py --apply  -> writes <name>-a.jpg, -b.jpg ... and updates data/photos.js
import re, sys
import numpy as np
from PIL import Image

APPLY = "--apply" in sys.argv
MIN = 80  # smallest piece (px) we accept, so thin white strips inside one photo are not mistaken for gutters

def gutters(white, axis):
    """runs of lines (rows if axis=1, columns if axis=0) that are almost entirely white"""
    full = white.mean(axis=axis) > 0.97
    runs, start = [], None
    for i, f in enumerate(list(full) + [False]):
        if f and start is None: start = i
        if not f and start is not None: runs.append((start, i)); start = None
    return runs

def split(a, box, depth=0):
    x0, y0, x1, y1 = box
    region = a[y0:y1, x0:x1]
    white = (region.min(axis=2) > 236)
    for axis in (0, 1):  # try columns first, then rows
        runs = gutters(white, axis)
        n = white.shape[1] if axis == 0 else white.shape[0]
        cuts, last = [], 0
        for s, e in runs:
            if s - last >= MIN: cuts.append((last, s))
            last = e
        if n - last >= MIN: cuts.append((last, n))
        if len(cuts) > 1:
            out = []
            for s, e in cuts:
                sub = (x0 + s, y0, x0 + e, y1) if axis == 0 else (x0, y0 + s, x1, y0 + e)
                out += split(a, sub, depth + 1)
            return out
    # trim leftover white border around a single picture
    ys, xs = np.where(~white)
    if len(xs) == 0: return []
    return [(x0 + xs.min(), y0 + ys.min(), x0 + xs.max() + 1, y0 + ys.max() + 1)]

data = open("data/photos.js", encoding="utf8").read()
paths = re.findall(r'"(photos/[^"]+\.jpg)"', data)
total = 0
for p in paths:
    im = Image.open("img/" + p).convert("RGB")
    boxes = split(np.asarray(im), (0, 0, im.width, im.height))
    total += max(1, len(boxes))
    if len(boxes) <= 1: continue
    print(f"{p}: {len(boxes)} pieces", [f"{b[2]-b[0]}x{b[3]-b[1]}" for b in boxes])
    if APPLY:
        stem = p[:-4]; names = []
        for k, b in enumerate(boxes):
            name = f"{stem}-{chr(97 + k)}.jpg"; names.append(name)
            im.crop(b).save("img/" + name, quality=90)
        data = data.replace(f'"{p}"', ", ".join(f'"{n}"' for n in names))
print("photos:", len(paths), "-> after split:", total)
if APPLY: open("data/photos.js", "w", encoding="utf8", newline="").write(data)
