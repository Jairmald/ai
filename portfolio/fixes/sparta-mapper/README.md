# sparta-mapper

**An open-source tool that maps CVEs and vendor security advisories to the
Aerospace Corporation's [SPARTA](https://sparta.aerospace.org/) space-cyber
threat framework — automatically.**

[![CI](https://github.com/Jairmald/sparta-mapper/actions/workflows/test.yml/badge.svg)](https://github.com/Jairmald/sparta-mapper/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/)

> Independent community project. Not endorsed, sponsored, or supported by
> The Aerospace Corporation. SPARTA content is used under its published
> terms of use — see [Disclaimer](#disclaimer) before redistributing data.

## Why this exists

SPARTA gives the space industry a shared taxonomy for spacecraft attack
TTPs (the space-sector equivalent of MITRE ATT&CK), distributed as a
machine-readable STIX 2.1 bundle. What's missing is the layer CISA built
for ATT&CK with its "Decider" tool: something that takes a real-world CVE
or advisory and tells you *which SPARTA technique this actually is*,
with reasoning and relevant countermeasures.

`sparta-mapper` is that layer.

```
$ sparta-map --cve CVE-2023-XXXXX

Technique:    EX-0003 — Compromise Boot Memory
Tactic:       Execution
Confidence:   0.84
Reasoning:    Advisory describes persistent firmware modification via
              unauthenticated bootloader access, matching SPARTA EX-0003's
              described TTP for boot-stage compromise...
Countermeasures:
  - CM-0012  Secure Boot / firmware signing
  - CM-0031  Bootloader access authentication
```

## How it works

1. **Ingest** — pull the official SPARTA STIX bundle, parse it with the
   `stix2` library, normalize techniques/tactics/countermeasures into a
   local SQLite store. (`src/sparta_mapper/ingest/`)
2. **Retrieve** — embed every technique's description with
   `sentence-transformers`, run top-k similarity search against the input
   text. (`src/sparta_mapper/retrieval/`)
3. **Classify** — send the input + retrieved candidates to Claude for
   structured classification: technique ID, confidence, reasoning,
   cross-referenced countermeasures. (`src/sparta_mapper/classify/`)
4. **Serve** — CLI (`sparta-map`) and a FastAPI backend for the web UI.

## Status

**All five pipeline stages are implemented end to end.** You can ingest the SPARTA bundle, build
embeddings, and classify a CVE or raw advisory text from the CLI or the API today.

What is *not* done yet is the part that matters most for trust in a classifier:

- **Accuracy is unmeasured.** The eval harness (`eval/run_eval.py`) and a hand-labelled case set
  (`eval/eval_set.json`) exist, but I have not published accuracy numbers, and I'm not going to
  quote any until the labelled set is large enough for the number to mean something. Treat
  confidence scores as relative ordering, not calibrated probability.
- **Test coverage is partial.** CI runs lint plus unit tests, but those tests currently cover STIX
  ingestion only. Retrieval and classification are exercised manually.

So: usable, and honest about what hasn't been verified.

| Component | State | Where |
| --- | --- | --- |
| STIX ingestion + SQLite store | Implemented | `ingest/stix_loader.py`, `store/db.py` |
| Embedding retrieval | Implemented | `retrieval/embed.py` |
| LLM classification | Implemented | `classify/classifier.py` |
| NVD CVE lookup | Implemented | `nvd.py` |
| CLI (`sparta-map`) | Implemented | `cli.py` |
| FastAPI backend | Implemented | `api/main.py` |
| React web UI | Implemented | `frontend/` |
| Eval harness | Implemented, not yet run at scale | `eval/run_eval.py` |
| Published accuracy numbers | **Not yet** | — |
| Test coverage beyond ingestion | **Not yet** | — |

## Setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your ANTHROPIC_API_KEY

python -m sparta_mapper.ingest.stix_loader   # builds data/sparta.db
sparta-map --text "Unauthenticated telnet access to ground station..."
```

> **Note:** `data/` is git-ignored and never committed — the SPARTA STIX
> bundle, the SQLite store, and the embedding cache are all regenerable. On a
> fresh clone this directory won't exist yet, so run the loader command above
> to build your own `data/sparta.db` before running the CLI. (The loader pulls
> the live bundle from sparta.aerospace.org, so the data always reflects the
> current SPARTA release.)

### Web UI

```bash
uvicorn sparta_mapper.api.main:app --reload    # backend on :8000
cd frontend && npm install && npm run dev      # frontend on :5173
```

## Roadmap

- [x] Repo scaffold
- [x] STIX ingestion + local store
- [x] Embedding retrieval
- [x] LLM classification
- [x] Eval harness
- [x] CLI with NVD CVE lookup
- [x] FastAPI + web UI
- [ ] Expand the hand-labelled eval set to a statistically meaningful size
- [ ] Publish accuracy numbers in this README
- [ ] Test coverage for retrieval and classification
- [ ] Batch mode — map a whole advisory feed in one run
- [ ] Public release

## Design notes

A few decisions worth explaining, since they're the interesting part:

**Retrieval before classification.** SPARTA has enough techniques that putting all of them in a
prompt is both expensive and worse-performing — the model does better choosing between five
plausible candidates than ranking the full set. Embedding search narrows first, the LLM decides
second.

**Confidence is reported, never thresholded away.** The tool does not silently drop low-confidence
mappings. An analyst seeing `0.31` learns something real; an analyst seeing nothing assumes there
was nothing to find.

**Output is a starting point, not a verdict.** Framework mapping is a judgment call even for
experienced analysts, and the honest position for an automated tool is to show its reasoning and
let a human disagree with it.

## Contributing

Issues and PRs welcome — particularly labelled eval cases. If you've mapped a real advisory to a
SPARTA technique by hand and are confident in it, that's directly useful: add it to
`eval/eval_set.json`.

## License

[MIT](LICENSE) for this codebase. SPARTA content itself is governed by Aerospace
Corporation's own terms — read them at sparta.aerospace.org before
redistributing derived data, not just code.

## Disclaimer

This is an independent, unofficial tool built on top of publicly published
SPARTA data. It is not affiliated with, endorsed by, or reviewed by The
Aerospace Corporation. Mapping output is a starting point for analyst
judgment, not an authoritative classification.
