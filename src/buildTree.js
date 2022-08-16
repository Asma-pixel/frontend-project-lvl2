import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const generalKeys = _.sortBy(_.uniq([...keys1, ...keys2]));
  return generalKeys.map((key) => {
    const value1 = data1[`${key}`];
    const value2 = data2[`${key}`];
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(value1, value2),
      };
    }
    if (value1 === value2) {
      return {
        name: key,
        property: value1,
        type: 'unchanged',

      };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      return {
        name: key,
        value1,
        value2,
        type: 'changed',
      };
    }
    if (_.has(data1, key)) {
      return {
        name: key,
        property: value1,
        type: 'deleted',
      };
    }
    return {
      name: key,
      property: value2,
      type: 'added',
    };
  });
};
export default buildTree;
