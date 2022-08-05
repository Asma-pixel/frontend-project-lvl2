import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import getDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getDiff_Stylish_True', () => {
  const testStr1 = getDiff('./__fixtures__/file3.json', './__fixtures__/file4.json');
  const testStr2 = getDiff('../frontend-project-lvl2/__fixtures__/file3.json', './__fixtures__/file4.json');
  const testStr3 = getDiff('./__fixtures__/file3.yml', './__fixtures__/file4.json');

  expect(testStr1).toBe(readFile('expectStringStylish.txt'));
  expect(testStr2).toBe(readFile('expectStringStylish.txt'));
  expect(testStr3).toBe(readFile('expectStringStylish.txt'));
});

test('getDiff_Stylish_False', () => {
  const testStr1 = getDiff('./__fixtures__/file3.json', './__fixtures__/file2.json');
  const testStr2 = getDiff('../frontend-project-lvl2/__fixtures__/file4.json', './__fixtures__/file1.json');

  expect(testStr1).not.toBe(readFile('expectStringStylish.txt'));
  expect(testStr2).not.toBe(readFile('expectStringStylish.txt'));
});

test('getDiff_Plain_True', () => {
  const testStr1 = getDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain');
  const testStr2 = getDiff('../frontend-project-lvl2/__fixtures__/file3.json', './__fixtures__/file4.json', 'plain');
  const testStr3 = getDiff('./__fixtures__/file3.yml', './__fixtures__/file4.json', 'plain');

  expect(testStr1).toBe(readFile('expectStringPlain.txt'));
  expect(testStr2).toBe(readFile('expectStringPlain.txt'));
  expect(testStr3).toBe(readFile('expectStringPlain.txt'));
});

test('getDiff_Plain_False', () => {
  const testStr1 = getDiff('./__fixtures__/file3.json', './__fixtures__/file2.json', 'plain');
  const testStr2 = getDiff('../frontend-project-lvl2/__fixtures__/file4.json', './__fixtures__/file1.json', 'stylish');

  expect(testStr1).not.toBe(readFile('expectStringPlain.txt'));
  expect(testStr2).not.toBe(readFile('expectStringPlain.txt'));
});
