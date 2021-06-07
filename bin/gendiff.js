#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const command = new Command();

command
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format', 'output format')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  });

command.parse();
