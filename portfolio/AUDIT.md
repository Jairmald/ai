# GitHub Portfolio Audit — github.com/Jairmald

**Audited:** 2026-08-03 · **Scope:** all 10 public repositories, every README, repo metadata and Pages configuration.

Findings are ordered by urgency. Item 1 is time-sensitive and should be actioned before anything
else in this document.

---

## 1. CRITICAL — `Jairmald/ai` is public and carries employer-internal security data

`Jairmald/ai` is a **public** repository. It contains the source, build tooling and three built
`.pptx` files for the Stewart Title internship exit presentation. Between `README.md`,
`src/content.js` and the decks in `out/`, the repository publicly discloses:

| Category | What is exposed |
| --- | --- |
| Internal repository name | A named internal application repository |
| Internal tooling | The name of the internal vulnerability-management platform |
| **Live unremediated vulnerability state** | The exact framework, the exact vulnerable version in use, and the version that fixes it — for a **named** internal repository |
| Vulnerability posture | High/critical flaw counts, how many remain outstanding, host-and-product assignment totals, patch-ticket counts, remediation percentages |
| A specific CVE | Identified as present in the environment |
| Brand assets | A reconstruction of the company mark, plus the exact brand colour sampled from official artwork |

The third row is the serious one. It is a public statement that a named internal application is
running a known-vulnerable framework version, together with the fix version — which also implies
the fix has not been applied. That is directly actionable reconnaissance for anyone targeting the
company, and it is attributable to you by name.

The other rows are, on their own, ordinary internal-confidential material: tool names and
vulnerability metrics that an employer would not expect to see published.

**Recommended action, in order:**

1. **Change `Jairmald/ai` to Private now.** Settings → General → Danger Zone → Change visibility.
   This is the one step that stops further exposure, and it takes about fifteen seconds. Do it
   before working through the rest of this document.
2. Assume anything already public may have been cloned, forked or indexed. Making the repo private
   does not retract what has been served; it stops the ongoing exposure. Because the vulnerable
   version is the sensitive part, **the durable fix is the upgrade being applied**, not the repo
   being hidden.
3. Consider giving your security team a heads-up. Self-reporting a short public window reads very
   differently from the same thing being found later, and for an intern moving into a security
   career that conversation is an asset rather than a liability.
4. Do not delete the repository. Private is enough, and you need the deck. Deleting it also
   destroys the source material for the sanitised internship write-up described in section 3.

**On the sanitised internship section you asked for:** this is exactly the exposure it needs to
avoid. The redaction rules that fall out of the above are in
[`INTERNSHIP-REDACTION-RULES.md`](INTERNSHIP-REDACTION-RULES.md), and they are what the public
version will be built against.

---

## 2. HIGH — the Pages repository is named wrong and will never serve as your site

`Jairmald/jairmaldonado.github.io` is empty, and the name does not work for what it was created to do.

A GitHub **user site** requires the repository to be named **exactly** `<username>.github.io`.
Your username is `Jairmald`, so the only name that serves at the root URL is:

```
Jairmald.github.io      →  https://jairmald.github.io
```

The current name, `jairmaldonado.github.io`, does not match your username, so GitHub treats it as
an ordinary project repository. Even with Pages switched on it would publish to:

```
https://jairmald.github.io/jairmaldonado.github.io/
```

**Fix:** rename the repository to `Jairmald.github.io` (Settings → General → Repository name).
Renaming keeps the repo and its history; nothing is lost. It is empty today, so there is no risk
either way.

---

## 3. HIGH — the contact email on your profile does not exist

Profile README, Connect section:

```
[Email](mailto:jairmyl1@email.com)
```

`@email.com` is not your domain. Your address is `jairmyl1@gmail.com`. Every recruiter who has
clicked that link has had mail bounce, silently, with no way to tell you.

This is the highest-value single-character-class fix in the whole audit — it is the only broken
thing on the page a hiring manager is most likely to read.

---

## 4. MEDIUM — `Hackathons-CTF` documents a repository that does not exist

The README presents seven challenge categories and this structure:

```
Hackathons-CTF/
├── crypto/  osint/  logs/  network/
├── reversing/  password-cracking/  web-exploitation/
```

None of those directories exist. The repository contains exactly one folder,
`Networks-Security-CTF`, holding a single lab report.

It also states a per-challenge convention (`instructions.md`, `solution.md`, `data/`) that nothing
in the repo follows.

A visitor who reads that README and then browses the repo concludes the portfolio overstates
itself — which is unfair, because the one write-up that *is* there is genuinely good. Rewrite the
README to describe what exists, and keep the category list only as a stated roadmap if you intend
to fill it.

---

## 5. MEDIUM — the same lab report is published twice, in two repositories

These two files are the same lab, near-verbatim:

- `Projects/System-Administration/README.md`
- `Projects-and-Labs/Multi-Server-Systems-Administration /README.md`

Same title, same objectives, same procedures, same results table, same conclusion, same completion
date. The `Projects-and-Labs` copy additionally credits the team; the `Projects` copy drops that
section, which has the unfortunate effect of making a four-person project read as solo work.

**Fix:** keep the `Projects-and-Labs` copy — it is the more complete one and it credits your
teammates. Remove the duplicate.

---

## 6. MEDIUM — unfilled placeholders and four broken images are live

Seven separate spots where template scaffolding was never filled in, or an asset never landed.
Four of them render as **broken-image icons** on GitHub, which is the most visibly unfinished thing
a portfolio can do.

### Broken images (render as a broken icon today)

| File | Reference | Problem |
| --- | --- | --- |
| `Projects-and-Labs/Incident Handling Lab – Nexus Data Breach Simulation/README.md:127` | `https://placeholder-image-url.com/wazuh-alerts.png` | Domain is fictional |
| …`:130` | `https://placeholder-image-url.com/sysmon-processes.png` | Domain is fictional |
| …`:133` | `https://placeholder-image-url.com/thehive-case.png` | Domain is fictional |
| `AWS-Cloud-Institute-Projects/Resource-Monitoring/README.MD` | `./screenshots/03-email-notification-alert.png` | No `screenshots/` directory exists anywhere in the repo |

The first three sit under headings that announce them — *"Screenshot 1: Wazuh SIEM Alert
Dashboard"* — so the reader is told to expect an image and then shown a broken icon.

### Unfilled template fields

| File | Line |
| --- | --- |
| `Projects-and-Labs/Enterprise Network Infrastructure/README.md:151` | `**Lab Completed:** [Completion Date]` |
| `AWS-Cloud-Institute-Projects/AWS Well-Architected Tool/README.MD:249` | `**Contact:** [Your Name] \| [Your Email] \| [Your GitHub Profile]` |
| `AWS-Cloud-Institute-Projects/Resource-Monitoring/README.MD:338` | `**Contact:** [Your Name] \| [Your Email] \| [Your GitHub Profile]` |

### And the one-word file

`Projects-and-Labs/Personal SIEM/README.md` is, in its entirety:

```
here
```

**Fix:** either supply the screenshots or cut the headings that promise them — a write-up with no
screenshots is fine, a write-up with four broken ones is not. Fill the three template fields. For
`Personal SIEM`, write it up or remove the folder; a one-word placeholder reads worse than an
absent project.

---

## 6b. MEDIUM — two AWS lab reports render as plain text, not markdown

Two complete lab write-ups are committed **without a file extension**:

```
AWS-Cloud-Institute-Projects/File-Ownership-and-Permissions-in-Linux   (220 lines)
AWS-Cloud-Institute-Projects/Managing-Users-in-Linux                   (245 lines)
```

Both are full markdown documents — headings, badge rows, tables, the same structure as every other
lab in the repo. But with no `.md` extension GitHub serves them as **plain text**. The reader sees
literal `# Managing Users in Linux`, raw `![Lab Report](https://img.shields.io/...)` badge URLs,
and unrendered table pipes. Roughly 24 KB of good work displayed as source.

They are also loose at the repository root, while the other 17 labs each live in their own folder.

**Fix:** move each into a folder and give it the standard name, matching its siblings:

```bash
cd AWS-Cloud-Institute-Projects
mkdir -p File-Ownership-and-Permissions-in-Linux.dir Managing-Users-in-Linux.dir
git mv File-Ownership-and-Permissions-in-Linux   File-Ownership-and-Permissions-in-Linux.dir/README.md
git mv Managing-Users-in-Linux                   Managing-Users-in-Linux.dir/README.md
git mv File-Ownership-and-Permissions-in-Linux.dir File-Ownership-and-Permissions-in-Linux
git mv Managing-Users-in-Linux.dir                 Managing-Users-in-Linux
```

(The two-step rename is needed because a file and a directory can't share a name mid-operation.)

---

## 6c. LOW — the AWS lab count is off by one

The README badge reads `Labs-20 Completed` and the course table totals **20**:

| Course | Labs Completed |
| --- | --- |
| AWS Developer Fundamentals | 7 |
| AWS Cloud Operations | 11 |
| AWS Cloud Fundamentals | 2 |
| **Total** | **20** |

The repository contains **19** — 17 in folders plus the two extensionless files from §6b.

This may not be an error: you may have completed 20 and written up 19. But a reader who counts
finds a gap. Either add the missing write-up, or adjust the badge and table to describe what is
published and note the difference.

---

## 7. MEDIUM — `Projects` and `Projects-and-Labs` do the same job

`Projects` is a six-word stub — *"# Projects / All my cyber projects"* — with one subfolder, whose
sole piece of content is the duplicate identified in section 5.

`Projects-and-Labs` is the real one: 17 written-up lab reports, several of them substantial.

Two repositories with overlapping names and overlapping purposes force a visitor to guess which is
the real portfolio. Consolidate into `Projects-and-Labs` and archive `Projects`.

---

## 8. MEDIUM — `Professional-Associations` README ends mid-sentence

The final line is:

```
*This repository highlights membership and participation
```

No closing, no period, and the opening `*` is never closed, so the italic markup dangles. The
sentence stops mid-thought.

---

## 9. MEDIUM — `claude_skills` is an empty repository with a description

Created 2026-06-16, never pushed to. It has the description *"List of Claude skills I use in my
day-to-day"* and no content. Empty public repositories make a profile look abandoned. Either
populate it or delete it.

---

## 10. MEDIUM — a directory name has a trailing space

```
Projects-and-Labs/Multi-Server-Systems-Administration /
                                                     ^
```

That trailing space is URL-encoded as `%20` in every link to the folder, breaks naive clone/build
scripts, and is a genuine irritant on Windows checkouts. Rename it.

---

## 11. MEDIUM — your best technical work is missing from the profile

The Featured Repos table on your profile lists four repositories. It omits **`sparta-mapper`** —
which is, by a distance, the strongest engineering artefact on the account: ~800 lines of real
Python across STIX ingestion, embedding retrieval, LLM classification, a CLI, a FastAPI backend, a
React frontend, a test suite, an eval harness, and CI.

Someone assessing you as a security engineer would want to see that first. Right now they have to
find it by scrolling your repo list.

---

## 12. MEDIUM — `sparta-mapper`'s README undersells the code that is in it

The README says **"🚧 Early scaffold"** and shows a roadmap with one of seven boxes ticked:

```
- [x] Repo scaffold
- [ ] STIX ingestion + local store (week 1)
- [ ] Embedding retrieval (week 2)
- [ ] LLM classification + eval harness (week 3)
- [ ] CLI with NVD CVE lookup (week 4)
- [ ] FastAPI + web UI (week 5)
```

Every one of those unticked items has working, non-stub code committed:

| Roadmap item | Actually present |
| --- | --- |
| STIX ingestion + local store | `ingest/stix_loader.py` (254 lines), `store/db.py` (78) |
| Embedding retrieval | `retrieval/embed.py` (79) |
| LLM classification + eval | `classify/classifier.py` (108), `eval/run_eval.py` (45) |
| CLI with NVD lookup | `cli.py` (60), `nvd.py` (44) |
| FastAPI + web UI | `api/main.py` (99), `frontend/` React app |

There are no `TODO`s and no `NotImplementedError`s anywhere in `src/`. The roadmap is simply
stale — it was written at kickoff and never updated. A reader takes the README at its word and
assumes there is nothing to look at.

Separately: the README states **"MIT for this codebase"** but the repository has **no `LICENSE`
file**. A stated licence with no licence text is legally ambiguous — with no file, the default is
all-rights-reserved, i.e. the opposite of what you intend. Add the MIT text.

---

## 13. LOW — the profile ASCII banner is misaligned

```
██████╗██╗   ██╗██████╗ ███████╗██████╗       ← missing one leading space
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
██║     ╚████╔╝ ██████╔╝█████╗  ██████╔╝
```

The first row is one column short, so the initial letter is sheared by a character against every
row beneath it. Rows 3 and 4 also carry trailing whitespace. It is the first thing on your
profile.

---

## 14. LOW — `Projects-and-Labs` has 17 labs and no index

The README is an introduction with no list of what is in the repository. A visitor has to browse
the folder tree to discover that there is a malware analysis, a SIEM deployment, a honeypot build,
an IDS correlation study and fifteen others in there. An index table with one line each would
surface all of it immediately.

---

## 15. LOW — repository metadata is largely unset

| Repository | Description | Topics |
| --- | --- | --- |
| `Jairmald` | ✅ | ❌ |
| `Projects-and-Labs` | ✅ | ❌ |
| `Hackathons-CTF` | ✅ | ❌ |
| `Projects` | ✅ | ❌ |
| `claude_skills` | ✅ | ❌ |
| `AWS-Cloud-Institute-Projects` | ❌ | ❌ |
| `Professional-Associations` | ❌ | ❌ |
| `sparta-mapper` | ❌ | ❌ |
| `ai` | ❌ | ❌ |
| `jairmaldonado.github.io` | ❌ | ❌ |

No repository on the account has topics set. Topics are how GitHub search surfaces you —
`cybersecurity`, `blue-team`, `siem`, `vulnerability-management`, `incident-response`, `aws`,
`threat-intelligence`. `sparta-mapper` in particular is a public tool nobody can currently find.

Four of the ten have no description, `sparta-mapper` among them.

---

## 16. LOW — profile positioning is out of date

The account bio reads **"Future Cyber Analyst"**. You have since completed an Information Security
Analyst internship, shipped an automated vulnerability-remediation pipeline, and built a
reachability-analysis tool. "Future" undersells that by a full career step.

The profile README's `$ whoami` block has the same issue: *"Status: Continuously learning &
improving defenses"* is true of everyone. It is prime real estate spent on a truism.

---

## 17. NOTE — README file extension casing is inconsistent

`README.md` and `README.MD` are both used, sometimes within the same repository
(`Projects-and-Labs` has 17 of the former and one of the latter). GitHub renders both, so nothing
is broken — but it is inconsistent on case-sensitive tooling. Cosmetic; listed for completeness.

---

## What is genuinely good

Worth stating plainly, because the list above is all problems and the overall picture is better
than it implies:

- **The lab reports are strong.** The numbered structure — Purpose → Frameworks → Tools →
  Procedures → Results → Challenges → Takeaways → Conclusion — is consistent across ~40
  write-ups and is exactly the shape a hiring manager can skim. The *Challenges & Solutions* tables
  are the best part: they show troubleshooting under real constraints, which is the hardest thing
  to fake and the thing most portfolios omit.
- **Mechanical quality is high.** A full scan for the usual defects — unclosed code fences,
  unbalanced emphasis, doubled words, malformed tables, broken headings — returned **zero** genuine
  errors across all 44 markdown files. That is unusual, and it means this audit is about structure
  and accuracy, not proofreading.
- **`AWS-Cloud-Institute-Projects`** has the best index README on the account: it is organised by
  capability rather than by lab number, which is the right call — it tells a reader what you can
  *do*, not what you sat through. It is the model the other index READMEs should follow.
- **`sparta-mapper` is a real project**, and the README's framing of it — the gap it fills
  next to CISA's Decider, the explicit non-affiliation disclaimer, the note on SPARTA's
  redistribution terms — shows judgment beyond the code itself.
- **The honesty is consistent.** The CTF write-up records *"Flags Captured: 0"*. The AD lab records
  *"Ubuntu couldn't join domain."* Portfolios that only report wins are not credible; yours reports
  what happened. Keep that.

---

## Recommended order of work

1. **Make `Jairmald/ai` private** (§1) — minutes, and the only urgent item.
2. Fix the profile email (§3) — one character class, highest return.
3. Rename `jairmaldonado.github.io` → `Jairmald.github.io` (§2) — unblocks the website.
4. README corrections: `Hackathons-CTF` (§4), `Professional-Associations` (§8), `sparta-mapper`
   roadmap + LICENSE (§12), profile banner and featured table (§11, §13).
5. Consolidation: de-duplicate the AD lab (§5), fold `Projects` into `Projects-and-Labs` (§7),
   resolve `Personal SIEM` (§6), fix the trailing-space directory (§10).
6. Metadata pass: descriptions and topics on all ten repos (§15), bio rewrite (§16).
7. Publish the sanitised internship write-up and the website.
