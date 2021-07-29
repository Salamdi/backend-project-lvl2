import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import makeParser from './parser.js';
import gendiff from './gendiff.js';

export default (filepath1, filepath2) => {
  const fileContent1 = readFileSync(
    resolve(process.cwd(), filepath1),
    'utf8',
  );
  const fileContent2 = readFileSync(
    resolve(process.cwd(), filepath2),
    'utf8',
  );

  const extension = extname(filepath1);

  const parse = makeParser(extension);
  const obj1 = parse(fileContent1);
  const obj2 = parse(fileContent2);

  return gendiff(obj1, obj2);
};
