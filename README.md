# Resume Context Builder

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/runtime-Bun-f9f1e1?logo=bun)](https://bun.sh)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **Stop manually updating your resume for every job application.**

A collection of prompt engineering scripts that generate tailored resumes using whatever LLM you're already paying for. No app to run, no new subscriptions—just fork, add your career history, and let your existing AI do the work.

Your data stays in your repo. The community contributes resume templates and best practices. You get polished, job-specific resumes without handing your career history to yet another service.

## Why Use This?
- **Works with any LLM you are paying for** - Re-use whatever LLM subscription you are already using.
- **Easy to Maintain** - When you change jobs or finish a project, jot down your thoughts in a journal file. No formal structure required.
- **Generates resumes for any job-type** - With your existing work-experience rebuild your resume for a different job-type.
- **ATS-Optimized** - Generate resumes that pass Applicant Tracking Systems while remaining human-readable
- **Privacy** - Just fork this repo and maintain your own copy, don't give your information to anyone.
- **Crowd sources** - Industry professionals are encouraged to contribute to this repo: adding new resume-types and refining existing resume-types.

## How It Works

1. **Write your career journal** — Add a markdown file to `career/` for each job (e.g., `stripe.md`, `google-maps-team.md`). Write it like a personal journal: free-flowing thoughts, bullet points, whatever comes naturally. No formal structure required.
2. **Pick a resume type** — Choose from `resume-types/`, modify one, or create your own
3. **Run the generate command** — `bun run generate -- --type <resume-type>`
4. **Wait for your resume** — The script builds a prompt and sends it to your LLM, outputting a polished resume in the `/output` folder.

## Career Journal Format

Your career files are not formal documents — they're personal notes. Write them however feels natural. The AI figures out the rest.

Each file covers one job or team. Within it, use sections to organize by feature or project. Write chronologically within each section if that helps you think through it. Mix bullets and prose freely.

**There is no required structure.** The only goal is to get your thoughts out of your head. The more detail the better — metrics, context, what was hard, what you're proud of. The LLM will extract what matters.

See `career/tech-company-inc.md` for a full example.

## Quick Start

### Prerequisites

Before you begin, you'll need:

1. **Bun** (version 1.0 or higher)
   - Check if installed: `bun --version`
   - [Install Bun](https://bun.sh/) - Run `curl -fsSL https://bun.sh/install | bash`

2. **An AI Provider CLI** (currently supports Gemini CLI and Claude Code CLI)
   - [Gemini CLI](https://github.com/google-gemini/gemini-cli) — Free with a Google account, and the default provider for this repo. Note: the free tier gets throttled fairly easily, so if you're generating multiple resumes in a session you may hit rate limits. Just wait a minute and retry.
   - [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/overview) — Requires an Anthropic API key (paid)
   - Alternative: Use `--paste` mode to generate prompts for any AI tool you already use

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd resume-context-builder

# 2. Install dependencies
bun install

# 3. Fill in your information
# - Add your career journal files to career/ (one file per job, e.g. stripe.md)
# - Add your education to education/education.md
# - Review resume-types/ for available templates

# 4. Generate your first resume
bun run generate -- --type software-engineer

# 5. Tailor it to a specific job
bun run generate -- --type software-engineer --job job-descriptions/example-senior-swe.md
```

## Ask a Question
Often times you get a job application that asks a question like "Tell us how your experience is relevant to ABC" or "Do you have experience with XYZ? Explain.".

To quickly answer these questions, run:
```bash
bun run answer -- "Do you have experience with XYZ? Explain."
```

## Behavioral Interview Cheat-Sheet
Before an interview, generate a cheat-sheet of pre-written answers to common behavioral questions. The output is a quick-reference document you can read through the night before to refresh your memory on specific stories and examples.

Edit `support/behavior.md` to add or remove questions, then run:
```bash
bun run behavior
```

The cheat-sheet will be saved to `output/behavior-cheat-sheet_<timestamp>.md`.

## Project Structure

```
career-context-builder/
├── src/                     # TypeScript source code
│   ├── generate.ts          # Resume generation CLI
│   ├── answer-question.ts   # Job application question answering CLI
│   ├── behavior.ts          # Behavioral cheat-sheet generation CLI
│   ├── types.ts             # Type definitions
│   ├── providers.ts         # AI provider configurations
│   ├── utils.ts             # Utility functions
│   └── prompt.ts            # Prompt building logic
├── career/                  # Career journal files, one per job
│   ├── stripe.md
│   ├── google-maps-team.md
│   └── ...
├── resume-types/            # Resume templates and formatting rules
│   ├── common-rules.md      # Rules that apply to all resume types
│   ├── software-engineer.md
│   ├── tech-lead.md
│   └── ...
├── education/               # Education history
│   └── education.md
├── support/                 # Interview prep resources
│   └── behavior.md          # Behavioral questions list for cheat-sheet generation
├── job-descriptions/        # Optional job descriptions for tailoring
│   └── *.md
├── reference-resumes/       # Example resumes for reference
│   └── *.md
├── output/                  # Generated resumes
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Command Line Options

- `--type` or `-t`: Resume type (required, must match a file in resume-types/)
- `--job` or `-j`: Path to job description file (optional)
- `--reference` or `-r`: Path to reference resume (optional)
- `--output` or `-o`: Output file path (default: output/resume-{timestamp}.md)
- `--paste` or `-p`: Print prompt to terminal instead of calling AI provider (optional)
- `--provider`: AI provider to use (default: claude) - extensible for future providers

## Usage Examples

### Basic Resume Generation

Generate a resume using a specific template:

```bash
bun run generate -- --type software-engineer
```

### Tailor to a Job Description

Match your resume to a specific job posting:

```bash
bun run generate -- --type software-engineer --job job-descriptions/example-senior-swe.md
```

### Use a Reference Resume

Generate based on a reference format:

```bash
bun run generate -- --type software-engineer --reference reference-resumes/example.md
```

### Paste Mode (Manual Use)

Print the prompt instead of auto-generating (useful for testing):

```bash
bun run generate -- --type software-engineer --paste
```

### Use a Different AI Provider

The tool is designed to be extensible with different AI providers:

```bash
bun run generate -- --type software-engineer --provider claude
bun run generate -- --type software-engineer --provider gemini
```

## FAQ

**Q: Do I need programming knowledge to use this?**
A: Basic command line familiarity and Bun installed. If you can run `bun install` and `bun run` commands, you're good to go.

**Q: Can I use this with other AI models besides Gemini?**
A: Yes! The TypeScript codebase is designed to be extensible. Currently supports Gemini CLI and Claude Code CLI, but you can easily add new providers in `src/providers.ts`. You can also use `--paste` mode to generate prompts for any AI tool.

**Q: How much does it cost?**
A: The tool itself is free and open source. You'll need access to an AI provider (like Gemini CLI or Claude Code CLI).

**Q: Will this work for non-technical resumes?**
A: Absolutely! While built by developers, it works for any profession. Just customize your resume types and career files accordingly.

**Q: How do I handle gaps in employment?**
A: Just note it briefly in the relevant journal file or as its own file. The resume type rules can specify how to handle gaps.

**Q: Can I use this for multiple people (e.g., as a career coach)?**
A: Yes! Just create different branches for each person.

**Q: Can I contribute a resume type for a specific company?**
A: Yes! If you want to add a resume type tailored to a specific company's hiring style, suffix the filename with the company name (e.g., `software-engineer-google.md`, `product-manager-stripe.md`).

## Contributing

Contributions are welcome! Here are some ways you can help:

- **Share resume templates** - Submit your resume type configurations
- **Refine existing resume templates** - Update existing resume-types with better LLM instructions.
  - NOTE: Think of this as the average of the industry. What is relevant for your company might not be relevant across the entire industry. If you still think there can be a different resume-type, just add a new resume-type files. Make sure the naming is good.
- **Add AI providers** - Extend `src/providers.ts` to support more AI services
- **Report issues** - Found a bug? Open an issue

## License

This project is open source and available under the MIT License.

## Acknowledgments

Built with TypeScript and designed to work with AI providers like [Gemini CLI](https://github.com/google-gemini/gemini-cli) by Google and [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/overview) by Anthropic.

---

**Made with AI, for humans looking for their next opportunity.**

If this tool helped you land a job, star this repo and share it with others!
