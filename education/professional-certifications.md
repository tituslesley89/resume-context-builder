# Professional Certifications
2022 – 2024

These aren't courses I took to pad a resume. I went after each of them because I kept running into gaps in my knowledge on the job and studying for a cert was a forcing function to actually close them.

## AWS Certified Solutions Architect – Associate
**Issued: March 2024**

By the time I started studying for this, I'd been using AWS for about four years — EC2, RDS, S3, Lambda, a bit of SQS. But I was using it the way most engineers use it: when I needed something, I figured out how to make it work, and I didn't think too hard about why or whether there was a better option.

The SAA-C03 exam forces you to think across services at an architecture level, not just "here's the thing I need to set up." The hardest sections for me were cost optimization (I'd never had to think about AWS billing seriously) and high availability patterns.

- Studied about 6 weeks, mostly on weekends
- Used Stephane Maarek's course on Udemy — it's thorough and current
- Passed first attempt with a 789/1000

This one was directly useful at work within a month. I was doing a VPC design review and actually knew what I was talking about.

Credential ID: ABC123XYZ

## Certified Kubernetes Administrator (CKA)
**Issued: January 2024**

We migrated to Kubernetes as part of the microservices work at my current job. I'd been using it for about a year at that point — mostly reading YAML configs that other people had written and hoping I understood them well enough not to break anything.

Getting the CKA was about actually understanding what was happening under the hood: how pods get scheduled, how networking works between services, what the control plane does, why etcd matters.

The hands-on exam format (you have to actually do things in a live cluster, not answer multiple choice) made it more stressful but also more meaningful. Two weeks before the exam I set up a local multi-node cluster with kubeadm and broke it in every way I could think of just to learn how to fix it.

- Passed on my second attempt — failed the first time by getting too slow on the cluster setup questions
- Between attempts I focused specifically on timing: practiced common tasks with the k8s docs open until I could do them fast
- Credential ID: LF-123456789

## Professional Scrum Master I (PSM I)
**Issued: June 2023**

My company started pushing harder on Agile process around early 2023 — more structured sprints, proper retrospectives, that kind of thing. My manager suggested I get the PSM I since I was already informally facilitating team ceremonies.

It's mostly a knowledge-based exam, not skills-based. I read the Scrum Guide twice and passed. What I actually found useful was the underlying thinking about empirical process — inspect, adapt, reduce uncertainty incrementally — which applied to things well outside formal Scrum contexts.

## Additional Training

**Machine Learning Specialization** — Coursera (Andrew Ng, 2022)
Came back to ML to fill in the gaps from my undergrad course. The three-course specialization is well structured. I got through the first two courses (supervised learning, advanced ML) and started the third (unsupervised + reinforcement learning) before work got busy and I deprioritized it. I have a solid working understanding of regression, classification, and neural networks now, enough to collaborate meaningfully with ML engineers even if I'm not implementing models myself.

**Leadership Fundamentals** — Management Course, Internal (2023)
A half-day workshop my company offered for engineers moving into more senior roles. Covered giving feedback, running 1:1s, and navigating disagreements. Not transformative, but it gave me a shared vocabulary with my manager and some lightweight frameworks I've actually used.

**Advanced System Design** — Internal Company Training (2024)
A four-session internal course run by a principal engineer. Focused on distributed systems tradeoffs: consistency vs availability, partition tolerance, designing for failure. I found this more useful than most external content on system design because it was grounded in actual production decisions our company had made.
