# -*- coding: utf-8 -*-
"""Draws the two link-preview images.

Run by hand, not by `npm run build`: this needs Python and Pillow, the result
changes about never, and the PNGs are committed beside this file. Chaining it
into the build would put a second toolchain in CI to redraw a picture that has
not changed since it was drawn.

    python scripts/og/build-og.py

Nothing here may carry a price, a number of hearts or a duration. One picture
is served to every visitor on every quote, so anything a visitor could read as
*their* figure would be a lie to all the others.
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (11, 15, 20)            # --bg
TEXT = (230, 237, 243)       # --text
DIM = (147, 164, 181)        # --text-dim
FAINT = (100, 116, 139)
LINE = (31, 43, 56)          # --line

# The mark, straight out of public/logo.svg: an eight-pointed star in a 200
# box, filled with a gradient running down its own diagonal.
STAR = [(100, 10), (121.2, 78.8), (190, 100), (121.2, 121.2),
        (100, 190), (78.8, 121.2), (10, 100), (78.8, 78.8)]
STOPS = [(0.0, (125, 211, 252)), (0.55, (56, 189, 248)), (1.0, (251, 113, 133))]

FONTS = r'C:\Windows\Fonts'
SUPERSAMPLE = 4


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def mix(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def gradient_at(t):
    """The colour the SVG gradient shows at position t along its axis."""
    t = min(1.0, max(0.0, t))
    for (t0, c0), (t1, c1) in zip(STOPS, STOPS[1:]):
        if t <= t1:
            return mix(c0, c1, (t - t0) / (t1 - t0))
    return STOPS[-1][1]


def star(size):
    """The mark at `size` pixels, gradient and all, with smooth edges."""
    big = size * SUPERSAMPLE
    scale = big / 200.0

    # The gradient runs corner to corner, so a point's position along it is its
    # projection onto that diagonal — which for a square is just (x + y) / 2.
    grad = Image.new('RGB', (big, big))
    px = grad.load()
    for y in range(big):
        for x in range(big):
            px[x, y] = gradient_at((x + y) / (2.0 * (big - 1)))

    mask = Image.new('L', (big, big), 0)
    ImageDraw.Draw(mask).polygon([(x * scale, y * scale) for x, y in STAR], fill=255)

    out = Image.new('RGBA', (big, big), (0, 0, 0, 0))
    out.paste(grad, (0, 0), mask)
    return out.resize((size, size), Image.LANCZOS)


def card(headline, lines, eyebrow=None):
    img = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(img)

    # A hairline inside the edge: chat clients round the corners and sit the
    # picture on their own background, and without it the dark card dissolves
    # into a dark theme.
    d.rectangle([(0, 0), (W - 1, H - 1)], outline=LINE, width=2)

    pad = 88
    mark = star(104)
    img.paste(mark, (pad, 96), mark)

    if eyebrow:
        d.text((pad + 132, 122), eyebrow, font=font('segoeuib.ttf', 34), fill=DIM)

    y = 268
    d.text((pad, y), headline, font=font('segoeuib.ttf', 76), fill=TEXT)

    y += 118
    for text, colour, name in lines:
        d.text((pad, y), text, font=font(name, 32), fill=colour)
        y += 50

    d.line([(pad, H - 104), (W - pad, H - 104)], fill=LINE, width=1)
    d.text((pad, H - 78), 'thatskyapp.com', font=font('segoeuib.ttf', 26), fill=DIM)
    d.text((pad, H - 44),
           'Unofficial fan project, unconnected to thatgamecompany.',
           font=font('segoeui.ttf', 22), fill=FAINT)
    return img


def main(root):
    out = [
        (os.path.join(root, 'nyudev.github.io', 'og.png'),
         card('thatskyapp',
              [('Unofficial tools for Sky: Children of the Light.', DIM, 'segoeui.ttf')])),
        (os.path.join(root, 'heart-trade-simulator-web', 'public', 'og.png'),
         card('Sky heart trade calculator',
              [('How many hearts to ask for a trade paid in real money.', DIM, 'segoeui.ttf'),
               ('Combien de c\u0153urs demander pour un \u00e9change pay\u00e9 en argent r\u00e9el.',
                FAINT, 'segoeui.ttf')],
              eyebrow='thatskyapp')),
    ]
    for path, image in out:
        image.save(path, 'PNG', optimize=True)
        print('%s  %d x %d  %.0f kB' % (path, image.width, image.height,
                                        os.path.getsize(path) / 1024))


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.join('..', '..', '..'))
