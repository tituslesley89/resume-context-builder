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

function buildPrompt(criteriaFile: string): string {
  const careerContent = readCareerFiles();
  const criteriaContent = readFile(criteriaFile);

  return `You are helping a software engineer write a compelling promotion packet. Using their career journal and the promotion criteria below, generate a structured promotion document they can submit or use as a draft.

## Output Requirements:
- Follow the structure defined in the "Promo Packet Instructions" section of the criteria document
- Ground every claim in specific, real examples from the career journal — no generic statements
- Use concrete metrics, project names, and outcomes wherever the journal provides them
- Write in third person (e.g., "Alex led..." or "The candidate delivered...")
- Be specific and evidence-based; avoid filler phrases like "demonstrated strong leadership" without backing it up
- Output ONLY the promotion document in clean markdown, no meta-commentary

## Promotion Criteria:
${criteriaContent}

## Career Journal:
The following are informal career journal notes, one file per job. Each file is written in a personal, free-flowing style — a mix of bullet points and paragraphs, organized by feature or project. They are not formal documents. Extract specific examples, projects, and metrics from them to build the promotion case.

${careerContent}

Now generate the promotion document. Output ONLY the markdown content, nothing else.`;
}

function executeProvider(command: string, prompt: string, outputFile: string): boolean {
  try {
    console.log(chalk.green('Generating promotion document...'));

    const promptFile = `/tmp/promo-prompt-${Date.now()}.txt`;
    writeFileSync(promptFile, prompt);

    try {
      const result = spawnSync('sh', ['-c', `cat "${promptFile}" | ${command}`], {
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      });

      if (result.error || result.status !== 0) {
        console.error(chalk.red('Error: Failed to generate promotion document'));
        if (result.stderr) console.error(result.stderr);
        return false;
      }

      writeFileSync(outputFile, result.stdout);
      console.log(chalk.green(`Promotion document saved to: ${outputFile}`));
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

function listAvailableCriteria(): void {
  console.log('Available promo criteria files:');
  try {
    const files = readdirSync('promo')
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace('.md', ''));
    files.forEach((name) => console.log(`  - ${name}`));
  } catch {
    console.error(chalk.yellow('Could not list promo/ directory'));
  }
}

function main() {
  const program = new Command();

  program
    .name('promo')
    .description('Generate a promotion document from your career journal and promo criteria')
    .version('1.0.0')
    .requiredOption('-c, --criteria <name>', 'Promo criteria file name (from promo/ directory, without .md)')
    .option('-o, --output <file>', 'Output file path (default: output/promo-TIMESTAMP.md)')
    .option('-p, --paste', 'Print prompt to terminal instead of calling AI provider', false)
    .option('--provider <provider>', 'AI provider to use (default: gemini)', 'gemini')
    .addHelpText(
      'after',
      `
Examples:
  $ bun run promo -- --criteria staff-engineer
  $ bun run promo -- -c staff-engineer --provider claude
  $ bun run promo -- -c staff-engineer --paste
    `
    );

  program.parse();

  const options = program.opts<{ criteria: string; output?: string; paste: boolean; provider: string }>();

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
    console.error(`This script requires ${provider.name} to generate the promotion document`);
    console.error('Or use --paste mode to generate the prompt for manual use');
    process.exit(1);
  }

  // Validate criteria file
  const criteriaFile = `promo/${options.criteria}.md`;
  if (!existsSync(criteriaFile)) {
    console.error(chalk.red(`Error: Promo criteria file not found: ${criteriaFile}`));
    listAvailableCriteria();
    process.exit(1);
  }

  // Set default output file
  if (!options.output) {
    const timestamp = generateTimestamp();
    options.output = `output/promo_${options.criteria}_${timestamp}.md`;
  }

  // Create output directory if needed
  const outputDir = dirname(options.output);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log(chalk.green('Building promotion document...'));
  console.log(`Criteria: ${criteriaFile}`);
  console.log(`Output: ${options.output}`);
  console.log(`Provider: ${options.provider}`);
  console.log('');

  const prompt = buildPrompt(criteriaFile);

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
