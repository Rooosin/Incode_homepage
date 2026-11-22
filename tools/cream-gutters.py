# Paints the white board behind photo collages (gutters between pictures and outer margins) in the page ivory,
# so collages sit on the page instead of on a white sheet. Paper inside the pictures (posters, certificates) stays white.
#   python tools/cream-gutters.py img/news/2024-11-06.jpg ...           -> writes <name>.preview.jpg here to check
#   python tools/cream-gutters.py --apply img/news/2024-11-06.jpg ...   -> overwrites the files
import sys, numpy as np
from PIL import Image

IVORY = np.array([240, 238, 230])

def runs(flags):
    out, s = [], None
    for i, f in enumerate(list(flags) + [False]):
        if f and s is None: s = i
        if not f and s is not None: out.append((s, i)); s = None
    return out

def mark(white, mask, box, depth=0):
    """find white gutter runs in this box, mark them, then look inside each piece between them"""
    x0, y0, x1, y1 = box
    w = white[y0:y1, x0:x1]
    if w.size == 0 or depth > 5: return
    for axis in (0, 1):                      # 0: columns, 1: rows
        full = w.mean(axis=axis) > 0.97
        n = len(full)
        side = lambda i: 1 - (w[:, i] if axis == 0 else w[i, :]).mean()
        gut = [(s, e) for s, e in runs(full) if all(side(i) > 0.3 for i in (s - 1, e) if 0 <= i < n) and (s > 0 or e < n)]
        if not gut: continue
        cuts, last = [], 0
        for s, e in gut:
            if axis == 0: mask[y0:y1, x0 + s:x0 + e] = True
            else: mask[y0 + s:y0 + e, x0:x1] = True
            if s - last > 20: cuts.append((last, s))
            last = e
        if n - last > 20: cuts.append((last, n))
        for s, e in cuts:
            mark(white, mask, (x0 + s, y0, x0 + e, y1) if axis == 0 else (x0, y0 + s, x1, y0 + e), depth + 1)
        return

apply = "--apply" in sys.argv
for f in [a for a in sys.argv[1:] if not a.startswith("--")]:
    a = np.asarray(Image.open(f).convert("RGB")).astype(int)
    white = a.min(axis=2) > 236
    mask = np.zeros(white.shape, bool)
    mark(white, mask, (0, 0, a.shape[1], a.shape[0]))
    if not mask.any(): continue
    out = a.copy(); out[mask & white] = IVORY
    print(f, "painted", int((mask & white).sum()), "px")
    Image.fromarray(out.astype("uint8")).save(f if apply else f.replace("\\", "/").rsplit("/", 1)[-1] + ".preview.jpg", quality=92)
