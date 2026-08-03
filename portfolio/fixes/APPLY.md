# How to Apply These Fixes

Every file in `portfolio/fixes/` mirrors the path it belongs at, under the repository named by the
top-level folder. Copy each one over the original, commit, push.

Nothing here touches lab content, results, or technical substance — these are corrections to
broken links, dangling text, stale claims and missing files.

---

## Quick reference — what changed and why

| Repo | File | Change | Audit § |
| --- | --- | --- | --- |
| `Jairmald` | `README.md` | Fixed contact email, realigned ASCII banner, added `sparta-mapper` to featured work, updated positioning | §3, §11, §13, §16 |
| `Hackathons-CTF` | `README.md` | Rewritten to describe the repo that exists; aspirational categories moved to a labelled roadmap | §4 |
| `Professional-Associations` | `README.md` | Completed the truncated final sentence; added a personal involvement section | §8 |
| `Projects-and-Labs` | `README.md` | Added an index of all 17 labs, grouped by domain | §14 |
| `Projects-and-Labs` | `Enterprise Network Infrastructure/README.md` | Removed unfilled `[Completion Date]` | §6 |
| `Projects-and-Labs` | `Incident Handling Lab – Nexus…/README.md` | Removed 3 broken images and the headings promising them | §6 |
| `sparta-mapper` | `README.md` | Status and roadmap corrected to match the code; added badges, design notes, contributing | §12 |
| `sparta-mapper` | `LICENSE` | **New file** — MIT text, which the README claimed but never shipped | §12 |
| `AWS-Cloud-Institute-Projects` | `AWS Well-Architected Tool/README.MD` | Filled `[Your Name] \| [Your Email] \| [Your GitHub Profile]` | §6 |
| `AWS-Cloud-Institute-Projects` | `Resource-Monitoring/README.MD` | Same contact fix, plus removed a broken screenshot reference | §6 |

---

## Apply by hand

Clone each repo, copy the file across, commit:

```bash
git clone https://github.com/Jairmald/<repo>.git
cd <repo>
# copy the matching file from portfolio/fixes/<repo>/ over the original
git add -A && git commit -m "Fix README: <what changed>" && git push
```

## Apply with a script

From the directory containing `portfolio/fixes/`:

```bash
#!/usr/bin/env bash
set -euo pipefail
FIXES="$(pwd)/portfolio/fixes"
WORK=$(mktemp -d)

for repo in Jairmald Hackathons-CTF Professional-Associations \
            Projects-and-Labs sparta-mapper AWS-Cloud-Institute-Projects; do
  echo "==> $repo"
  git clone --quiet "https://github.com/Jairmald/$repo.git" "$WORK/$repo"
  cp -a "$FIXES/$repo/." "$WORK/$repo/"
  git -C "$WORK/$repo" add -A
  git -C "$WORK/$repo" diff --cached --stat
  # review, then:
  #   git -C "$WORK/$repo" commit -m "Fix README" && git -C "$WORK/$repo" push
done
echo "Staged in $WORK — review each, then commit and push."
```

It deliberately stops before committing. Look at the `--stat` output first.

---

## Manual steps — not files, so not automatable

These are GitHub settings and repo operations. Roughly in priority order.

### 1. Make `ai` private — do this first

Settings → General → Danger Zone → Change visibility → Private.

See audit §1. This one is time-sensitive.

### 2. Rename the Pages repo

`jairmaldonado.github.io` → **`Jairmald.github.io`**

Settings → General → Repository name. Must match your username exactly, or it will never serve at
`https://jairmald.github.io`. See audit §2.

### 3. Fix the trailing-space directory

```bash
cd Projects-and-Labs
git mv "Multi-Server-Systems-Administration " "Multi-Server-Systems-Administration"
git commit -m "Remove trailing space from directory name"
```

**The new `Projects-and-Labs/README.md` index links to the renamed path**, so do this at the same
time as applying that file — otherwise that one link 404s.

### 4. Resolve the duplicate AD lab

`Projects/System-Administration/` and `Projects-and-Labs/Multi-Server-Systems-Administration/` are
the same report. Keep the `Projects-and-Labs` copy — it's more complete and it credits your
teammates. Delete the `Projects/` copy. See audit §5.

### 5. Resolve `Personal SIEM`

`Projects-and-Labs/Personal SIEM/README.md` currently contains the single word `here`. Either
write it up or remove the folder. It is deliberately **not** in the new index — add a row once
there's something to link to. See audit §6.

### 5b. Fix the two AWS labs rendering as plain text

`File-Ownership-and-Permissions-in-Linux` and `Managing-Users-in-Linux` are full markdown lab
reports committed with **no file extension**, so GitHub serves them as plain text — raw `#`
headings and unrendered badge URLs. They're also loose at the repo root instead of in folders.

```bash
cd AWS-Cloud-Institute-Projects
for lab in File-Ownership-and-Permissions-in-Linux Managing-Users-in-Linux; do
  mkdir -p "$lab.tmp"
  git mv "$lab" "$lab.tmp/README.md"
  git mv "$lab.tmp" "$lab"
done
git commit -m "Move loose lab files into folders as README.md so they render"
```

The `.tmp` hop is needed because a file and a directory can't share a name mid-rename.
See audit §6b.

### 5c. Reconcile the AWS lab count

The badge and course table both say **20**; the repo contains **19** (17 folders + the two above).
Either add the missing write-up or adjust the count. See audit §6c.

### 6. Archive `Projects`

Once §4 is done, `Projects` holds nothing unique. Settings → General → Danger Zone → Archive.
See audit §7.

### 7. Populate or delete `claude_skills`

Empty since June, but has a description. See audit §9.

### 8. Set descriptions and topics

Four repos have no description; **none** of the ten have topics. Topics are how people find you.

| Repo | Suggested description | Topics |
| --- | --- | --- |
| `sparta-mapper` | Maps CVEs and vendor advisories to the SPARTA space-cyber threat framework | `security` `cve` `sparta` `space-cybersecurity` `stix` `threat-intelligence` `python` |
| `AWS-Cloud-Institute-Projects` | Labs and projects from the AWS Cloud Institute program | `aws` `cloud` `cloudformation` `bedrock` `cloudwatch` `linux` |
| `Professional-Associations` | ISSA and ACFE membership and community involvement | `cybersecurity` `issa` `acfe` `professional-development` |
| `Projects-and-Labs` | *(keep existing)* | `cybersecurity` `siem` `ids` `malware-analysis` `vulnerability-management` `incident-response` `blue-team` |
| `Hackathons-CTF` | *(keep existing)* | `ctf` `capture-the-flag` `red-team` `blue-team` `cybersecurity` |
| `Jairmald` | *(keep existing)* | `portfolio` `cybersecurity` |

### 9. Update your account bio

Currently **"Future Cyber Analyst"**. You've completed a security internship and shipped tooling
that's in use — "Future" undersells it by a career step. Suggested:

> Information Security Analyst · Vulnerability management & detection engineering

See audit §16.

### 10. Optional — fill the Enterprise Network Infrastructure date

I removed the unfilled `[Completion Date]` rather than guess. Git history shows the README was
first committed **2025-11-18**, but that's the write-up date, not necessarily the lab date. If you
remember the real one, restore the line as:

```markdown
**Lab Completed:** <date> | **Duration:** 6 days
```

### 11. Optional — teammate name consistency

`Enterprise Network Infrastructure/README.md` credits *"Jair Maldonado | Sean | Jervanny | Chance |
Taurean | Dawit Tewelde"* — a mix of full names and first names. Worth making consistent. Note that
`Networks-Security-CTF` gives full names for two of the same people (Sean Moning, Taurean Muhammad,
Chance Debbs), so the information is already public in the other repo either way.

---

## After applying

Two links in the new profile README point at things that don't exist yet:

- **`sparta-mapper` CI badge** — resolves once the repo has run its workflow at least once on
  `main`. It already has `.github/workflows/test.yml`, so this should be live already; if the badge
  shows "no status", trigger a run.
- **The website** — the profile README doesn't link to it yet. Once
  `https://jairmald.github.io` is live, add it to the Connect section and to your GitHub
  profile's website field.
