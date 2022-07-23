import { Command } from 'commander/esm.mjs';
import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'node:process';

const actionFunc = (filepath1, filepath2) => {
  const path1 = path.resolve(cwd(),  `${filepath1}`);
  const path2 = path.resolve(cwd(),  `${filepath2}`);
  
  const json1 = fs.readFileSync(path1, 'utf8');
  const json2 = fs.readFileSync(path2, 'utf8');

  const file1 = JSON.parse(json1);
  const file2 = JSON.parse(json2);

  const keys1 = _.keys(file1).sort();
  const keys2 = _.keys(file2).sort();
  const sortedFile1 = _.pick(file1, keys1);
  const sortedFile2 = _.pick(file2, keys2);

  const propertyArr = _.uniq([...keys1, ...keys2]);

  const newString = propertyArr.map((item) => {
    let resultStr = '';
    if (sortedFile1.hasOwnProperty(item) && sortedFile2.hasOwnProperty(item)) {
      if (sortedFile1[`${item}`] === sortedFile2[`${item}`]) {
        resultStr = `  ${item}: ${sortedFile1[`${item}`]}`;
      }
      else {
        resultStr = `- ${item}: ${sortedFile1[`${item}`]}\n+ ${item}: ${sortedFile2[`${item}`]}`;
      }
    }
    else if(sortedFile1.hasOwnProperty(item)) {
      resultStr = `- ${item}: ${sortedFile1[`${item}`]}`;
    }
    else {
      resultStr = `+ ${item}: ${sortedFile2[`${item}`]}`;
    }
    return resultStr;
  });
  console.log(newString.join('\n'));
};

const genDiff = () => {
  const program = new Command();
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format<type>', 'output format')
    .action(actionFunc)
   
  program.parse(process.argv);
};
export default genDiff;
