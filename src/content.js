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
  },
  two: {
    label: 'AEGIS — Supply-Chain Defense',
    blurb: 'Catching malicious code hidden inside the open-source packages our software depends on.',
    packagesScanned: '5,675',
    pipeline: [
      { name: 'AEGIS', stereo: 'detector', ops: ['findVulnerable()', 'checkReachable()', 'markResolved()'] },
      { name: 'FORGE', stereo: 'remediator', ops: ['proposeFix()', 'openBranch()', 'runTests()'] },
      { name: 'LEDGER', stereo: 'recorder', ops: ['recordFinding()', 'trackState()', 'auditTrail()'] },
      { name: 'WATCHTOWER', stereo: 'monitor', ops: ['watchFeeds()', 'raiseAlert()', 'reportDrift()'] },
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
