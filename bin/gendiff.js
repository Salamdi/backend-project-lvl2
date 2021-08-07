#!/usr/bin/env node

import { Command } from 'commander';
import { STYLISH } from '../src/formats/index.js';
import genDiff from '../src/index.js';

const command = new Command();

command
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format', 'output format', STYLISH)
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format ?? STYLISH);
    console.log(diff);
  });

command.parse();
