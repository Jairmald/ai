/**
 * All verified deck copy and numbers in one place.
 *
 * Every figure here was checked against real project files. Do not invent or
 * adjust numbers — if a value is missing, ask rather than estimate.
 */

const ABOUT = {
  name: 'Jair Maldonado',
  role: 'Security Analyst Intern',
  fields: [
    ['Position', 'Security Analyst Intern — Information Security'],
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
    blurb: 'Defining the security tools every new machine must carry — and who owns installing them.',
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
        n: '00', name: 'SCAN', net: 'Checks public databases',
        d: 'Checks every package version the project installs — its "lockfile" — against public records of known flaws.',
      },
      {
        n: '01', name: 'REACH', net: 'Stays offline',
        d: 'Looks inside our own code for a real call to the flawed part, and says which of the three answers it found.',
      },
      {
        n: '02', name: 'BLAST', net: 'Stays offline',
        d: 'For reachable findings only: how much sits downstream, and whether it runs in production or only in tests.',
      },
      {
        n: '03', name: 'REGRESS', net: 'Stays offline',
        d: 'How well tested the affected files are, and how risky the upgrade looks — kept as two separate measures.',
      },
    ],
    fix: {
      n: '04', name: 'FIX',
      d: 'Runs only when you ask for it by name. Builds a fix plan and works one step at a time.',
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
    flaws: '117',
    fixActions: '209',
    tickets: '46',
    reduction: '78%',
    runtime: '~12 sec',
    manual: '18+ min',
    spotChecked: '29/29',
    combos: '2,658',
  },
};

const CLOSING = [
  { t: 'Left tools behind, not just results', d: 'The scripts and frameworks I built are still in use by the team after I go.' },
  { t: 'Worked across team lines', d: 'Vulnerability Management, Application Security and Network Security — plus Cloud Operations and Development.' },
  { t: 'Built proof, not opinions', d: 'Every number in this deck was independently checked before I put it on a slide.' },
  { t: 'Built to scale beyond one team', d: 'Each project was designed so another group can pick it up and run it.' },
];

const TOC = [
  { n: '01', t: 'About Me', d: 'Who I am and where I am headed' },
  { n: '02', t: 'Internship Overview', d: 'Three rotations across the security team' },
  { n: '03', t: 'Image Management Program', d: 'Securing every machine before it ships' },
  { n: '04', t: 'AEGIS', d: 'Defending against supply-chain attacks' },
  { n: '05', t: 'CVE-to-Patch Automation', d: 'From hours of manual lookup to seconds' },
  { n: '06', t: 'Summary', d: 'What this means for Stewart' },
];

module.exports = { ABOUT, ROTATIONS, AGENTS, PROJECTS, CLOSING, TOC };
