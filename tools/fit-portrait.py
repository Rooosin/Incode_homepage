# Makes a member photo match the Team card style: square, head at the same height and size as everyone else,
# light grey background (the circle on the card). Use it for every new member photo so the cards stay uniform.
#   python tools/fit-portrait.py img/people/gildong-hong.jpg
# Works best with an ID-style photo on a plain light background. Check the result on the Team page.
import sys, numpy as np
from PIL import Image, ImageDraw

S, TOP, WID, GREY = 480, 0.17, 0.42, (224, 223, 228)   # canvas, head top (share of height), head width, background

for f in sys.argv[1:]:
    im = Image.open(f).convert("RGBA"); flat = Image.new("RGBA", im.size, "white"); flat.alpha_composite(im); im = flat.convert("RGB")
    a = np.asarray(im).astype(int)
    hair = a.max(axis=2) < 110                      # hair is the darkest part of an ID photo
    ys, xs = np.where(hair)
    if not len(ys): print(f, ": no dark hair found, skipped"); continue
    top = ys.min()
    row = np.where(hair[min(im.height - 1, top + int(0.12 * im.width))])[0]
    scale = WID * S / max(1, row.max() - row.min()); cx = (row.max() + row.min()) / 2
    big = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    out = Image.new("RGB", (S, S), "white"); out.paste(big, (round(S / 2 - cx * scale), round(TOP * S - top * scale)))
    for seed in [(0, 0), (S - 1, 0), (S // 2, 0), (0, S // 3), (S - 1, S // 3), (0, S // 2), (S - 1, S // 2)]:
        p = out.getpixel(seed)
        if min(p) > 225 and p != GREY: ImageDraw.floodfill(out, seed, GREY, thresh=26)
    out.save(f, quality=93); print(f, "->", out.size)
