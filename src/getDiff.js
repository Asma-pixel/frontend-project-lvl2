import _ from 'lodash';

import parsers from '../parsers/parsers.js';

export default (filepath1, filepath2) => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);

  const propertyArr = _.sortBy(_.uniq([...keys1, ...keys2]));

  const resultArray = propertyArr.map((item) => {
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

  const resultString = `{\n${resultArray.join('\n')} \n}`;
  return resultString;
};
