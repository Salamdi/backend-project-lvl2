import { readFileSync } from 'fs';
import { resolve } from 'path';

export default (filepath) => readFileSync(
  resolve(process.cwd(), filepath),
  'utf8',
);
