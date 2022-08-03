import _ from 'lodash';
import isObj from '../helpers/isObj.js';

const stringify = (value, replacer, deep) => {
  if (!isObj(value)) {
    return value;
  }
  const keys = _.keys(value);
  const arr = keys.map((item) => {
    const prop = value[item];
    if (isObj(prop)) {
      return `${replacer.repeat(deep)}${item}: ${stringify(prop, replacer, deep + 1)}`;
    }
    return `${replacer.repeat(deep)}${item}: ${prop}`;
  });

  return `{\n${arr.join('\n')}\n${'    '.repeat(deep - 1)}}`;
};
const stylish = (tree, deep) => {
  const progressionSpaces = '  '.repeat(deep - 1);
  const formatedData = tree.map((node) => {
    if (node.type === 'withChildrens') {
      return `${'    '.repeat(deep)}${node.name}: ${stylish(node.children, deep + 1)}`;
    }

    if (node.type === 'equalValue') {
      return `${'    '.repeat(deep)}${node.name}: ${node.property}`;
    }

    if (node.type === 'hasOnlyFirstProp') {
      return `${progressionSpaces}${'  '.repeat(deep)}- ${node.name}: ${stringify(node.property, '    ', deep + 1)}`;
    }
    if (node.type === 'hasOnlySecProp') {
      return `${progressionSpaces}${'  '.repeat(deep)}+ ${node.name}: ${stringify(node.property, '    ', deep + 1)}`;
    }

    return `${progressionSpaces}${'  '.repeat(deep)}- ${node.name}: ${stringify(node.firstProperty, '    ', deep + 1)}\n${progressionSpaces}${'  '.repeat(deep)}+ ${node.name}: ${stringify(node.secondProperty, '    ', deep + 1)}`;
  });

  return `{\n${formatedData.join('\n')}\n${'    '.repeat(deep - 1)}}`;
};
export default stylish;
