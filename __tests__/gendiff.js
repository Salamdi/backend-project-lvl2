import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/gendiff';
import stylish from '../src/formats/stylish';
import plain from '../src/formats/plain';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const file2 = join(__dirname, '..', '__fixtures__', 'file2.json');
const stylishFormatPath = join(__dirname, '..', '__fixtures__', 'stylish.out');
const plainFormatPath = join(__dirname, '..', '__fixtures__', 'plain.out');

describe('nested objects comparison', () => {
  const json1 = JSON.parse(readFileSync(file1));
  const json2 = JSON.parse(readFileSync(file2));
  const diff = gendiff(json1, json2);
  const stylishFormat = readFileSync(stylishFormatPath, 'utf-8').trim();
  const plainFormat = readFileSync(plainFormatPath, 'utf-8').trim();

  test('stylish format works correctly', () => {
    expect(stylish(diff)).toBe(stylishFormat);
  });

  test('plain format works correctly', () => {
    expect(plain(diff)).toBe(plainFormat);
  });
});
