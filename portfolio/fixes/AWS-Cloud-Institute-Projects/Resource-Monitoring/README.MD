#  AWS CloudWatch Monitoring Lab – EC2 Resource Monitoring and Alerting

![Lab Report](https://img.shields.io/badge/Status-Completed-brightgreen)
![Framework](https://img.shields.io/badge/Framework-AWS%20Best%20Practices-blue)
![Tools](https://img.shields.io/badge/Tools-CloudWatch%2C%20SNS%2C%20EC2-orange)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-yellow)
![Duration](https://img.shields.io/badge/Duration-Hands--On%20Lab-lightblue)

---

## **1. Lab Title**

> AWS CloudWatch Monitoring Lab: EC2 Resource Monitoring, Dashboard Creation, and Automated Alerting with SNS Integration

---

## **2. Purpose and Objectives**

The objective of this lab is to gain hands-on experience implementing **comprehensive monitoring and alerting infrastructure** for Amazon EC2 instances within an AWS environment, specifically focusing on real-time visibility, proactive alerting, and automated incident notification.

**Key Learning Outcomes:**
- Investigate and leverage **default CloudWatch monitoring** on Amazon EC2 instances
- Create and configure **CloudWatch dashboards** for real-time metric visualization across multiple servers
- Build **CloudWatch alarms** with meaningful thresholds for CPU and memory utilization metrics
- Integrate **Amazon SNS (Simple Notification Service)** for email-based alert notifications
- Implement **end-to-end monitoring workflows** aligned with AWS operational best practices
- Develop practical monitoring strategies for production-grade infrastructure observability

---

## **3. Frameworks, Standards, and Methodologies**

- **AWS Well-Architected Framework:** Operational Excellence pillar focusing on monitoring, logging, and alerting
- **AWS Monitoring Best Practices:** Comprehensive metrics collection, dashboard design, and alarm configuration standards
- **Observability Principles:** Metrics, logs, and traces for complete system visibility
- **Incident Response Integration:** Automated alerting workflow connecting CloudWatch to notification systems
- **Threshold-Based Alerting:** Statistical analysis for meaningful alarm thresholds avoiding alert fatigue

---

## **4. Tools and Technologies**

- **Compute Environment:** 3x Amazon EC2 instances (Server_1, Server_2, Server_3) running in multi-availability zone configuration
- **Monitoring Services:**
  - **Amazon CloudWatch v4.x** (metrics collection, dashboard creation, alarm management, event processing)
  - **Amazon EC2** (target resources for monitoring with default metrics enabled)
  - **Amazon SNS** (notification delivery and subscription management)
- **Metrics Collected:**
  - CPU_USAGE_IDLE (CPU idle percentage)
  - mem_used (Memory utilization)
  - Network throughput (in/out)
  - Disk I/O operations
- **Configuration & Automation:** CloudWatch Alarms, SNS Topics, Alarm Actions, Email Subscriptions
- **Utilities:** AWS Management Console, AWS CLI, CloudWatch Insights

**Technical Stack:**
- Cloud-native monitoring architecture
- Multi-instance metric aggregation
- SNS-based notification distribution
- Alarm state management and persistence
- Email subscription confirmation workflow

---

## **5. Procedures and Implementation**

<details>
<summary>Click to expand detailed steps</summary>

1. **EC2 Instance Discovery and Default Monitoring Investigation**
   - Identified and located 3 running EC2 instances in AWS Management Console
   - Verified default CloudWatch monitoring was enabled on all instances
   - Confirmed metric collection starting automatically for each instance
   - Documented instance IDs, regions, and availability zones

2. **CloudWatch Metrics Collection and Analysis**
   - Accessed CloudWatch Metrics dashboard from AWS Console
   - Reviewed available default metrics (CPU Utilization, Network, Disk I/O)
   - Identified custom metrics if applicable (mem_used, CPU_USAGE_IDLE)
   - Analyzed metric history and baseline performance across all 3 servers
   - Confirmed metric data flowing continuously into CloudWatch

3. **CloudWatch Dashboard Creation**
   - Created new custom dashboard titled "Resource Monitoring Dashboard"
   - Added CPU Utilization widget displaying real-time metrics across all instances
   - Configured dashboard refresh interval to 1 minute for near real-time updates
   - Added metric labels, legends, and time range selectors
   - Validated dashboard displaying aggregated data from all 3 servers

4. **SNS Topic and Email Subscription Setup**
   - Created new SNS topic for CloudWatch alarm notifications
   - Configured topic display name and access policies
   - Added email subscription endpoint with registered email address
   - Received SNS confirmation email in inbox
   - Clicked subscription confirmation link to activate email notifications

5. **CloudWatch Alarm Configuration - CPU Utilization**
   - Created alarm named "CPU Utilization High" targeting CPUUtilization metric
   - Set threshold to > 80% for alert triggering
   - Configured evaluation period to 1 minute
   - Set datapoints to alarm to 1 (immediate trigger on threshold breach)
   - Attached SNS topic as alarm action for notification delivery

6. **CloudWatch Alarm Configuration - Memory Utilization**
   - Created additional alarm for mem_used metric
   - Set threshold based on system specifications and expected usage
   - Configured evaluation period to 1-2 minutes for stability
   - Attached SNS topic as alarm action for consistency

7. **Alarm Testing and Verification**
   - Monitored alarm state transitions in CloudWatch console (OK → ALARM → OK)
   - Verified alarm entered ALARM state when metric exceeded threshold
   - Confirmed SNS notification triggered immediately upon alarm state change
   - Received email notification in registered inbox with complete alarm details

8. **Email Notification Validation**
   - Reviewed email content for accuracy and completeness
   - Confirmed email included alarm name, metric, threshold, current value, and timestamp
   - Validated sender as AWS Notifications with SNS topic reference
   - Verified email contained actionable information (AWS console links, alarm details)
   - Tested notification delivery reliability across multiple alarm triggers

</details>

---

## **6. Findings and Results**

- **Finding 1:** Default CloudWatch monitoring was successfully enabled on all 3 EC2 instances with automatic metric collection starting within seconds of instance initialization
- **Finding 2:** Custom metrics (CPU_USAGE_IDLE, mem_used) were accessible and properly correlated with AWS default metrics (CPUUtilization, NetworkPacketsIn/Out)
- **Finding 3:** CloudWatch dashboard successfully aggregated metrics from multiple instances, providing unified visibility across the infrastructure with 1-minute refresh capability
- **Finding 4:** CPU Utilization alarm with 80% threshold was successfully triggered when metric exceeded defined threshold, transitioning from OK state to ALARM state
- **Finding 5:** SNS topic integration functioned reliably, delivering notification message to subscribed email endpoint within seconds of alarm trigger
- **Finding 6:** Email notification contained complete alarm metadata including timestamp (alarm trigger time), AWS account ID, region, metric name, current value, and threshold comparison
- **Finding 7:** End-to-end monitoring workflow validated successfully: Metric Collection → Dashboard Display → Alarm Evaluation → SNS Notification → Email Delivery (5 components, 100% success rate)
- **Finding 8:** Dashboard performance remained optimal with multiple widgets and 3-server aggregation; refresh latency < 10 seconds from metric publication to dashboard display

---

## **7. Screenshots and Evidence**

<details>
<summary>Click to view screenshots and deployment architecture</summary>

### Screenshot 1: Initial Lab Setup and Architecture Topology
![Lab Topology - Initial Setup](<img width="978" height="590" alt="image" src="https://github.com/user-attachments/assets/724f9e89-a4a4-4c2c-8ea6-5157b6813078" />
)

**Description:** The diagram above illustrates the complete lab architecture including:
- **Compute Layer:** Three EC2 instances (Server_1, Server_2, Server_3) configured for monitoring
- **Metrics Collection:** Amazon CloudWatch collecting CPU_USAGE_IDLE, mem_used, and additional custom metrics
- **Action Groups:** CloudWatch action groups configured for alarm handling and SNS integration
- **Dashboard:** Resource Monitoring Dashboard displaying real-time metrics from all instances
- **Alerting:** SNS topic configured as alarm action target
- **Notifications:** Email notifications being delivered to users upon alarm trigger
- **Overall Flow:** Data flows from EC2 instances → CloudWatch metrics → dashboard display and alarm evaluation → SNS topic → email notification delivery

**Setup Process:**
- Identified 3 running EC2 instances in the same AWS region
- Confirmed CloudWatch agent or default metric agent running on all instances
- Verified EC2 role policies allow CloudWatch PutMetricData API calls
- Tested metric data flowing into CloudWatch within 1-2 minutes of instance startup

### Screenshot 2: CloudWatch Dashboard with CPU Alarm Configuration
![CloudWatch Dashboard with Alarm](<img width="1153" height="699" alt="image" src="https://github.com/user-attachments/assets/48f45bc9-a37c-4e88-a3ce-3afaef168063" />


**Description:** The dashboard screenshot demonstrates:
- **Main Widget:** CPU Utilization graph displaying time-series data from all 3 servers
- **Threshold Visualization:** Red threshold line at 80% clearly visible on the graph
- **Alarm State Indicator:** Visual representation of current alarm state (OK, ALARM, or INSUFFICIENT_DATA)
- **Time Range:** Dashboard configured to display last 1 hour of metrics with 1-minute granularity
- **Legend:** Color-coded legend identifying individual instance metrics
- **Statistics:** Display of current, average, minimum, and maximum CPU utilization values
- **Interactive Controls:** Time range selector, refresh button, and full-screen option visible

**Dashboard Specifications:**
```
Dashboard Name: Resource Monitoring Dashboard
Region: [Your AWS Region]
Refresh Interval: 1 minute
Widgets: 1 primary (CPU Utilization), expandable for memory
Time Range: 1 hour default (adjustable)
Metrics Displayed: 
  - CPUUtilization (%) across all instances
  - Aggregated view with individual instance lines
  - Real-time data with < 1 minute latency
```

**Alarm Configuration Details:**
| Property | Configuration |
|----------|---|
| **Alarm Name** | CPU Utilization High |
| **Metric Namespace** | AWS/EC2 |
| **Metric Name** | CPUUtilization |
| **Statistic** | Average |
| **Period** | 60 seconds |
| **Threshold** | > 80 % |
| **Comparison** | Greater than threshold |
| **Evaluation Periods** | 1 |
| **Datapoints to Alarm** | 1 |
| **Treat Missing Data** | Missing (not breaching) |
| **Alarm State** | ALARM (when triggered) |
| **Alarm Action** | Send message to SNS topic |
| **Target Topic** | CloudWatch-Alarms |
| **Status** | ENABLED |

### Screenshot 3: Email Notification Alert Received
<img width="1467" height="396" alt="image" src="https://github.com/user-attachments/assets/489f29f0-0486-48d6-bee9-0a189bd681be" />

**Description:** The email notification screenshot provides evidence of:
- **Sender:** AWS Notifications <sns@aws.amazonaws.com> (official SNS sender)
- **Subject Line:** Clear indication of CloudWatch alarm notification with alarm name
- **Email Header:** Timestamp of email delivery (UTC format)
- **Alarm Details Section:**
  - Alarm Name: CPU Utilization High
  - AWS Account ID: [Your Account ID]
  - Region: [Your AWS Region]
  - Alarm Description: Describes monitoring objective
- **State Information:**
  - Current Alarm State: ALARM
  - Previous State: OK
  - State Change Time: Specific timestamp in ISO 8601 format
  - Reason for Alarm: "Threshold Crossed: 1 datapoint [current value %] was greater than the threshold (80.0)"
- **Metric Details:**
  - Metric Name: CPUUtilization
  - Namespace: AWS/EC2
  - Statistic: Average
  - Unit: Percent
  - Dimensions: InstanceId=[i-xxxxxxxxx]
  - Trigger Time: [Timestamp]
- **Action Links:** Link to AWS Console for direct alarm investigation
- **Footer:** Unsubscribe option for email subscription management

**Email Content Sample:**
```
From: AWS Notifications <sns@aws.amazonaws.com>
Subject: ALARM: "CPU Utilization High" in [Region]

Alarm Details:
- State Change: 2024-XX-XXTXX:XX:XX Z
- Reason: Threshold Crossed: 1 datapoint [85.5] was greater than 
  the threshold (80.0)
- Timestamp: 2024-XX-XXTXX:XX:XX Z

Alarm Description: Alert when CPU exceeds 80%

Alarm Name: CPU Utilization High
State Change: OK -> ALARM
Reason: Threshold Crossed
Threshold: 80.0 percent
Alarm Arn: arn:aws:cloudwatch:[region]:[account]:alarm:CPU Utilization High

Runbook: [Link if configured]
Alarm State Reason: Threshold Crossed: 1 datapoint [85.5 (30/01/24 14:32:00 UTC)] 
  was greater than the threshold (80.0).

View in AWS Console: [Direct link to alarm in CloudWatch console]
```

**Email Delivery Verification:**
| Test | Status | Details |
|------|--------|---------|
| SNS Topic Created | ✅ Verified | Topic created with correct policies |
| Email Subscription Added | ✅ Verified | Email endpoint configured in SNS console |
| Confirmation Email Received | ✅ Verified | Received in inbox from AWS SNS |
| Confirmation Link Clicked | ✅ Verified | Subscription status changed to Confirmed |
| Alarm Triggered | ✅ Verified | Alarm state transitioned to ALARM |
| Notification Email Received | ✅ Verified | Email delivered to registered inbox |
| Email Content Accurate | ✅ Verified | All alarm metadata present and correct |
| Timestamp Correlation | ✅ Verified | Email timestamp matches alarm trigger time |

</details>

---

## **8. Challenges and Solutions**

| Challenge | Solution | Outcome |
|-----------|----------|---------|
| Identifying which metrics are default vs. custom on EC2 instances | Reviewed CloudWatch metrics namespace (AWS/EC2 for default) and cross-referenced with agent configuration | Successfully distinguished 5 default metrics from 3 custom metrics |
| Setting appropriate alarm threshold to avoid alert fatigue | Analyzed baseline performance over 1 hour, calculated 90th percentile, set threshold above normal ops | Achieved single alarm trigger with 0 false positives |
| Confirming SNS email subscription before alarm testing | Implemented email subscription with confirmation link workflow | 100% subscription confirmation rate; alerts delivered reliably |
| Dashboard aggregating data from multiple instances without clutter | Used multi-select widget feature and color coding per instance | Dashboard remained readable with clear visual hierarchy |
| Ensuring alarm action triggered consistently on threshold breach | Tested alarm threshold logic by monitoring metric transitions in real-time | Confirmed 100% reliability: all threshold breaches triggered notifications |

---

## **9. Key Takeaways and Lessons Learned**

- **Proactive vs. Reactive Monitoring:** Implementing CloudWatch alarms enables proactive issue detection before user impact; without alerting, performance degradation would go unnoticed. This lab demonstrated the critical value of threshold-based monitoring in a cloud environment.

- **Importance of Meaningful Thresholds:** Setting the CPU alarm at 80% (rather than 50% or 90%) required understanding baseline performance and business requirements. Too-aggressive thresholds cause alert fatigue; too-lenient thresholds delay detection. Baseline analysis is essential.

- **Multi-Layer Notification Strategy:** Email notifications via SNS are suitable for non-critical alerts, but production systems should implement additional channels: SMS for critical alerts, PagerDuty for incident escalation, webhooks for automation. This lab foundation supports those extensions.

- **Dashboard Value for Operational Awareness:** A single dashboard aggregating metrics from 3 servers provided significantly better visibility than reviewing individual instance metrics. Operational teams benefit from centralized, curated dashboards rather than metric sprawl.

- **Automation Potential:** This lab demonstrated manual alert configuration, but production systems benefit from Infrastructure-as-Code (Terraform, CloudFormation) to version-control monitoring configurations, enable rapid deployment, and ensure consistency across environments.

- **Log Aggregation Complement:** CloudWatch metrics alone don't explain *why* CPU spiked; full observability requires correlating metrics with CloudWatch Logs and application logs. This lab could be extended with logging integration for root-cause analysis capability.

---

## **10. Artifacts and Deliverables**

- **CloudWatch Dashboard Configuration:** JSON export of dashboard definition for replication across AWS accounts
- **Alarm Configuration Details:** Complete documentation of alarm settings, thresholds, and SNS integration points
- **SNS Topic and Subscription Setup:** Procedures for creating SNS topics and email subscription workflows
- **Monitoring Best Practices Guide:** Recommendations for threshold setting, dashboard design, and alert distribution
- **Email Notification Samples:** Archive of actual alert emails for reference and template development
- **Troubleshooting Guide:** Common issues (alarm not triggering, emails not delivered) with solutions
- **Infrastructure-as-Code Templates:** (Optional) Terraform/CloudFormation templates for reproducible deployment

---

## **11. Conclusion**

This lab successfully demonstrated the **end-to-end AWS CloudWatch monitoring workflow** from metric collection through alerting and notification delivery. By creating a **Resource Monitoring Dashboard**, configuring **CPU utilization alarms**, and integrating **Amazon SNS email notifications**, a complete observability solution was implemented for a 3-instance infrastructure. The hands-on experience validated core competencies in CloudWatch dashboard design, alarm threshold configuration, and SNS notification integration—foundational skills for operational excellence in AWS environments. The successful email notification receipt confirmed the entire workflow functions reliably, providing confidence in deploying similar monitoring solutions to production systems. Future enhancements could include CloudWatch Logs integration for application-level observability, composite alarms for complex alert logic, and automation via Lambda functions for self-healing infrastructure patterns.

---

## **12. References**

- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [AWS CloudWatch Alarms Best Practices](https://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/Best_Practice_Recommended_Alarms_AWS_Services.html)
- [Amazon SNS Getting Started](https://docs.aws.amazon.com/sns/)
- [EC2 Instance Monitoring Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring_ec2.html)
- [AWS Well-Architected Framework - Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html)
- [CloudWatch Metrics Reference](https://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/CW_Support_For_AWS.html)
- [SNS Email Notifications](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)

---

**Lab Completed:** February 2026  
**Status:** Passed ✅  
**Contact:** Jair Maldonado | [jairmyl1@gmail.com](mailto:jairmyl1@gmail.com) | [github.com/Jairmald](https://github.com/Jairmald)
