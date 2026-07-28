/**
 * All verified deck copy and numbers in one place.
 *
 * Every figure here was checked against real project files. Do not invent or
 * adjust numbers — if a value is missing, ask rather than estimate.
 */

const ABOUT = {
  name: 'Jair Maldonado',
  role: 'Information Security Analyst Intern',
  fields: [
    ['Position', 'Information Security Analyst Intern'],
    ['School', 'Studying cybersecurity, with a focus on offensive security'],
    ['Background', 'Hands-on security work across vulnerability management, application security, and network security'],
    ['Certifications', 'Working toward the PWPA and PJPT practical certifications'],
    ['Career Direction', 'Penetration testing — finding weaknesses before an attacker does'],
  ],
};

const ROTATIONS = [
  {
    n: '01',
    name: 'Vulnerability Management',
    plain: 'Finding known weaknesses across company machines and making sure they actually get fixed.',
  },
  {
    n: '02',
    name: 'Application Security',
    plain: 'Checking the software we build and the outside code we rely on for weaknesses.',
  },
  {
    n: '03',
    name: 'Network Security',
    plain: 'Protecting how machines talk to each other, and what is allowed in and out.',
  },
];

const AGENTS = [
  'Tenable Nessus Agent',
  'CrowdStrike Falcon Sensor',
  'Netskope',
  'Cribl',
  'Splunk',
  'ThreatLocker',
  'Proofpoint DLP Agent',
  'SCCM Agent',
  'ControlUp Agent',
];

const PROJECTS = {
  one: {
    label: 'Image Management Program',
    blurb: 'Making sure every new machine ships with the security tools it needs — and that nobody can skip the step.',
    steps: [
      { n: '01', t: 'Define the Tools', d: 'Agree on exactly which security tools belong on every image — nine of them.' },
      { n: '02', t: 'Define the Owners', d: 'Name the team responsible for installing and maintaining each one.' },
      { n: '03', t: 'Get It Adopted', d: 'Turn that into a written framework the company formally signs off on.' },
    ],
    next: [
      ['Formal adoption', 'The framework is drafted and staged for review. It goes for sign-off once the policy manager returns in Q4.'],
      ['Owners take it from here', 'Each named team picks up the tool it owns, so responsibility sits with the people who can act on it.'],
      ['Check before deploy', 'The natural next step is a check that a newly built image actually carries all nine tools before it goes live.'],
    ],
  },
  two: {
    label: 'AEGIS — Supply-Chain Defense',
    blurb: 'Catching risky code hidden inside the open-source packages our software depends on.',

    // Production scale, achieved by an earlier version of the tool. Kept and
    // attributed rather than mixed in with the current version's results.
    packagesScanned: '5,675',

    // The current architecture: five stages, each a standalone script.
    // Stages 0-3 run on their own and only read. Stage 4 only runs on request.
    pipeline: [
      {
        n: '00', name: 'SCAN', net: 'Checks public flaw records',
        d: 'Checks every package version the project installs — its "lockfile" — against public records of known flaws.',
      },
      {
        n: '01', name: 'REACH', net: 'Analyses local code only',
        d: 'Finds whether our own code actually calls the vulnerable part — and answers reachable, no call site, or can\'t prove.',
      },
      {
        n: '02', name: 'BLAST', net: 'Analyses local code only',
        d: 'Measures how much could be affected — how much of the codebase sits downstream, and whether it runs in production.',
      },
      {
        n: '03', name: 'REGRESS', net: 'Analyses local code only',
        d: 'Checks whether the security fix could break something — test coverage and upgrade risk, kept separate.',
      },
    ],
    fix: {
      n: '04', name: 'FIX',
      d: 'Builds and tests the fix — only when you ask, and one approved step at a time.',
      rails: [
        'Every step needs explicit human approval',
        'Refuses to touch a protected branch',
        'Never merges, and never marks its own work resolved',
      ],
    },

    honestyRule: 'Unknown is never reported as safe. If AEGIS cannot tell, it says so.',

    verification: {
      packages: '733',
      bugs: '2',
      repo: 'a real open-source project',
      points: [
        ['Tested end to end, not just reviewed',
         'Ran the whole pipeline against a real open-source project and read all 733 packages out of its lockfile.'],
        ['It failed loudly, which is the point',
         'When the company network blocked the flaw-database lookup, SCAN reported an error instead of reporting "clean."'],
        ['It refused to guess',
         'Forced onto its weakest analysis method, REACH answered "can\'t prove" rather than calling anything safe.'],
        ['The safety rails hold',
         'FIX refused to run without explicit approval, and refused to touch a protected branch even once approved.'],
      ],
      bugsFixed: [
        ['An honesty bug in my own code',
         'A "can\'t prove" result was being described as if the flaw had been confirmed absent. Now the three answers stay distinct.'],
        ['A reporting bug',
         'The overall risk tier was read from the wrong place and printed as "Tier ?" in the most common case.'],
      ],
    },

    next: [
      ['Unblock the live lookups',
       'The company security proxy presents a malformed certificate that modern security libraries correctly reject, so the lookups fail. The real fix is an inspection bypass. Meanwhile I built the workaround: the scan splits in two, so the lookup can run from an unblocked network.'],
      ['Read code structure, not just text',
       'Reachability currently falls back to searching text. With the right tooling present it reads the code\'s actual structure, which is far more accurate. That still needs a real run.'],
      ['Get it into other people\'s hands',
       'Packaged as a plugin so a developer can install it with one command. The install flow itself has not been run start to finish yet.'],
    ],
  },
  three: {
    label: 'CVE-to-Patch Automation',
    blurb: 'Turning a manual, one-at-a-time patch lookup into a job that finishes in seconds.',

    // 117 is a filtered set, not a sample: every flaw on it was high or critical
    // severity AND directly affecting business operations.
    flaws: '117',

    // Manual baseline is a reasoned estimate from the steps involved, NOT a
    // timed measurement. It must stay labelled as an estimate on the slide.
    manualPerFlaw: '8–10 min',
    manualTotal: '~17.5 hours',
    manualDays: 'about 2 to 2.5 business days',

    runtime: '~12 sec',
    spotChecked: '29/29',

    // Cross-referencing the fleet data against the 117 showed most of the work
    // was already done by ordinary monthly patching.
    noAction: '52',
    outstanding: '65',

    // 209 was already in Kevlar's own report — found, not derived here.
    fixActions: '209',
    tickets: '46',
    absorbed: '163',
    reduction: '78%',
    combos: '2,658',
  },
};

/**
 * The closing slide is a thank-you, not a summary of contributions — the
 * executive summary already makes that case. Teams named here are the ones
 * referenced elsewhere in the deck.
 */
const THANKS = [
  ['To the Information Security team',
   'For handing me problems that actually mattered, and trusting me to work on them properly.'],
  ['To Vulnerability Management, Application Security and Network Security',
   'Three rotations, three different ways of looking at the same job. I learned something distinct in each one.'],
  ['To Cloud Operations and Development',
   'For making time for someone from another team who kept turning up with questions.'],
];

// Descriptions lead with business impact, not the technical activity — the
// room includes finance, compliance and executives as well as the security team.
const TOC = [
  { n: '01', t: 'About Me', d: 'Who I am and where I am headed' },
  { n: '02', t: 'Internship Overview', d: 'Three rotations across the security team' },
  { n: '03', t: 'Image Management Program', d: 'Making sure every new machine starts secure' },
  { n: '04', t: 'AEGIS', d: 'Catching supply-chain attacks before they reach us' },
  { n: '05', t: 'CVE-to-Patch Automation', d: 'Turning two days of patch work into twelve seconds' },
  { n: '06', t: 'Summary', d: 'What this means for Stewart' },
];

/**
 * Executive summary: three problems, three solutions, three proofs.
 * Sits early so business stakeholders get scale and outcome before the detail.
 */
const EXEC = [
  {
    problem: 'New machines could ship without the security tools they need.',
    solution: 'A written framework naming all nine required tools and who owns each.',
    proof: 'Drafted and staged for Q4 sign-off',
  },
  {
    problem: 'Attackers hide malicious code inside the open-source packages we depend on.',
    solution: 'AEGIS — a scanner that checks whether our code actually reaches the flaw.',
    proof: '5,675 packages scanned in production by an earlier version',
  },
  {
    problem: 'Matching every tracked flaw to its patch took about two days of analyst time.',
    solution: 'A script that does the matching automatically, then consolidates the result.',
    proof: '117 matched in ~12 sec; 209 rows became 46 tickets',
  },
];

/**
 * Speaker notes, keyed by slide function. These answer the "when", "who" and
 * "what next" questions a mixed room reliably asks.
 */
const NOTES = {
  execSummary: 'If you only take one thing from this: three separate problems, three working solutions, and I can show the evidence for each. The detail follows — feel free to tune in and out.',
  p1Problem: 'A Golden Image is the template every new virtual machine is built from. Set it up once and every machine after that inherits it. Q: Does this slow down provisioning? — No. The tools go into the image itself, so a machine built from it is already compliant on first boot.',
  p1Next: 'Q: When does this actually get adopted? — Q4, when the policy manager returns. It is drafted and staged for sign-off now, not adopted. Q: Who owns the rollout? — The infrastructure security team; each named team owns its own tool.',
  p2Problem: 'Plain version: someone poisons a popular free software package, and everyone who installs it gets the poison too. It has happened repeatedly in the last two years.',
  p2Built: 'Q: Can AEGIS catch zero-days? — No. It catches publicly known flaws in open-source dependencies. Zero-days need different tooling entirely. Q: What about false positives? — Every finding it labels reachable is a real code path; anything it cannot confirm is labelled "can\'t prove", never "safe". I have not measured a false-positive rate, so I am not going to quote one.',
  p2Proving: 'This is the slide for the security folks. The short version for everyone else: I tried to make the tool report a clean result it had not earned, and it refused.',
  p2Next: 'Q: Who maintains this after I leave? — The Vulnerability Management team. It is packaged as a plugin so it installs with one command, though that install flow still needs a real run.',
  p3Problem: 'Q: Why 117 and not more? — Because that is the filtered set: high or critical severity AND directly affecting business operations. It is not a sample and it is not everything Kevlar sees.',
  p3Match: 'The ~17.5 hour baseline is a reasoned estimate at 8-10 minutes per flaw, not a stopwatch measurement. Say so if asked. If precision matters, have an analyst time a sample of ten.',
  p3NoAction: 'Q: Were all 117 validated? — 29 were independently spot-checked and all 29 were correct. One entry, CVE-2025-47827, is double-classified in the Kevlar export (IGEL OS and Windows). That is a data-quality issue upstream, not a bug in the script, but worth flagging to whoever owns the export.',
  p3Granularity: 'Full chain if asked: 2,658 real host-and-product assignments, which Kevlar groups into 209 KB Priority rows, which the highest-fixed-build rule collapses to 46 tickets. The 78% is measured against Kevlar\'s 209, not against the 117.',
  p3Future: 'Q: Will this integrate with Jira? — The data is ready. The integration depends on a workflow decision with the team that owns ticketing. The scripts work today without it; the dashboard is the optional part.',
};

module.exports = { ABOUT, ROTATIONS, AGENTS, PROJECTS, THANKS, TOC, EXEC, NOTES };
