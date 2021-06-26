import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const file2 = join(__dirname, '..', '__fixtures__', 'file2.json');

describe('flat json comparison', () => {
  const diff = gendiff(file1, file2);

  test('correctly compares unchanged field', () => {
    expect(diff).toContain('   host: hexlet.io');
  });

  test('correctly compares changed field', () => {
    expect(diff).toContain(' - timeout: 50');
    expect(diff).toContain(' + timeout: 20');
  });

  test('detects new field', () => {
    expect(diff).toContain(' + verbose: true');
  });

  test('detects removed field', () => {
    expect(diff).toContain(' - proxy: 123.234.53.22');
  });
});
