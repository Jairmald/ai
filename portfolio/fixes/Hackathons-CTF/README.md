# Hackathons & CTF

```
  _____ _______ ______
 / ____|__   __|  ____|
| |       | |  | |__
| |       | |  |  __|
| |____   | |  | |
 \_____|  |_|  |_|
```

<div align="center">

Competition write-ups — offensive and defensive security under time pressure

</div>

---

## About

Write-ups from capture-the-flag competitions and red/blue team engagements. Each one documents
what was attempted, what worked, what didn't, and what the exercise actually taught — including
the parts that went badly, which are usually the more useful half.

---

## Write-ups

| Competition | Format | Focus |
| --- | --- | --- |
| **[Network Security CTF](./Networks-Security-CTF)** | Multi-day, red vs. blue | Cisco IOS hardening, NMAP reconnaissance, DDoS execution, flag design across cryptography, steganography and web exploitation |

---

## Network Security CTF — summary

A four-person, multi-day engagement split between offence and defence.

**On defence:** hardened switches and routers — disabled Telnet, blocked ICMP at the access
point, suppressed SSID broadcast, enforced enable secrets and line authentication.

**On offence:** reconnaissance and enumeration with NMAP against a neighbouring team, followed
by a coordinated traffic flood from multiple hosts including a Kali-based Raspberry Pi.

**Flag design:** five challenges built for opposing teams — two cryptographic (text → ASCII →
hex), two steganographic (payloads in PNG metadata, recoverable with `exiftool`), and one web
challenge hiding its flag in page source behind a password-reset loop.

**Result:** zero flags captured by opposing teams. The hardening held. The write-up covers why —
and why our own timing (building flags while the attack phase was already running) cost us more
than the defences did.

---

## Skills exercised

**Network hardening** — service minimisation, access control, Cisco IOS security configuration
**Reconnaissance** — port scanning, service fingerprinting, topology mapping
**Cryptography** — encoding chains and obfuscation
**Steganography** — metadata payloads, `exiftool`
**Web exploitation** — source analysis, authentication logic flaws

---

## Roadmap

Categories I intend to add write-ups for as I compete:

- [ ] OSINT — reconnaissance, metadata, geolocation
- [ ] Log analysis — timeline reconstruction, SIEM forensics
- [ ] Network traffic — PCAP analysis, extraction, malware identification
- [ ] Reverse engineering — decompilation, binary exploitation
- [ ] Password cracking — Hashcat, John, rule-based attacks

*Listed as intent, not as existing content — the repository currently holds the one write-up
above.*
