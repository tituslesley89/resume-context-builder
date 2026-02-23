#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import type { GenerateOptions } from './types.js';
import { getProvider, listProviders } from './providers.js';
import {
  checkFileExists,
  listAvailableResumeTypes,
  generateTimestamp,
} from './utils.js';
import { buildPrompt } from './prompt.js';

function main() {
  const program = new Command();

  program
    .name('generate-resume')
    .description('Career Context Builder - Resume Generation Tool')
    .version('1.0.0')
    .requiredOption('-t, --type <type>', 'Resume type (must match file in resume-types/)')
    .option('-j, --job <file>', 'Path to job description file')
    .option('-r, --reference <file>', 'Path to reference resume file')
    .option('-o, --output <file>', 'Output file path (default: output/resume-TIMESTAMP.md)')
    .option('-p, --paste', 'Print prompt to terminal instead of calling AI provider', false)
    .option('--provider <provider>', 'AI provider to use (default: gemini)', 'gemini')
    .option('-v --versions <number>', 'Number of versions of resume to generate')
    .addHelpText(
      'after',
      `
Examples:
  $ bun run generate -- --type software-engineer
  $ bun run generate -- -t software-engineer -j job-descriptions/senior-dev.md
  $ bun run generate -- -t tech-lead -j job-descriptions/lead.md -r reference-resumes/example.md
  $ bun run generate -- -t software-engineer --provider gemini
  $ bun run generate -- -t software-engineer --versions 3
    `
    );

  program.parse();

  const options = program.opts<GenerateOptions>();

  // Validate provider
  const provider = getProvider(options.provider);
  if (!provider) {
    console.error(chalk.red(`Error: Unknown provider '${options.provider}'`));
    console.error('Available providers:', listProviders().join(', '));
    process.exit(1);
  }

  // Check provider availability (only if not in paste mode)
  if (!options.paste && !provider.checkAvailable()) {
    console.error(chalk.yellow(`Warning: ${provider.name} not found in PATH`));
    console.error(`This script requires ${provider.name} to generate resumes`);
    console.error("Please install it or ensure it's in your PATH");
    console.error('Or use --paste mode to generate the prompt for manual use');
    process.exit(1);
  }

  // Validate resume type file
  const resumeTypeFile = `resume-types/${options.type}.md`;
  if (!existsSync(resumeTypeFile)) {
    console.error(chalk.red(`Error: Resume type file not found: ${resumeTypeFile}`));
    listAvailableResumeTypes();
    process.exit(1);
  }

  // Validate optional files
  if (options.job) {
    checkFileExists(options.job, 'Job description');
  }

  if (options.reference) {
    checkFileExists(options.reference, 'Reference resume');
  }

  // Set default output file
  if (!options.output) {
    const timestamp = generateTimestamp();
    options.output = `output/resume_${options.type}_${timestamp}`;
  }

  // Create output directory
  const outputDir = dirname(options.output);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  let versions = 1;
  if (options.versions && options.versions > 1) {
    versions = options.versions
  }

  // Display configuration
  console.log(chalk.green('Generating resume...'));
  console.log(`Resume Type: ${options.type}`);
  if (options.job) console.log(`Job Description: ${options.job}`);
  if (options.reference) console.log(`Reference Resume: ${options.reference}`);
  console.log(`Output File(s): ${options.output}_v(x).md`);
  console.log(`Provider: ${options.provider}`);
  console.log(`# of Versions: ${versions}`);
  console.log('');

  // Build prompt
  const prompt = buildPrompt(options, resumeTypeFile);

  // Execute based on mode
  if (options.paste) {
    // Paste mode: Display prompt for manual use
    console.log(
      chalk.yellow(
        `Note: Paste mode enabled - displaying prompt for manual use with ${provider.name}`
      )
    );
    console.log('');
    console.log(prompt);
    console.log('');
    console.log(chalk.green(`Save the generated resume to: ${options.output}.md`));
  } else {
    // Direct mode: Call provider
    for (let i = 1; i <= versions; i++) {
      console.log(`Generate version ${i} of ${versions}`);
      console.log('');
      const success = provider.execute(prompt, `${options.output}_v${i}.md`);

      if (!success) {
        process.exit(1);
      }
    }
    console.log('');
    console.log(chalk.green('Resume generation completed!'));
  }
}

main();
