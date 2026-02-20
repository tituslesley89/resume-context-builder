# Changelog

All notable changes to this project will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.0] - 2026-02-19

### Changed
- Career files are now **journal-style**, organized by job/team instead of by year — write free-flowing thoughts, not formal documents
- Prompts now embed file contents directly rather than referencing file paths, fixing an issue where Gemini CLI's agentic mode would interpret the task as "run a script" instead of generating the resume
- Updated prompt labels and descriptions to tell the LLM how to interpret informal journal notes

### Added
- `career/tech-company-inc.md` — example journal file covering a multi-year tenure, showing the narrative style
- `career/fintech-startup.md` — second example journal file showing an earlier-career role at a smaller company
- Gemini CLI free tier throttling note in README prerequisites

### Fixed
- Resume output contained instructions/meta-commentary instead of an actual resume when using Gemini CLI

### Removed
- `career/2023.md` and `career/2024.md` — replaced by the job-based journal format

### Migration Guide
If you used v1.0.0, rename or reorganise your career files from `career/YYYY.md` to one file per job (e.g. `career/company-name.md`). The format is now free-form — no required sections or headings.

---

## [1.0.0] - 2026-02-19

Initial public release.

### Added
- Resume generation CLI (`bun run generate`) with `--type`, `--job`, `--reference`, `--output`, `--paste`, and `--provider` flags
- Question answering CLI (`bun run answer`) for job application questions
- Gemini CLI and Claude Code CLI provider support
- `resume-types/software-engineer.md` and `resume-types/common-rules.md` templates
- Year-based example career files
- Education and job description context support
