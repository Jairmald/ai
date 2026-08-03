# Internship Write-Up — Redaction Rules

The rules a public internship write-up is held to, derived from what the current private deck
actually contains. Written before the content, so the content is built against them rather than
scrubbed afterwards.

Send your notes and projects and they get filtered through this. Anything that fails a rule gets
**transformed**, not deleted — the achievement survives, the exposure does not.

---

## The one-line test

> **Would this help someone attack the company, or tell them something about its internal state
> that it has not chosen to publish?**

If yes, it is out in that form. If it only demonstrates *your* capability, it stays.

Almost everything worth putting in a portfolio passes. The parts that fail are nearly always
incidental — a repo name, a tool name, a version number — and none of them are what makes the work
impressive.

---

## Hard rules — never published, no exceptions

| # | Rule | Why |
| --- | --- | --- |
| H1 | **No live vulnerability state.** Never pair a system with a version, CVE or finding that is unpatched or whose status you do not know. | This is the single most dangerous disclosure class. It is a targeting instruction. |
| H2 | **No internal repository, application, server, database or service names.** | Names map the attack surface and make everything else searchable and attributable. |
| H3 | **No internal tool or platform names** — scanners, ticketing, EDR, SIEM, asset inventory. | Reveals the security stack, which reveals its blind spots. Say the *category* instead. |
| H4 | **No CVE identifiers tied to the employer's environment.** A CVE in the abstract is public knowledge; "this CVE was in our estate" is not. | Confirms a specific exploitable condition at a named org. |
| H5 | **No hostnames, IPs, subnets, URLs, file paths, account names or org-unit structure.** | Standard reconnaissance material. |
| H6 | **No credentials, tokens, keys or config fragments** — including in screenshots and expired ones. | Non-negotiable, and expiry is frequently wrong. |
| H7 | **No unredacted screenshots.** Tool chrome, tab titles, sidebars, hostnames in status bars and window titles leak more than the intended content. | The leak is almost never the thing being screenshotted. |
| H8 | **No company brand assets** — logos, marks, sampled brand colours, templates. | Trademark, plus it implies endorsement of a personal portfolio. |
| H9 | **No named colleagues without their explicit say-so.** | Their consent, not yours, and it is easy to get. |
| H10 | **No internal documents verbatim** — policies, runbooks, tickets, exports, procedures. | Copyright sits with the employer; the writing is a work product. |

---

## Soft rules — publishable once transformed

These are where the substance is. Each one keeps the achievement and drops the exposure.

### S1 — Absolute counts become ratios, magnitudes or ranges

Raw counts describe the *employer's* estate. Ratios describe *your* impact, which is what the
portfolio is for — and they are usually the more impressive number anyway.

| Instead of | Publish |
| --- | --- |
| "117 flaws this cycle" | "a filtered set of ~100+ high and critical findings" |
| "2,658 host-and-product assignments" | "thousands of host-product assignments" |
| "209 rows became 46 tickets" | "a 78% reduction in remediation tickets" |
| "1,518 packages scanned" | "a production frontend codebase of ~1,500 dependencies" |

Percentages, multipliers and time savings are all safe: *78% reduction*, *two days to twelve
seconds*, *~17.5 hours of manual effort eliminated*. They are the strongest figures you have and
they disclose nothing.

### S2 — Systems become categories

| Instead of | Publish |
| --- | --- |
| a named internal repo | "a production Angular frontend application" |
| a named vuln-management platform | "the enterprise vulnerability-management platform" |
| a named ticketing system | "the IT service-management system" |

The reader learns the engineering context, which is what they are assessing. They do not learn what
to attack.

### S3 — Findings become resolved, generalised, or both

A finding is publishable when it is **closed** and **generalised**:

- ❌ "Three Angular packages on 20.3.18, fixed by 20.3.22"
- ✅ "Three findings that survived reachability analysis all resolved to a single minor-version
  upgrade — the analysis collapsed three apparent work items into one."

Same insight, same demonstration of judgment, no version pair. **The specific version numbers are
the payload — and they are the least interesting part of the sentence.**

### S4 — Personal tooling can be shown in full, against public data

Anything you wrote yourself is yours to show, subject to your employment agreement. The clean way:

1. Publish the **tool** — architecture, code, design decisions.
2. Demonstrate it against a **public** target — an open-source repo, the NVD feed, a deliberately
   vulnerable app.
3. State the internal result **only as a transformed metric** (S1).

This is the strongest possible framing: a reviewer can run it themselves. A private result they
must take on faith is worth less than a public one they can reproduce.

> **Check your IP assignment clause first.** Tools built on company time or equipment frequently
> belong to the company regardless of who typed them. If your agreement assigns them, ask before
> publishing — permission is often granted and costs one conversation. Assuming is what causes
> problems.

### S5 — Process is safe; configuration is not

Publish **how you approached it**: the method, the sequencing, the trade-offs, what you rejected
and why. Do not publish **how it was set up**: rules, thresholds, tunings, exception lists,
detection logic.

Method demonstrates judgment. Configuration is a bypass guide.

### S6 — Say "an enterprise environment", not the company name

There is a real tension here: naming the employer is what makes an internship legible to a
recruiter.

The resolution is to **split it by medium**:

- **Résumé and LinkedIn** — name the company. Private-by-context, expected, and how those documents
  work.
- **Public GitHub repo** — "a Fortune-1000 title insurance and real-estate services company", or
  simply "my internship host".

The recruiter reading the repo has your résumé open in the next tab. They connect it in a second.
An automated scraper correlating a company name with vulnerability metrics does not.

---

## Ownership — settle this before publishing

Beyond disclosure, there is a question of who owns the material:

1. **Check your agreement** for confidentiality, IP-assignment and publication clauses. Interns are
   normally covered by the same terms as employees.
2. **Ask your manager.** "I'd like to write up my internship projects for my portfolio — no
   internal names, no versions, no findings, metrics as percentages only. Can I run the draft past
   you?" This almost always gets a yes, and the yes is worth having in writing.
3. **Offer the draft for review.** Costs you one email and converts the entire risk into someone
   else's sign-off.
4. If the answer is no, publish the **capability** with no employer context at all: the tool, the
   method, the public-data demo. Still a strong portfolio piece.

---

## Worked example

How one real slide's substance survives the rules intact.

**Source (private):**

> AEGIS scanned Stewart.STEPS.Frontend: 1,518 packages, 28 carrying a known flaw, 25 confirmed not
> called by our code, 2 unproven, 3 needing a decision — all Angular on 20.3.18, all fixed by
> 20.3.22.

Fails **H1** (live unpatched state), **H2** (repo name), **S1** (raw counts), **S3** (version pair).

**Published:**

> I built a reachability-aware dependency scanner that asks a question conventional scanners skip:
> *does our code actually call the vulnerable function?*
>
> On a production Angular codebase of roughly 1,500 dependencies, it flagged a few dozen packages
> carrying known flaws. Reachability analysis cleared the large majority as never invoked by
> application code. The remainder resolved to a **single minor-version upgrade**.
>
> The design decision I am most pleased with is what happens when the tool *cannot* prove
> reachability either way. It returns **"unproven"** rather than **"safe"** — a scanner that guesses
> optimistically to keep its false-positive rate down is worse than useless in security, because
> the one it guesses wrong on is the one that matters. Some findings came back unproven. Because
> they shared a fix with the findings that were confirmed, the caution cost nothing: it was one
> version bump either way.

Nothing identifying survives. Everything that demonstrates engineering judgment does — and the
published version is the **better** portfolio piece, because it foregrounds the design reasoning
instead of the numbers.

---

## What to send me

Send the notes in whatever state they are in — rough is fine, and it is easier to redact from raw
material than from something already self-censored. Useful to have:

- What each project was, and the problem it solved
- What you built or changed, and the technical decisions behind it
- Rough before/after numbers — send them raw, they get transformed per S1
- What went wrong and what you learned (this is the most valuable and the least sensitive material
  you have)
- The tech stack and any tooling you wrote
- Whether you have cleared publication with your manager, and any constraints they set

I will apply these rules, flag every judgment call rather than deciding it silently, and produce a
draft for you to review before anything is published.
