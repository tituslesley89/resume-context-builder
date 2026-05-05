#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { spawnSync } from 'child_process';
import { readFileSync, readdirSync, existsSync, writeFileSync, unlinkSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { getProvider, listProviders } from './providers.js';
import { generateTimestamp } from './utils.js';

function readFile(filePath: string): string {
  if (!existsSync(filePath)) return '';
  return readFileSync(filePath, 'utf8');
}

function readCareerFiles(): string {
  if (!existsSync('career')) return '';
  const files = readdirSync('career')
    .filter((f) => f.endsWith('.md'))
    .sort();
  return files.map((f) => `#### career/${f}\n${readFile(`career/${f}`)}`).join('\n\n');
}

function readEducationFiles(): string {
  if (!existsSync('education')) return '';
  const files = readdirSync('education')
    .filter((f) => f.endsWith('.md'))
    .sort();
  return files.map((f) => `#### education/${f}\n${readFile(`education/${f}`)}`).join('\n\n');
}

function buildPrompt(): string {
  const careerContent = readCareerFiles();
  const educationContent = readEducationFiles();
  const questionsContent = readFile('support/behavior.md');

  return `You are helping a candidate prepare for behavioral interviews. Using their career journal, generate a concise cheat-sheet they can review before an interview.

## Output Requirements:
- For each behavioral question listed below, write a short answer (3-6 sentences or equivalent bullets) grounded in the candidate's actual experience
- Use the STAR format loosely (Situation, Action, Result) — but keep it natural, not robotic
- Write in first person
- Be specific: reference real projects, technologies, and metrics from the career journal where relevant
- Keep each answer tight enough to be a quick refresher, not a full essay
- Group answers under the same headings as the questions
- Output ONLY the cheat-sheet content in clean markdown, no meta-commentary

## Behavioral Questions:
${questionsContent}

## Career Journal:
The following are informal career journal notes, one file per job. They are personal, free-flowing notes — not formal documents. Extract the relevant experiences from them to answer the questions above.

${careerContent}

## Education:
${educationContent}

Now generate the behavioral interview cheat-sheet. Output ONLY the markdown content, nothing else.`;
}

function executeProvider(command: string, prompt: string, outputFile: string): boolean {
  try {
    console.log(chalk.green('Generating behavioral cheat-sheet...'));

    const promptFile = `/tmp/behavior-prompt-${Date.now()}.txt`;
    writeFileSync(promptFile, prompt);

    try {
      const result = spawnSync('sh', ['-c', `cat "${promptFile}" | ${command}`], {
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      });

      if (result.error || result.status !== 0) {
        console.error(chalk.red('Error: Failed to generate cheat-sheet'));
        if (result.stderr) console.error(result.stderr);
        return false;
      }

      writeFileSync(outputFile, result.stdout);
      console.log(chalk.green(`Cheat-sheet saved to: ${outputFile}`));
      return true;
    } finally {
      unlinkSync(promptFile);
    }
  } catch (error) {
    console.error(chalk.red('Error: Failed to execute AI provider'));
    console.error(error);
    return false;
  }
}

function main() {
  const program = new Command();

  program
    .name('behavior')
    .description('Generate a behavioral interview cheat-sheet from your career journal')
    .version('1.0.0')
    .option('-o, --output <file>', 'Output file path (default: output/behavior-cheat-sheet-TIMESTAMP.md)')
    .option('-p, --paste', 'Print prompt to terminal instead of calling AI provider', false)
    .option('--provider <provider>', 'AI provider to use (default: gemini)', 'gemini')
    .addHelpText(
      'after',
      `
Examples:
  $ bun run behavior
  $ bun run behavior -- --provider claude
  $ bun run behavior -- --paste
    `
    );

  program.parse();

  const options = program.opts<{ output?: string; paste: boolean; provider: string }>();

  // Validate provider
  const provider = getProvider(options.provider);
  if (!provider) {
    console.error(chalk.red(`Error: Unknown provider '${options.provider}'`));
    console.error('Available providers:', listProviders().join(', '));
    process.exit(1);
  }

  // Check provider availability
  if (!options.paste && !provider.checkAvailable()) {
    console.error(chalk.yellow(`Warning: ${provider.name} not found in PATH`));
    console.error(`This script requires ${provider.name} to generate the cheat-sheet`);
    console.error('Or use --paste mode to generate the prompt for manual use');
    process.exit(1);
  }

  // Check behavior questions file exists
  if (!existsSync('support/behavior.md')) {
    console.error(chalk.red('Error: support/behavior.md not found'));
    console.error('Create this file with a list of behavioral questions to prepare for');
    process.exit(1);
  }

  // Set default output file
  if (!options.output) {
    const timestamp = generateTimestamp();
    options.output = `output/behavior-cheat-sheet_${timestamp}.md`;
  }

  // Create output directory if needed
  const outputDir = dirname(options.output);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log(chalk.green('Building behavioral cheat-sheet...'));
  console.log(`Output: ${options.output}`);
  console.log(`Provider: ${options.provider}`);
  console.log('');

  const prompt = buildPrompt();

  if (options.paste) {
    console.log(chalk.yellow(`Paste mode — displaying prompt for manual use with ${provider.name}`));
    console.log('');
    console.log(prompt);
    console.log('');
    console.log(chalk.green(`Save the output to: ${options.output}`));
  } else {
    const success = executeProvider(provider.command, prompt, options.output);
    if (!success) process.exit(1);
    console.log('');
    console.log(chalk.green('Done!'));
  }
}

main();
