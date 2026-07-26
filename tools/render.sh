#!/usr/bin/env bash
# Render the built deck to per-slide PNGs so the layout can be eyeballed.
# Usage: tools/render.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PPTX="$ROOT/out/Internship_Exit_Presentation_Stewart.pptx"
RENDER="$ROOT/out/render"

rm -rf "$RENDER"
mkdir -p "$RENDER"

soffice --headless --norestore --convert-to pdf --outdir "$RENDER" "$PPTX" >/dev/null 2>&1
PDF="$RENDER/$(basename "${PPTX%.pptx}").pdf"

python3 - "$PDF" "$RENDER" <<'PY'
import sys, fitz
pdf, out = sys.argv[1], sys.argv[2]
doc = fitz.open(pdf)
for i, page in enumerate(doc, 1):
    page.get_pixmap(dpi=100).save(f"{out}/slide-{i:02d}.png")
print(f"rendered {doc.page_count} slides to {out}")
PY
