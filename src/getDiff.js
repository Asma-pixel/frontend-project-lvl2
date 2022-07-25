import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';

export default (filepath1, filepath2) => {
  const path1 = path.resolve(cwd(), `${filepath1}`);
  const path2 = path.resolve(cwd(), `${filepath2}`);

  const json1 = fs.readFileSync(path1, 'utf8');
  const json2 = fs.readFileSync(path2, 'utf8');

  const file1 = JSON.parse(json1);
  const file2 = JSON.parse(json2);


  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);

  const propertyArr = _.sortBy(_.uniq([...keys1, ...keys2]));

  const newString = propertyArr.map((item) => {
    if (file1[`${item}`] === file2[`${item}`]) {
      return `    ${item}: ${file1[`${item}`]}`;
    }

    if (Object.prototype.hasOwnProperty.call(file1, item)
    && Object.prototype.hasOwnProperty.call(file2, item)
    ) {
      return `  - ${item}: ${file1[`${item}`]}\n  + ${item}: ${file2[`${item}`]}`;
    }

    if (Object.prototype.hasOwnProperty.call(file1, item)) {
      return `  - ${item}: ${file1[`${item}`]}`;
    }
    return `  + ${item}: ${file2[`${item}`]}`;
  });

  const newStr = `{\n${newString.join('\n')} \n}`;
  return newStr;
};
