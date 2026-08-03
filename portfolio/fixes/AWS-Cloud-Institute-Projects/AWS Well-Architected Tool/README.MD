# Introduction to the AWS Well-Architected Tool

![Lab Report](https://img.shields.io/badge/Status-Completed-brightgreen)
![Framework](https://img.shields.io/badge/Framework-AWS%20Well--Architected-blue)
![Tools](https://img.shields.io/badge/Tools-AWS%20Well--Architected%20Tool%2C%20AWS%20Console-orange)
![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-yellow)
![Duration](https://img.shields.io/badge/Duration-Hands--On%20Lab-lightblue)

---

## **1. Lab Title**

> Week 11 Lab: Introduction to the AWS Well-Architected Tool — Workload Review, Risk Identification, Milestone Creation, and Report Generation

---

## **2. Purpose and Objectives**

The objective of this lab is to gain hands-on experience with the **AWS Well-Architected Tool** by creating a workload, conducting a structured architectural review against the AWS Well-Architected Framework, identifying high-risk findings, saving milestones, adjusting improvement priorities, and generating a formal report. This lab establishes the skills to conduct repeatable, evidence-based architectural reviews for any AWS workload.

**Key Learning Outcomes:**
- Create a **workload** in the AWS Well-Architected Tool with correct environment and lens configuration
- Answer **Operational Excellence pillar** questions (OPS 1, OPS 2) by selecting appropriate best practice responses
- Identify **High Risk Issues (HRIs)** surfaced by unanswered or incompletely answered questions
- Save a **milestone** to capture a point-in-time architectural review snapshot
- **Adjust pillar priorities** by promoting Security to the top of the improvement plan
- Set **Improvement Plan status** and generate a formal **Well-Architected Review Report**

---

## **3. Frameworks, Standards, and Methodologies**

- **AWS Well-Architected Framework:** All six pillars — Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability
- **AWS Well-Architected Lens:** Standard framework lens applied to the AnyCompany workload review
- **Architectural Review Best Practices:** Structured question-based review, honest risk acknowledgment, milestone documentation
- **Risk Identification:** Distinguishing High Risk (HRI) and Medium Risk (MRI) findings from the review
- **Continuous Improvement Cycle:** Milestone → Review → Improve → Milestone pattern for ongoing architectural maturity

---

## **4. Tools and Technologies**

- **Cloud Provider:** Amazon Web Services (AWS)
- **Primary Service:** AWS Well-Architected Tool
- **Framework Applied:** AWS Well-Architected Framework
- **Lens:** AWS Well-Architected Framework (standard lens)
- **Workload Name:** `Workload for AnyCompany`
- **Environment:** Pre-production
- **Questions Reviewed:** OPS 1, OPS 2 (Operational Excellence pillar)
- **Milestone Name:** `AnyCompany Application - First Draft`
- **Report Format:** AWS Well-Architected Framework lens report

---

## **5. Procedures and Implementation**

<details>
<summary>Click to expand detailed steps</summary>

1. **Task 1: Create the Workload**
   - Navigated to **AWS Well-Architected Tool** in the AWS Management Console
   - Selected **Define workload**
   - Configured the workload:
     - **Workload name:** `Workload for AnyCompany`
     - **Description:** AnyCompany application workload under architectural review
     - **Environment:** Pre-production
     - **AWS Regions:** Selected the lab region
     - **Lenses:** AWS Well-Architected Framework
   - Clicked **Define workload** to save
   - Confirmed the workload appeared in the Workloads list

2. **Task 2: Conduct the Operational Excellence Pillar Review**
   - Navigated to the workload and selected **Start reviewing → Operational Excellence**
   - **OPS 1 — How do you determine what your priorities are?**
     - Selected best practices:
       - ✅ Evaluate customer needs
       - ✅ Evaluate internal customer needs
       - ✅ Evaluate threat landscape
       - ✅ Evaluate tradeoffs
       - ❌ Evaluate compliance requirements (omitted)
       - ❌ Evaluate governance requirements (omitted)
     - Marked the question complete
   - **OPS 2 — How do you structure your organization to support your business outcomes?**
     - Selected best practices:
       - ✅ Identified owners for resources, processes, and operations
       - ✅ Defined responsibilities for predefined operations and procedures
       - ❌ (Other options not selected)
     - Marked the question complete
   - Reviewed the **Risk summary** panel — confirmed **2 High Risk Issues** were identified from the incomplete selections

3. **Task 3: Save a Milestone**
   - Navigated to the workload's **Milestones** tab
   - Selected **Save milestone**
   - Named the milestone: `AnyCompany Application - First Draft`
   - Confirmed the milestone was saved with the current review state, risk count, and timestamp
   - Verified the milestone appeared in the Milestones list

4. **Task 4: Adjust Pillar Priority and Set Improvement Status**
   - Navigated to the workload's **Improvement plan** tab
   - Located the pillar priority settings
   - Moved **Security** to the top priority position in the improvement plan ordering
   - Located the improvement items surfaced by the review
   - Set the **Improvement status** for identified items to `Not Started`
   - Confirmed the improvement plan reflected the updated priority order

5. **Task 5: Generate the Well-Architected Report**
   - Navigated to the workload overview
   - Selected **Generate report**
   - Chose the **AWS Well-Architected Framework** lens for report generation
   - Downloaded the generated PDF report
   - Reviewed the report contents:
     - Executive summary of workload configuration
     - Pillar-by-pillar risk summary (HRIs and MRIs)
     - List of unanswered or incomplete best practice selections
     - Improvement recommendations per pillar

</details>

---

## **6. Findings and Results**

- **Finding 1:** The workload creation process correctly configured the AnyCompany workload in pre-production environment with the AWS Well-Architected Framework lens, establishing the review scope and context
- **Finding 2:** OPS 1 — omitting compliance and governance requirements from the priority evaluation selections contributed to a High Risk finding, reflecting that incomplete governance coverage is a recognized architectural risk
- **Finding 3:** OPS 2 — selecting only two of the available organizational structure best practices left gaps that contributed to the second High Risk finding, demonstrating how partial adoption of best practices still generates risk signals
- **Finding 4:** The review surfaced **2 High Risk Issues** total from the OPS 1 and OPS 2 questions, providing a quantified risk baseline for the AnyCompany workload at this point in time
- **Finding 5:** Saving the `AnyCompany Application - First Draft` milestone created a permanent, timestamped snapshot of the review state — enabling future reviews to be compared against this baseline to measure architectural improvement over time
- **Finding 6:** Moving Security to the top of the improvement plan priority order reflected the business decision to address security risks before operational or other concerns — demonstrating the tool's support for organization-specific prioritization
- **Finding 7:** The generated report provided a structured, shareable document summarizing the workload's current architectural posture, identified risks, and recommended improvements — suitable for stakeholder communication and architectural governance processes

---

## **7. Screenshots and Evidence**

<details>
<summary>Click to expand review selections and risk summary</summary>

### OPS 1 Question Selections

| Best Practice | Selected |
|---------------|----------|
| Evaluate customer needs | ✅ Yes |
| Evaluate internal customer needs | ✅ Yes |
| Evaluate threat landscape | ✅ Yes |
| Evaluate tradeoffs | ✅ Yes |
| Evaluate compliance requirements | ❌ No |
| Evaluate governance requirements | ❌ No |

### OPS 2 Question Selections

| Best Practice | Selected |
|---------------|----------|
| Identified owners for resources/processes/operations | ✅ Yes |
| Defined responsibilities for predefined operations | ✅ Yes |
| Additional best practices | ❌ Not selected |

### Risk Summary

| Risk Level | Count |
|------------|-------|
| High Risk Issues (HRI) | 2 |
| Medium Risk Issues (MRI) | 0 (from reviewed questions) |
| Unanswered Questions | Remaining pillars not yet reviewed |

### Workload Configuration

| Property | Value |
|----------|-------|
| Workload Name | `Workload for AnyCompany` |
| Environment | Pre-production |
| Lens Applied | AWS Well-Architected Framework |
| Pillar Reviewed | Operational Excellence |
| Milestone Saved | `AnyCompany Application - First Draft` |
| Security Priority | Top (reordered in improvement plan) |
| Improvement Status | Not Started |
| Report Generated | ✅ PDF via AWS Well-Architected Tool |

### AWS Well-Architected Framework Six Pillars

| Pillar | Focus Area |
|--------|-----------|
| Operational Excellence | Operations, deployment, monitoring |
| **Security** | **IAM, data protection, incident response (top priority)** |
| Reliability | Resilience, recovery, fault tolerance |
| Performance Efficiency | Resource selection and optimization |
| Cost Optimization | Avoiding waste, right-sizing |
| Sustainability | Environmental impact minimization |

</details>

---

## **8. Challenges and Solutions**

| Challenge | Solution | Outcome |
|-----------|----------|---------|
| Determining which OPS 1 selections to omit | Lab instructions specified to omit governance/compliance requirements to simulate a realistic partial adoption scenario | Correct selections made; High Risk findings surfaced as expected |
| Understanding what a "High Risk Issue" means | HRIs indicate that a significant best practice gap exists — not necessarily a current active problem, but a known vulnerability in the architecture | Interpreted HRIs as improvement priorities rather than immediate incidents |
| Locating the pillar priority reordering option | Found the improvement plan priority ordering in the workload's Improvement Plan tab | Security successfully moved to the top priority position |
| Understanding milestone vs. continuous review | Milestones capture point-in-time snapshots; the workload review continues to be updated; milestones are compared to track progress | Correctly used the milestone as a baseline snapshot rather than a final state |

---

## **9. Key Takeaways and Lessons Learned**

- **The Well-Architected Tool Quantifies Risk:** Rather than subjective architectural opinions, the tool produces a structured, comparable risk score based on best practice adoption. This quantification enables objective conversations about architectural investment priorities.

- **Partial Adoption Still Generates HRIs:** Selecting most best practices but omitting a few can still result in High Risk findings. The tool rewards comprehensive adoption — partial compliance is acknowledged but flagged as a risk gap.

- **Milestones Enable Progress Tracking:** Saving a milestone after each review cycle creates a historical record of the workload's architectural maturity. Comparing milestone risk counts over time demonstrates the impact of remediation efforts.

- **Pillar Priority Reflects Business Context:** Different organizations have different risk tolerances and compliance requirements. The ability to reorder pillar priorities ensures the improvement plan reflects actual business priorities rather than a one-size-fits-all order.

- **Reports Facilitate Stakeholder Communication:** The generated report translates technical review findings into a structured document that architects, managers, and compliance teams can read and act upon — bridging the gap between technical review and organizational decision-making.

---

## **10. Artifacts and Deliverables**

- **`Workload for AnyCompany`:** Well-Architected Tool workload with pre-production environment and standard lens
- **OPS 1 and OPS 2 Review Responses:** Documented best practice selections and omissions
- **Risk Summary:** 2 High Risk Issues identified from the Operational Excellence pillar review
- **`AnyCompany Application - First Draft` Milestone:** Saved point-in-time review snapshot
- **Improvement Plan:** Security pillar prioritized to top; improvement status set to Not Started
- **Well-Architected Review Report:** Generated PDF covering workload architecture, identified risks, and recommendations

---

## **11. Conclusion**

This lab successfully demonstrated the complete **AWS Well-Architected Tool** review workflow: creating a workload, conducting an Operational Excellence pillar review, identifying High Risk Issues, saving a baseline milestone, adjusting improvement priorities, and generating a formal report. The hands-on experience reinforced that the Well-Architected Framework is not simply a checklist but a structured methodology for identifying architectural risks and guiding continuous improvement. The 2 High Risk Issues identified from the partial OPS 1 and OPS 2 selections illustrated how even small gaps in best practice adoption are captured and quantified. The generated report and saved milestone together establish the foundation for an ongoing architectural review program that tracks and measures improvement over time.

---

## **12. References**

- [AWS Well-Architected Tool Documentation](https://docs.aws.amazon.com/wellarchitected/latest/userguide/intro.html)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Operational Excellence Pillar Whitepaper](https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html)
- [Security Pillar Whitepaper](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)
- [AWS Well-Architected Labs](https://www.wellarchitectedlabs.com/)
- [AWS Well-Architected Framework – Six Pillars Overview](https://aws.amazon.com/blogs/apn/the-6-pillars-of-the-aws-well-architected-framework/)

---

**Lab Completed:** 2026
**Course:** AWS Cloud Fundamentals
**Status:** Completed ✅
**Contact:** Jair Maldonado | [jairmyl1@gmail.com](mailto:jairmyl1@gmail.com) | [github.com/Jairmald](https://github.com/Jairmald)
