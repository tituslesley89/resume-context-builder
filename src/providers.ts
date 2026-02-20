import { execSync, spawnSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import chalk from 'chalk';
import type { ProviderConfig } from './types.js';

function executeCommand(command: string, prompt: string, outputFile: string): boolean {
  try {
    console.log(chalk.green('Calling AI provider to generate resume...'));

    // Create a temporary prompt file
    const promptFile = `/tmp/resume-prompt-${Date.now()}.txt`;
    writeFileSync(promptFile, prompt);

    try {
      // Execute the provider command
      const result = spawnSync('sh', ['-c', `cat "${promptFile}" | ${command}`], {
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      });

      if (result.error || result.status !== 0) {
        console.error(chalk.red('Error: Failed to generate resume'));
        if (result.stderr) {
          console.error(result.stderr);
        }
        return false;
      }

      // Write output to file
      writeFileSync(outputFile, result.stdout);
      console.log(chalk.green(`Resume generated successfully: ${outputFile}`));
      return true;
    } finally {
      // Cleanup temp file
      unlinkSync(promptFile);
    }
  } catch (error) {
    console.error(chalk.red('Error: Failed to execute provider'));
    console.error(error);
    return false;
  }
}

export const PROVIDERS: Record<string, ProviderConfig> = {
  gemini: {
    name: 'Gemini CLI',
    command: 'gemini',
    checkAvailable: () => {
      try {
        execSync('which gemini', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    },
    execute: (prompt: string, outputFile: string) =>
      executeCommand('gemini', prompt, outputFile),
  },
  claude: {
    name: 'Claude Code CLI',
    command: 'claude',
    checkAvailable: () => {
      try {
        execSync('which claude', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    },
    execute: (prompt: string, outputFile: string) =>
      executeCommand('claude', prompt, outputFile),
  },
};

export function getProvider(name: string): ProviderConfig | undefined {
  return PROVIDERS[name];
}

export function listProviders(): string[] {
  return Object.keys(PROVIDERS);
}
