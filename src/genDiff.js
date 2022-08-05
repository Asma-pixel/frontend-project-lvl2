import _ from 'lodash';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';
import { isObjectHasProperty, isTwoObjectsHasProperty } from '../helpers/objHasProps.js';
import parsers from '../parsers/parsers.js';

const getCurrentFormatter = (formatter) => {
  switch (formatter) {
    case 'stylish': return stylish;
    case 'plain': return plain;
    case 'json': return json;
    default: return () => 'We don\'t have this type of formatter';
  }
};
export default (filepath1, filepath2, formatter = 'stylish') => {
  const firstObj = parsers(filepath1);
  const secondObj = parsers(filepath2);

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
      if (isTwoObjectsHasProperty(firstData, secondData, propName)) {
        return {
          name: propName,
          firstProperty,
          secondProperty,
          type: 'diffValue',
        };
      }
      if (isObjectHasProperty(firstData, propName)) {
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
