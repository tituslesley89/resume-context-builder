# Tech Company Inc.
Software Engineer → Senior Software Engineer | Jan 2023 – Present

## Auth & User Management
- Started this in Q1 2023, basically my first big ownership piece at the company
- The ask was simple: add Google and GitHub login. But nobody had warned me how bad the existing auth code was
- There was no real spec — just "make OAuth work" and a deadline in 6 weeks

I started digging into the codebase and found a tangle of session handling and manual token logic that nobody fully understood. I mapped it all out before touching anything. Spent the first two weeks just documenting what existed.

Once I had a clear picture I designed the OAuth flow on top of what we had rather than ripping it out. Built the Google integration first since it was cleaner, then GitHub. A lot of the complexity was in error handling — the old system would silently fail and confuse users, so I made that a priority.

- Shipped Google + GitHub login about 7 weeks in (one week late but the quality was there)
- Auth support tickets dropped ~60% in the following month — mostly just from better error messages
- Kept 99.7% uptime throughout, no major incidents
- Got pulled into more auth work after this — became the de facto auth person on the team

## Real-time Notifications
- Product came to engineering mid-2023 with a request for real-time notifications for all users
- I put my hand up for it — wanted to work on something with scale
- The scale target was 500K+ active users, which was bigger than anything I'd done before

I started with a spike to figure out the right approach — WebSockets vs SSE vs polling. Went with WebSockets. Built a prototype in a week, demoed it, got the green light.

The first version of the connection management layer was naïve. Under simulated load it fell apart — reconnect storms, memory leaks, the works. I had to throw it out and rebuild with a proper backoff strategy and connection pool. Painful but I learned a lot.

Launched on time. The system handled the load well at launch and we didn't have any major incidents. I handed off ownership after launch but stayed involved in incidents.

## Microservices Migration
- This was the big one in 2024. The monolith had been creaking for a year and leadership finally committed to breaking it up
- I was asked to lead it — 5 engineers, 9-month timeline
- A couple of the engineers on the team were relatively junior and hadn't worked on distributed systems before

I spent the first month on planning and architecture before writing a single line of code. Chose a strangler fig pattern — carve out services piece by piece rather than a big bang rewrite. Had to sell this approach to both the team and leadership; some people wanted to go faster.

The migration itself was incremental. We'd extract a service, run it in parallel with the monolith, validate, then cut over traffic. Slower but safe. I spent a lot of time pairing with the junior engineers — as much on the concepts as the implementation.

- API response times down 40% after we got proper caching in place for each service
- Uptime improved from 99.5% to 99.9%
- Deploy time went from ~2 hours to 15 minutes once the pipeline was sorted
- Infra costs down 25% just from being able to rightsize each service independently
- All 5 engineers are now solid on distributed systems — that part I'm genuinely proud of

## Code Quality & Dev Experience
- By mid-2023 we were shipping too many bugs to prod. No one thing you could point to, just a culture of "it works on my machine" and not enough review rigor
- I volunteered to lead the fix

I drafted a lightweight code review standard — nothing heavy, just expectations around coverage, what "done" means, and how to give useful feedback. Ran a couple of workshops with the team. There was some pushback initially ("we're going too slow already") but I held the line.

After a quarter the numbers backed it up. Also used this as an opportunity to rebuild the CI/CD pipeline, which had been brittle and manual.

- Production bugs down 35% within a quarter of rolling out the standards
- Test coverage hit 95% across the microservices by end of 2024
- New CI/CD pipeline cut deploy times significantly and reduced the "mystery failure" incidents

## General Grind
Just the steady stream of features and on-call. Shipped 20+ features across 4 sprints in 2023 and 15+ bigger ones in 2024. The work was a mix — Python backends, some React frontend, and later some Go for the new services.

Was on the on-call rotation the whole time. 15 incidents in 2023, average resolution around 45 minutes. Got a lot faster as the systems matured and we built better runbooks.

Fixed a lot of slow database queries along the way too — at one point a batch of N+1 fixes alone dropped page load times by 30%.

## Stack
Python, TypeScript, Go, Django, FastAPI, React, Node.js, PostgreSQL, Redis, MongoDB, AWS (EC2, S3, Lambda, RDS), Docker, Kubernetes, Jenkins, GitHub Actions, Datadog, Sentry
