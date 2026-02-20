# Fintech Startup
Junior Software Engineer | Jul 2019 – Dec 2022

## Payments Dashboard
- This was my first real project. They put me on it two weeks after joining, which felt fast
- The product manager handed me a Figma file and said "build this." No backend spec, no API docs, just the designs
- I had to reverse-engineer what the API should look like from the UI, which was a weird way to learn but it stuck

I was working in React for the first time professionally. Read a lot of docs, broke things a lot, fixed them. The senior engineer on the team (Marcus) was good about reviewing my PRs without making me feel stupid — I learned more from his comments than I did from any tutorial.

Shipped the first version of the dashboard in about 6 weeks. It was rough but it worked. We iterated on it over the next year.

- Eventually covered 8 different payment methods and 15 currencies
- Average page load time was a problem early on — got it from 6s down to 1.2s over a few iterations, mostly lazy loading and fixing waterfall API calls
- By the end it was processing data for ~50K transactions per day

## Fraud Detection Pipeline
- Came out of a bad week in Q3 2020 where we had a spike in fraudulent transactions — chargeback rate hit nearly 3%
- The CEO was stressed. Engineering got pulled in to figure out what we could do quickly
- I got assigned to help build a rules-based detection layer as a stopgap while the ML team built something more sophisticated

I'd never worked on anything like this before. Spent a few days just reading about fraud patterns before writing anything. We built a rules engine that would flag transactions based on configurable thresholds — velocity checks, device fingerprinting, geo mismatch, that sort of thing.

The ML team's model took longer than expected (as it always does) so our rules engine ended up staying in production way longer than planned, about 18 months.

- Chargeback rate dropped from 2.8% to 0.4% within two months of launching the rules engine
- False positive rate was a constant negotiation — we tuned it down to 0.3% without letting bad transactions through
- Handed it off to the ML team eventually once their model was validated

## Internal Tooling & Developer Experience
By year two I had opinions about our dev tooling, which was genuinely terrible. Local setup took a full day and still regularly broke. Builds were slow and flaky. Nobody owned it.

- Volunteered to fix local development setup in my 20% time
- Wrote a single setup script and Docker Compose config that got new engineers to a running environment in under 30 minutes
- Mentored two interns during the summer of 2021 — ended up spending a lot of time on this setup work with them which validated it was actually better

Also built an internal transaction replay tool so the support team could simulate failed payments without touching prod. Before that they'd been asking engineers to do it manually every time.

## Compliance & Regulatory Work
This was the unglamorous part of the job. PCI DSS compliance work, mostly. Audits, evidence collection, fixing things that the auditors flagged. Not interesting but important.

- Helped get the company through its first PCI Level 2 certification
- Wrote a bunch of internal documentation during this period that actually ended up being useful when we onboarded new engineers

## Stack
JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, Redis, Stripe API, Docker, AWS (EC2, RDS, S3, SQS), CircleCI, Datadog, Mixpanel
