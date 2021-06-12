import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { describe, expect, test } from '@jest/globals';
import gendiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const file2 = join(__dirname, '..', '__fixtures__', 'file2.json');

describe('flat json comparison', () => {
    test('correctly compares unchanged field', () => {
        const diff = gendiff(file1, file2);
        expect(diff).toContain('   host: hexlet.io');
    });
});