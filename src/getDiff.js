import _ from 'lodash';
import stylish from '../formatters/stylish.js';
import isObj from '../helpers/isObj.js';
import { isObjectHasProperty, isTwoObjectsHasProperty } from '../helpers/objHasProps.js';
import parsers from '../parsers/parsers.js';

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
      if (isObj(firstProperty) && isObj(secondProperty)) {
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

  const currentFormatter = formatter === 'stylish' ? stylish : () => 'We have had no formatter yet';
  return currentFormatter(iter(firstObj, secondObj), 1);
};
