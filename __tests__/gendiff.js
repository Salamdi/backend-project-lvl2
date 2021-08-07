import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../src/gendiff';
import stylish from '../src/formats/stylish';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const file2 = join(__dirname, '..', '__fixtures__', 'file2.json');
const stylishFormatPath = join(__dirname, '..', '__fixtures__', 'stylish.txt');
const expectedDiffPath = join(__dirname, '..', '__fixtures__', 'difference.json');

describe('nested objects comparison', () => {
  const expectedDiff = JSON.parse(readFileSync(expectedDiffPath));
  const json1 = JSON.parse(readFileSync(file1));
  const json2 = JSON.parse(readFileSync(file2));
  const diff = gendiff(json1, json2);
  const stylishFormat = readFileSync(stylishFormatPath, 'utf-8');

  test('correctly calculates difference of nested objects', () => {
    expect(diff).toEqual(expectedDiff);
  });

  test('stylish format works correctly', () => {
    expect(stylish(diff)).toBe(stylishFormat);
  })
});
