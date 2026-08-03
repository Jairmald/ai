# Enterprise Network Infrastructure

![Lab Report](https://img.shields.io/badge/Status-Completed-brightgreen)
![Framework](https://img.shields.io/badge/Framework-Cisco%20Networking-blue)
![Tools](https://img.shields.io/badge/Tools-OSPF%20%26%20TCP-orange)
![Difficulty](https://img.shields.io/badge/Difficulty-Advanced-red)
![Duration](https://img.shields.io/badge/Duration-6%20Days-lightblue)

---

## **1. Lab Title**

> Multi-Group Network Infrastructure: Cisco Switch/Router Configuration with OSPF Routing and TCP File Transfer

---

## **2. Purpose and Objectives**

Design and implement a multi-network infrastructure using Cisco switches and routers, configure dynamic routing protocols, and establish secure inter-network communication with file transfer capabilities.

**Key Learning Outcomes:**
- Configure Cisco switches and routers via console connection
- Implement OSPF as dynamic routing protocol
- Establish wireless access point connectivity
- Perform cross-network file transfers via TCP
- Troubleshoot network connectivity issues
- Develop TCP socket programming for network communication

---

## **3. Frameworks & Technologies**

- **OSPF (Open Shortest Path First)** — Dynamic routing protocol for inter-network communication
- **TCP/IP Networking** — Reliable socket-based file transfer protocol
- **Cisco IOS Configuration** — Switch and router command-line interface
- **Wireless Access Point (AP)** — Bridging wired and wireless networks
- **Network Security** — Password encryption, authentication, banner configuration

---

## **4. Tools Used**

- Cisco Switch & Router (Cisco IOS)
- PuTTY (console connection)
- Linux/Windows VMs (VMware, VirtualBox)
- C language (TCP client/server sockets)
- Ping, network diagnostics utilities

**Equipment:**
- Serial console cable with USB dongle
- Wireless Access Point
- Multiple laptops (wired and wireless connectivity)

---

## **5. Key Procedures**

**Days 1-3: Hardware Configuration**
- Connected to Cisco switch via PuTTY using serial console cable
- Configured switch name, enable password, and banner MOTD
- Assigned static IP addresses to G0/0 and G0/1 interfaces
- Enabled IP forwarding protocol
- Tested connectivity via ping (internal switch to laptop connections)

**Day 4-5: Wireless Connectivity**
- Configured Access Point with admin credentials
- Enabled DHCP for automatic IP assignment (10.10.2.x/24)
- Tested wired and wireless connectivity to switch/router
- Configured firewall inbound/outbound rules for network communication

**Day 6: Routing Protocol & Multi-Group Communication**
- Implemented OSPF as dynamic routing protocol
- Defined networks and established OSPF neighbor relationships
- Configured interfaces and network advertisements
- Tested connectivity across 5 different group networks
- Performed inter-network pinging and verified routing tables

**Final Phase: TCP File Transfer**
- Developed C-based TCP client/server application
- Implemented file transfer across network boundaries
- Tested file transfer between groups using ports 111 and 112
- Verified successful transmission via TCP socket communication

---

## **6. Results**

✅ Cisco switch and router fully configured with proper credentials and interfaces
✅ OSPF routing protocol active with established neighbor relationships
✅ All 5 group networks reachable (Groups 1, 3, 4, 5, 6 pinged successfully)
✅ Wireless AP configured with DHCP scope (10.10.2.x)
✅ Both wired and wireless connectivity verified
✅ TCP file transfer working internally and externally across networks
✅ Successfully transferred files between Group 2 and other groups
✅ All inter-network communication operational

---

## **7. Challenges & Solutions**

| Challenge | Solution |
|-----------|----------|
| Serial connection wouldn't establish | Changed connection type to Serial in PuTTY settings |
| OSPF neighbors missing after config | Corrected interface configurations; re-enabled OSPF on proper interfaces |
| Router auto-assigned fixed IPs instead of manual | Discovered AP DHCP behavior; reconfigured to maintain static IP scheme |
| Wireless clients couldn't ping routers | Opened firewall rules for ICMP traffic |
| AP connectivity issues | Reset and reconfigured AP; enabled proper wireless mode |
| VM-to-VM file transfer failed (VMware↔VirtualBox) | Switched to native Linux host; resolved compatibility issues |
| TCP program startup errors in VM | Used native Linux machine for client/server execution |
| Files deleted on VM restart | Migrated to stable Linux host; persistent storage verified |

---

## **8. Key Takeaways**

- OSPF provides dynamic, scalable routing across multiple networks without manual route configuration
- Proper interface and subnet configuration is critical; missed OSPF network advertisements prevent neighbor relationships
- TCP socket programming requires careful error handling and EOF signaling for reliable file transfer
- Wireless AP DHCP conflicts with static IP schemes; requires careful planning and configuration
- Cross-platform virtualization (VMware/VirtualBox) can create compatibility issues; native OS preferred for networking projects
- Firewall rules must explicitly allow ICMP (ping) and other protocols; default-deny is common in enterprise environments
- Network troubleshooting requires systematic testing: device-to-device, wired-to-wireless, intra-network, inter-network
- Documentation of IP assignments, port usage, and credentials prevents confusion in multi-group projects

---

## **9. Artifacts & Deliverables**

- **Cisco Configuration Files:** Switch and router startup configurations with OSPF settings
- **TCP Socket Code:** Client and server C programs for file transfer (`client.c`, `server.c`)
- **Network Documentation:** IP address map, OSPF network topology, port assignments
- **Test Results:** Ping logs from all groups, file transfer verification
- **Configuration Scripts:** Enable/setup sequences for reproducible deployment

---

## **10. Conclusion**

This networking lab successfully demonstrated enterprise-level network infrastructure design through hands-on Cisco equipment configuration, dynamic routing protocol implementation, and multi-network communication. By configuring switches, routers, and access points across 6 group networks, the team established a functional ecosystem supporting 20+ networked devices with OSPF-based routing and secure inter-group file transfer capabilities.

The project reinforced critical networking concepts: OSPF neighbor relationship formation, TCP/IP socket programming, firewall rule configuration, and systematic troubleshooting. Successfully transferring files across multiple network boundaries demonstrates proficiency in both network configuration and systems programming.

---

## **Team**

Jair Maldonado | Sean | Jervanny | Chance | Taurean | Dawit Tewelde

---

**Duration:** 6 days
