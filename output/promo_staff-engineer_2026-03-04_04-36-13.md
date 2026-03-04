

# Promotion Packet: Senior Software Engineer → Staff Engineer

## Summary

The candidate has consistently operated at Staff-level scope over the past two years at Tech Company Inc., leading the company's most critical infrastructure initiative — a full microservices migration — while simultaneously raising engineering standards across the organization. They combine deep technical judgment with a track record of growing junior engineers, driving cross-team alignment on contentious architectural decisions, and delivering measurable improvements in reliability, performance, and developer velocity.

## Project Highlights

### Microservices Migration (2024)

The candidate was asked to lead the migration of Tech Company Inc.'s monolith into microservices — a 9-month effort with a team of 5 engineers, several of whom had no distributed systems experience. There was no predefined architecture; leadership wanted speed, but the candidate assessed the risk and chose a strangler fig pattern, extracting services incrementally and running them in parallel with the monolith before cutting over traffic. This required selling the approach upward to leadership and across to skeptical teammates who favored a big-bang rewrite. The results were significant: API response times dropped 40%, uptime improved from 99.5% to 99.9%, deploy times went from roughly 2 hours to 15 minutes, and infrastructure costs decreased 25% through per-service rightsizing. Beyond the technical outcomes, all 5 engineers on the team emerged with solid distributed systems skills — a direct result of the candidate's sustained investment in pairing and mentorship throughout the project.

### Real-time Notifications System (2023)

The candidate volunteered to design and build the company's real-time notification system, targeting 500K+ active users — a scale significantly beyond anything the team had tackled. They began with a structured spike comparing WebSockets, SSE, and polling, ultimately selecting WebSockets and prototyping the approach in a week for stakeholder buy-in. When the initial connection management layer buckled under simulated load — reconnect storms and memory leaks — the candidate made the disciplined decision to discard it and rebuild with proper backoff strategies and connection pooling rather than patching a flawed foundation. The system launched on time with no major incidents and handled production load cleanly at scale.

### Auth & User Management Overhaul (Q1 2023)

The candidate took ownership of adding OAuth support (Google and GitHub) to an auth system that had accumulated significant technical debt — tangled session handling, manual token logic, and silent failure modes that generated a high volume of support tickets. Rather than rushing to bolt on OAuth, the candidate spent the first two weeks mapping and documenting the existing system before designing the integration. They prioritized robust error handling over speed, shipping one week past the original deadline but with high quality. Auth-related support tickets dropped approximately 60% in the month following launch, and the system maintained 99.7% uptime with no major incidents. The candidate became the recognized auth authority on the team as a result.

## Leadership & Mentorship

The candidate led the 5-person microservices migration team end-to-end — from architecture and planning through execution, unblocking, and delivery over 9 months. When the team and leadership disagreed on migration strategy, the candidate built alignment by clearly articulating the trade-offs of incremental extraction versus big-bang rewrite, ultimately bringing both sides to consensus on the strangler fig approach. Throughout the migration, the candidate invested heavily in growing the junior engineers on the team, pairing with them on both distributed systems concepts and implementation details. All 5 engineers came out of the project with strong distributed systems capabilities — a concrete multiplier effect on the organization's technical capacity.

Earlier in their career, the candidate mentored two interns during the summer of 2021, spending significant time improving developer onboarding tooling alongside them — validating the tooling improvements while building the interns' skills. This pattern of combining technical delivery with people development has been consistent across roles.

## Engineering Excellence

The candidate identified that Tech Company Inc. was shipping too many bugs to production in mid-2023, diagnosed it as a systemic culture problem rather than an individual one, and took direct action. They drafted a lightweight code review standard covering test coverage expectations, a clear definition of "done," and guidelines for constructive review feedback. They ran workshops with the team and held firm against pushback from engineers who worried the standards would slow delivery. Within one quarter, production bugs dropped 35%. By end of 2024, test coverage across the microservices reached 95%.

The candidate also rebuilt the CI/CD pipeline, which had been brittle and a source of "mystery failure" incidents. The new pipeline cut deploy times significantly and eliminated an entire class of flaky build failures. These improvements — the review standards, the coverage norms, and the pipeline — are now embedded in how the team operates, not dependent on the candidate's ongoing involvement.

On the operational side, the candidate served on the on-call rotation throughout 2023–2024, resolving 15 incidents in 2023 alone with an average resolution time of approximately 45 minutes. They proactively fixed systemic performance issues, including a batch of N+1 query fixes that alone reduced page load times by 30%.

## Organizational Contributions

The candidate has consistently invested in problems beyond their direct project scope. They rebuilt the CI/CD pipeline not because it was assigned but because it was a drag on the entire team's velocity. They established code review standards and ran workshops that changed the team's engineering culture — shifting from "it works on my machine" to a shared accountability for production quality.

At their previous company, the candidate identified that developer onboarding was a significant organizational bottleneck — local setup took a full day and frequently broke. On their own initiative, they built a single setup script and Docker Compose configuration that reduced onboarding time to under 30 minutes. They also built an internal transaction replay tool that eliminated a recurring dependency between the support team and engineering, freeing up engineering hours and improving support response times. These are examples of a pattern: the candidate sees friction that affects others, takes ownership without being asked, and builds solutions that persist.

The candidate also contributed to compliance and regulatory work at their previous company, helping achieve PCI Level 2 certification and writing internal documentation that became a lasting onboarding resource for new engineers.

## Peer Quotes

> *[Placeholder — consider soliciting from a junior engineer on the microservices migration team, e.g.:] "Before the migration project, I had never worked on distributed systems. [Candidate] didn't just assign me tasks — they paired with me on the hard parts and made sure I understood the 'why' behind every decision. I came out of that project a fundamentally stronger engineer."*

> *[Placeholder — consider soliciting from a peer or engineering manager, e.g.:] "When our deploy pipeline was failing every other day, [Candidate] just fixed it. Nobody asked them to. That's the kind of thing that's hard to put in a performance review but makes the whole team faster."*
