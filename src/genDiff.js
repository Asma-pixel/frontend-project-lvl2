import * as path from 'path';
import { cwd } from 'process';
import * as fs from 'fs';
import getCurrentFormatter from './formatters/index.js';
import parsers from './parsers/parsers.js';
import buildTree from './buildTree.js';

const getData = (filepath) => {
  const normalizedPath = path.resolve(cwd(), filepath);
  return fs.readFileSync(normalizedPath, 'utf8');
};
const getFormat = (filepath) => path.extname(filepath).slice(1);
export default (filepath1, filepath2, formatter = 'stylish') => {
  const [firstDataForParse, firstFormat] = [getData(filepath1), getFormat(filepath1)];
  const [secondDataForParse, secondFormat] = [getData(filepath2), getFormat(filepath2)];
  const firstObj = parsers(firstDataForParse, firstFormat);
  const secondObj = parsers(secondDataForParse, secondFormat);

  return getCurrentFormatter(buildTree(firstObj, secondObj), formatter);
};
