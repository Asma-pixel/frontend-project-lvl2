import { test, expect } from '@jest/globals';
import getDiff from '../index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getDiff_True', () => {
  const testStr1 = getDiff('./files/file1.json', './files/file2.json');
  const testStr2 = getDiff('../frontend-project-lvl2/files/file1.json', './files/file2.json')

  expect(testStr1).toBe(readFile('testJson.txt'));
  expect(testStr2).toBe(readFile('testJson.txt'));
});


test('getDiff_False', () => {
  const testStr1 = getDiff('./files/file1.json', './files/file1.json');
  const testStr2 = getDiff('../frontend-project-lvl2/files/file1.json', './files/file1.json')

  expect(testStr1).not.toBe(readFile('testJson.txt'));
  expect(testStr2).not.toBe(readFile('testJson.txt'));
});
