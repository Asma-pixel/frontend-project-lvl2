import _ from 'lodash';
import * as path from 'path';
import { cwd } from 'process';
import * as fs from 'fs';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import parsers from './parsers/parsers.js';

const getCurrentFormatter = (formatter) => {
  switch (formatter) {
    case 'stylish': return stylish;
    case 'plain': return plain;
    case 'json': return json;
    default: return () => 'We don\'t have this type of formatter';
  }
};
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

  const iter = (firstData, secondData) => {
    const keys1 = _.keys(firstData);
    const keys2 = _.keys(secondData);
    const propertyArr = _.sortBy(_.uniq([...keys1, ...keys2]));
    const resultArray = propertyArr.map((propName) => {
      const firstProperty = firstData[`${propName}`];
      const secondProperty = secondData[`${propName}`];
      if (_.isObject(firstProperty) && _.isObject(secondProperty)) {
        return {
          name: propName,
          type: 'withChildrens',
          children: iter(firstProperty, secondProperty),
        };
      }
      if (firstProperty === secondProperty) {
        return {
          name: propName,
          property: firstProperty,
          type: 'equalValue',

        };
      }
      if (_.has(firstData, propName) && _.has(secondData, propName)) {
        return {
          name: propName,
          firstProperty,
          secondProperty,
          type: 'diffValue',
        };
      }
      if (_.has(firstData, propName)) {
        return {
          name: propName,
          property: firstProperty,
          type: 'hasOnlyFirstProp',
        };
      }
      return {
        name: propName,
        property: secondProperty,
        type: 'hasOnlySecProp',
      };
    });
    return resultArray;
  };

  const currentFormatter = getCurrentFormatter(formatter);
  return currentFormatter(iter(firstObj, secondObj));
};
