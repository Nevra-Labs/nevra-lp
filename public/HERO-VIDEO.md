# Hero background video

`public/hero.mp4` is the clip behind the hero, played the way apxlending.com plays
theirs: autoplay, loop, muted, `playsInline`, `object-fit: cover`, under a darkening
scrim. Wiring lives in `src/components/HeroVideo.jsx`.

If the file is missing, fails to decode, or the viewer has `prefers-reduced-motion`
set, the `HeroBackdrop` SVG renders instead, so the hero is never empty.

## What ships today

A night aerial over midtown Manhattan, supplied by Hugo.

| | |
|---|---|
| Source | 2560x1440, 11 s, 18.1 MB |
| Shipped | 1920x1080, 8.0 s, **1.5 MB** |
| Audio | none |

## Replacing it

Encode with ffmpeg. Night footage compresses very well, so CRF 28 at 1080p lands
near 1.3 MB. Keep it under ~3 MB, it is the first thing that loads.

    ffmpeg -i source.mov -t 9 -an -vf "scale=1920:-2" \
      -c:v libx264 -crf 20 -preset fast -pix_fmt yuv420p src9.mp4

    # Seamless loop: overlay the last second, faded out, onto the first, so the
    # closing frame lands back on the opening one. Without this the cut is
    # visible on any clip with camera movement.
    ffmpeg -i src9.mp4 -filter_complex "\
    [0:v]trim=0:8,setpts=PTS-STARTPTS[main];\
    [0:v]trim=8:9,setpts=PTS-STARTPTS,format=yuva420p,fade=t=out:st=0:d=1:alpha=1[tail];\
    [main][tail]overlay=eof_action=pass,format=yuv420p[out]" \
      -map "[out]" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4

The scrim in `.hero-scrim` (src/index.css) is tuned for footage that is already
graded dark. Brighter footage needs those alpha values raised or the white headline
will lose contrast.

## Licensing

Footage must be cleared for commercial use. Pexels, Pixabay and Coverr are free for
it; Artgrid, Filmsupply, Getty and Adobe Stock sell per-clip or subscription
licences. Never reuse a clip lifted from another company's site; theirs is their
asset, not a layout convention.
