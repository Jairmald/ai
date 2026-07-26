#!/usr/bin/env python3
"""Rasterize every SVG in assets/gen to a high-DPI PNG for pptx embedding."""
import os
import sys
import glob
import cairosvg
from PIL import Image

SCALE = 3.0  # 3x for crisp output at projector / print resolution

# Assets drawn on an oversized canvas, then cropped to their real content
# bounds so the aspect ratio used for placement is measured, not estimated.
TRIM_PREFIXES = ("logo-",)


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    gen = os.path.join(root, "assets", "gen")
    svgs = sorted(glob.glob(os.path.join(gen, "*.svg")))
    if not svgs:
        print("no svgs found in", gen)
        return 1
    for s in svgs:
        png = s[:-4] + ".png"
        cairosvg.svg2png(url=s, write_to=png, scale=SCALE)
        name = os.path.basename(png)
        if name.startswith(TRIM_PREFIXES):
            im = Image.open(png).convert("RGBA")
            box = im.getbbox()
            if box:
                im.crop(box).save(png)
        print("rasterized", name)
    return 0


if __name__ == "__main__":
    sys.exit(main())
