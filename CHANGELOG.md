# Changelog

All notable changes to this project will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.3.0] - 2026-05-04

### Added
- Education journals — the `education/` directory now supports multiple `.md` files, not just `education.md`. Add as many files as you like (one per degree, one for certifications, one for bootcamps, etc.) and they will all be included in the prompt context automatically
- `education/bs-computer-science.md` — example education journal covering an undergraduate CS degree in narrative style
- `education/professional-certifications.md` — example education journal covering professional certifications and additional training

### Changed
- All scripts (`generate`, `behavior`, `answer-question`) now read the entire `education/` directory instead of only `education/education.md`
- Education is now labelled **Education Journal** in prompts and includes per-file headers (`#### education/{filename}`) consistent with how career files are formatted, so the LLM can distinguish sources

---

## [1.2.0] - 2026-03-03

### Added
- Promotion document CLI (`bun run promo`) — generates a structured promo packet from your career journal and a criteria file
  - Requires `-c, --criteria <name>` to specify a criteria file from the new `promo/` directory
  - Supports `--paste`, `--provider`, and `-o` flags consistent with other scripts
  - Output saved to `output/promo_<criteria>_<timestamp>.md` by default
- `promo/` directory for storing promotion criteria documents
- `promo/staff-engineer.md` — example criteria for Senior → Staff Engineer promotion, covering Technical Impact, Engineering Excellence, Leadership & Influence, and Organizational Contribution

---

## [1.1.0] - 2026-02-19

### Changed
- Career files are now **journal-style**, organized by job/team instead of by year — write free-flowing thoughts, not formal documents
- Prompts now embed file contents directly rather than referencing file paths, fixing an issue where Gemini CLI's agentic mode would interpret the task as "run a script" instead of generating the resume
- Updated prompt labels and descriptions to tell the LLM how to interpret informal journal notes

### Added
- `career/tech-company-inc.md` — example journal file covering a multi-year tenure, showing the narrative style
- `career/fintech-startup.md` — second example journal file showing an earlier-career role at a smaller company
- `support/behavior.md` — list of common behavioral interview questions, organized by theme
- Behavioral interview cheat-sheet CLI (`bun run behavior`) — generates a STAR-format answer cheat-sheet from your career journal and the questions in `support/behavior.md`
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
