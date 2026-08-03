# Portfolio work — audit, fixes, and website

Everything produced for the GitHub portfolio review. Start with the audit.

| File | What it is |
| --- | --- |
| **[`AUDIT.md`](AUDIT.md)** | Full audit of all 10 repositories — 19 findings, ordered by urgency, plus what is working well. **Read §1 first.** |
| [`INTERNSHIP-REDACTION-RULES.md`](INTERNSHIP-REDACTION-RULES.md) | The rules a public internship write-up is held to, with a worked example. What your notes will be filtered through. |
| [`fixes/`](fixes/) | Corrected READMEs for six repositories, ready to copy across. |
| [`fixes/APPLY.md`](fixes/APPLY.md) | What changed in each file, and the manual GitHub settings steps that can't ship as files. |
| [`site/`](site/) | The portfolio website — three files, no build step. |
| [`site/README.md`](site/README.md) | How to deploy it, and what to settle before the internship section goes live. |

---

## Do these first

1. **Make this repository (`Jairmald/ai`) private.** It is public and contains employer-internal
   security data, including the vulnerable version of a named internal application. Settings →
   General → Danger Zone → Change visibility. Audit §1.
2. **Fix the contact email on your profile.** It currently points at `@email.com`, which does not
   exist, so every recruiter who clicked it got a silent bounce. Audit §3.
3. **Rename `jairmaldonado.github.io` to `Jairmald.github.io`.** The current name can never serve
   as your user site. Audit §2.

Then work through [`fixes/APPLY.md`](fixes/APPLY.md).

---

## Still outstanding

- **Your internship notes.** Section 03 of the website is my summary drawn from the presentation
  in this repository — accurate, but mine rather than yours. Send the notes and it gets rewritten
  properly, filtered through the redaction rules.
- **Manager sign-off** on publishing anything about the internship at all.
- **Repository access.** These fixes are prepared as files because this session could only write
  to `Jairmald/ai`. Grant access to the other repositories and they can be pushed directly instead.
