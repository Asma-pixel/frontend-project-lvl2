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
        type: 'withChildrens',
        children: buildTree(firstProperty, secondProperty),
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
export default buildTree;
