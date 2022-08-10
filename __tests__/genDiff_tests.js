import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const stylishFormat = readFile('expectStringStylish.txt');
const plainFormat = readFile('expectStringPlain.txt');
const jsonFormat = readFile('expectStringJson.txt');
test('genDiff_Stylish', () => {
  const testStr1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
  const testStr2 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'), 'stylish');

  expect(testStr1).toBe(stylishFormat);
  expect(testStr2).toBe(stylishFormat);
});

test('genDiff_Plain', () => {
  const testStr1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
  expect(testStr1).toBe(plainFormat);
});

test('genDiff_JSON', () => {
  const testStr1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json');
  expect(testStr1).toBe(jsonFormat);
});
