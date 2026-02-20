import { readFileSync, readdirSync, existsSync } from 'fs';
import type { GenerateOptions } from './types.js';

function readFile(filePath: string): string {
  if (!existsSync(filePath)) return '';
  return readFileSync(filePath, 'utf8');
}

function readCareerFiles(): string {
  if (!existsSync('career')) return '';
  const files = readdirSync('career')
    .filter((f) => f.endsWith('.md'))
    .sort();
  return files
    .map((f) => `#### career/${f}\n${readFile(`career/${f}`)}`)
    .join('\n\n');
}

export function buildPrompt(options: GenerateOptions, resumeTypeFile: string): string {
  const careerContent = readCareerFiles();
  const educationContent = readFile('education/education.md');
  const commonRulesContent = readFile('resume-types/common-rules.md');
  const resumeTypeContent = readFile(resumeTypeFile);

  let prompt = `You are a professional resume writer. Generate a resume based solely on the career information provided below. Output ONLY the resume in clean markdown format — no explanations, no meta-commentary, no code blocks wrapping the output.

## Output Requirements:
- Output ONLY the resume content in raw markdown
- Do not include any introductory text, explanations, or commentary
- Do not wrap the output in code blocks
- Follow all formatting rules specified in the Common Rules and Resume Type sections below

## Common Rules:
${commonRulesContent}

## Resume Type: ${options.type}
${resumeTypeContent}

## Career Journal:
The following are informal career journal notes, one file per job. Each file is written in a personal, free-flowing style — a mix of bullet points and paragraphs, organized by feature or project. They are not formal documents. Extract the relevant experience, achievements, and technologies from them to build the resume.

${careerContent}

### Education: education/education.md
${educationContent}`;

  if (options.job) {
    const jobContent = readFile(options.job);
    prompt += `\n\n## Job Description (tailor the resume to match this):\n${jobContent}`;
  }

  if (options.reference) {
    const referenceContent = readFile(options.reference);
    prompt += `\n\n## Reference Resume (use as a formatting/style guide):\n${referenceContent}`;
  }

  prompt += `\n\nNow generate the resume. Output ONLY the markdown resume content, nothing else.`;

  return prompt;
}
