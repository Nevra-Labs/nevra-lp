# Hero background video

The hero renders a background clip the way apxlending.com does: `<video>` set to
autoplay, loop, muted, `playsInline`, `object-fit: cover`, under a darkening scrim.

**No video file ships with this repo.** Drop one at `public/hero.mp4` and it takes
over automatically. With no file present — or on a decode error, or for a viewer
with `prefers-reduced-motion` — the hero falls back to the `HeroBackdrop` SVG, so
it is never empty. Wiring lives in `src/components/HeroVideo.jsx`.

## Supplying a clip

The footage has to be licensed for commercial use. APX's clip is their own asset on
their CDN and cannot be reused. Options, cheapest first:

- **Pexels / Pixabay / Coverr** — free, commercial use allowed, no attribution
  required. Search "New York aerial night" or "city skyline dusk". Read the licence
  on the specific clip: a few are contributor-restricted.
- **Artgrid / Filmsupply** — subscription, higher production value, clean rights.
- **Getty / Adobe Stock** — per-clip licence, the safest paper trail.

Avoid anything scraped from YouTube or another company's site.

## Encoding

Target roughly 6-10 s, seamless loop, no audio track, 1920x1080, H.264:

    ffmpeg -i source.mov -t 8 -an -vf "scale=1920:-2" \
      -c:v libx264 -crf 26 -preset slow -movflags +faststart \
      public/hero.mp4

Keep it under ~3 MB. It is the first thing that loads, and the scrim means fine
detail is lost anyway, so a higher CRF is usually invisible. Add `public/hero.webm`
(VP9) and a matching `<source>` if you want the smaller file for Chrome/Firefox.

Grade it dark. The scrim assumes footage that is already fairly dark; a bright clip
will fight the white headline.
