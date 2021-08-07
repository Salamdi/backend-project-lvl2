import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../src/index';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const file2 = join(__dirname, '..', '__fixtures__', 'file2.json');
const expectedDiffPath = join(__dirname, '..', '__fixtures__', 'difference.json');

describe('nested objects comparison', () => {
  const expectedDiff = JSON.parse(readFileSync(expectedDiffPath));
  const diff = gendiff(file1, file2);

  test('correctly calculates difference of nested objects', () => {
    expect(diff).toEqual(expectedDiff);
  });
});
