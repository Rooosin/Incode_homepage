# Makes the board behind a photo collage (the white or ivory gutters between pictures and the outer margins) transparent,
# so the collage sits on whatever is behind it: the ivory News page, or the dark Home news card.
# Paper inside the pictures (posters, certificates) stays as it is.
#   python tools/clear-gutters.py img/news/2026-11-11.jpg ...   -> writes img/news/2026-11-11.webp next to it (the .jpg is left alone)
# Then point data/news.js at the .webp file.
import sys, pathlib, runpy
import numpy as np
from PIL import Image

files, sys.argv = sys.argv[1:], sys.argv[:1]  # cream-gutters.py reads sys.argv when loaded; give it nothing to do
mark = runpy.run_path(str(pathlib.Path(__file__).with_name("cream-gutters.py")), run_name="lib")["mark"]

def strips(board, mask, box, depth=0):
    """straight ivory strips running right across this piece (columns, then rows), then the same inside each piece between them"""
    x0, y0, x1, y1 = box
    b = board[y0:y1, x0:x1]
    if b.size == 0 or depth > 4: return
    for axis in (0, 1):
        full = b.mean(axis=axis) > 0.96
        n, cuts, last, found = len(full), [], 0, False
        i = 0
        while i < n:
            if full[i]:
                j = i
                while j < n and full[j]: j += 1
                if j - i >= 3:  # at least 3 px: a gutter, not a stray line in a picture
                    found = True
                    if axis == 0: mask[y0:y1, x0 + i:x0 + j] = True
                    else: mask[y0 + i:y0 + j, x0:x1] = True
                    if i - last > 20: cuts.append((last, i))
                    last = j
                i = j
            else: i += 1
        if found:
            if n - last > 20: cuts.append((last, n))
            for s, e in cuts:
                strips(board, mask, (x0 + s, y0, x0 + e, y1) if axis == 0 else (x0, y0 + s, x1, y0 + e), depth + 1)
            return

for f in files:
    a = np.asarray(Image.open(f).convert("RGB")).astype(int)
    ivory = np.abs(a - [240, 238, 230]).max(axis=2) <= 10
    paper = (a.min(axis=2) > 236) | ivory
    mask = np.zeros(paper.shape, bool)
    mark(paper, mask, (0, 0, a.shape[1], a.shape[0]))
    strips(ivory, mask, (0, 0, a.shape[1], a.shape[0]))  # only the ivory that cream-gutters.py painted: white pages inside pictures must stay
    clear = mask & paper
    # JPEG blurs the gutter edges: also clear light pixels right next to a cleared gutter, so no pale hairline is left
    near = np.zeros_like(clear)
    near[1:] |= clear[:-1]; near[:-1] |= clear[1:]; near[:, 1:] |= clear[:, :-1]; near[:, :-1] |= clear[:, 1:]
    clear |= near & (a.min(axis=2) > 200)
    if not clear.any():
        print(f, "no gutters found"); continue
    rgba = np.dstack([a, np.where(clear, 0, 255)]).astype("uint8")
    out = str(pathlib.Path(f).with_suffix(".webp"))
    Image.fromarray(rgba).save(out, quality=88, method=6)
    print(f, "->", out, "cleared", int(clear.sum()), "px")
