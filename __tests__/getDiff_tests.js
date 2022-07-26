import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import getDiff from '../index.js';
import parsers from '../parsers/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getDiff_True', () => {
  const testStr1 = getDiff('./files/file1.json', './files/file2.json');
  const testStr2 = getDiff('../frontend-project-lvl2/files/file1.json', './files/file2.json');
  const testStr3 = getDiff('./files/file1.yaml', './files/file2.json');

  expect(testStr1).toBe(readFile('testJson.txt'));
  expect(testStr2).toBe(readFile('testJson.txt'));
  expect(testStr3).toBe(readFile('testJson.txt'));
});

test('getDiff_False', () => {
  const testStr1 = getDiff('./files/file1.json', './files/file1.json');
  const testStr2 = getDiff('../frontend-project-lvl2/files/file1.json', './files/file1.json');

  expect(testStr1).not.toBe(readFile('testJson.txt'));
  expect(testStr2).not.toBe(readFile('testJson.txt'));
});

const expectObj = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
test('Parsers error', () => {
  expect(() => {
    parsers('./files/file1.file');
  }).toThrow('Program can\'t parse this format');
});
test('Parsers work', () => {
  const received1 = parsers('./files/file1.json');
  const received2 = parsers('./files/file1.yaml');
  expect(received1).toEqual(expectObj);
  expect(received2).toEqual(expectObj);
});
