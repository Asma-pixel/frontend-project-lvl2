import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';
import * as yaml from 'js-yaml';

export default (filepath) => {
  const normalizedPath = path.resolve(cwd(), `${filepath}`);


  const data = fs.readFileSync(normalizedPath, 'utf8');
  const arr = filepath.split('.');
  const format = arr[arr.length -1];

  if(format === 'json') {
    return JSON.parse(data);
  }
  if(format === 'yaml' || format === 'yml') {
    return  yaml.load(data);
  }
  throw new Error('Program can\'t parse this format');
}