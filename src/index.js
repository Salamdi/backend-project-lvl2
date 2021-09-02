import { extname } from 'path';
import makeParser from './parser.js';
import gendiff from './gendiff.js';
import makeFormatter, { STYLISH } from './formats/index.js';
import readFile from './readFile.js';

export default (filepath1, filepath2, format = STYLISH) => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const extension = extname(filepath1);
  const type = extension.slice(1);

  const parse = makeParser(type);
  const obj1 = parse(fileContent1);
  const obj2 = parse(fileContent2);
  const diff = gendiff(obj1, obj2);
  const formatOutput = makeFormatter(format);

  return formatOutput(diff);
};
