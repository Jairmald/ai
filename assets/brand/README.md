# Brand asset overrides

Drop official Stewart artwork here to replace the generated stand-ins.

Recognised filenames:

- `logo-red.png`   — full-colour mark, used on white slides
- `logo-white.png` — all-white mark, used on red panels

Any PNG placed here is copied over the generated asset of the same name on every
build, so `node build.js` will never clobber it. Placement reads the file's real
pixel dimensions, so any size or aspect ratio works with no code change. Use a
transparent background and trim the file tight to the artwork.
