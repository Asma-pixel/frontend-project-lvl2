import _ from 'lodash';

const buildTree = (firstData, secondData) => {
  const keys1 = _.keys(firstData);
  const keys2 = _.keys(secondData);
  const propertyArr = _.sortBy(_.uniq([...keys1, ...keys2]));
  const resultArray = propertyArr.map((propName) => {
    const firstProperty = firstData[`${propName}`];
    const secondProperty = secondData[`${propName}`];
    if (_.isObject(firstProperty) && _.isObject(secondProperty)) {
      return {
        name: propName,
        type: 'nested',
        children: buildTree(firstProperty, secondProperty),
      };
    }
    if (firstProperty === secondProperty) {
      return {
        name: propName,
        property: firstProperty,
        type: 'unchanged',

      };
    }
    if (_.has(firstData, propName) && _.has(secondData, propName)) {
      return {
        name: propName,
        firstProperty,
        secondProperty,
        type: 'changed',
      };
    }
    if (_.has(firstData, propName)) {
      return {
        name: propName,
        property: firstProperty,
        type: 'deleted',
      };
    }
    return {
      name: propName,
      property: secondProperty,
      type: 'added',
    };
  });
  return resultArray;
};
export default buildTree;
