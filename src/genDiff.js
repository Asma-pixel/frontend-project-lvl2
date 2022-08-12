import * as path from 'path';
import { cwd } from 'process';
import * as fs from 'fs';
import getCurrentFormatter from './formatters/index.js';
import parsers from './parsers/parsers.js';
import buildTree from './buildTree.js';

const getDataAndFormat = (filepath) => {
  const normalizedPath = path.resolve(cwd(), `${filepath}`);
  const dataForParse = fs.readFileSync(normalizedPath, 'utf8');
  const arr = filepath.split('.');
  const format = arr[arr.length - 1];
  return [dataForParse, format];
};
export default (filepath1, filepath2, formatter = 'stylish') => {
  const [firstDataForParse, firstFormat] = getDataAndFormat(filepath1);
  const [secondDataForParse, secondFormat] = getDataAndFormat(filepath2);
  const firstObj = parsers(firstDataForParse, firstFormat);
  const secondObj = parsers(secondDataForParse, secondFormat);

  return getCurrentFormatter(buildTree(firstObj, secondObj), formatter);
};
