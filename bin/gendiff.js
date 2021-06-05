#!/usr/bin/env node

import { Command } from 'commander';

const gendiff = new Command();

gendiff.description('Compares two configuration files and shows a difference.');
gendiff.version('1.0.0');
gendiff.parse(process.argv);

export default (filepath1, filepath2) => `${filepath1} & ${filepath2} diff`;
