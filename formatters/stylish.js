import _ from 'lodash';
import isObj from '../helpers/isObj.js';


const stringify = (value, replacer, count) => {
  if (!isObj(value)) {
    return value;
  }
  const keys = _.keys(value);
  const arr = keys.map((item) => {
    const prop = value[item];
    if (isObj(prop)) {
      return `${replacer.repeat(count + 4)}${item}: ${stringify(prop, replacer, count + 4)}`;
    }
    return `${replacer.repeat(count + 4)}${item}: ${prop}`;
  });

  return `{\n${arr.join('\n')}\n${' '.repeat(count)}}`;
};
const stylish = (tree, deep) => {
  const formatedData = tree.map((node) => {
    let beginLine = ' '.repeat(deep + 4);
    if (node.type === 'hasOnlyFirstProp') {
      beginLine = `${' '.repeat(deep + 2)}- `;
    }
    if (node.type === 'hasOnlySecProp') {
      beginLine = `${' '.repeat(deep + 2)}+ `;
    }
    if (node.type === 'withChildrens') {
      return `${beginLine}${node.name}: ${stylish(node.children, deep + 4)}`;
    }
  
    if (node.type === 'equalValue') {
      return `${' '.repeat(deep + 4)}${node.name}: ${node.property}`;
    }

    if (node.type === 'hasOnlyFirstProp') {
      return `${' '.repeat(deep + 2)}- ${node.name}: ${stringify(node.property, ' ', deep + 4)}`;
    }
    if (node.type === 'hasOnlySecProp') {
      return `${' '.repeat(deep + 2)}+ ${node.name}: ${stringify(node.property, ' ', deep + 4)}`;
    }

    return `${' '.repeat(deep + 2)}- ${node.name}: ${stringify(node.firstProperty, ' ', deep + 4)}\n${' '.repeat(deep + 2)}+ ${node.name}: ${stringify(node.secondProperty, ' ', deep + 4)}`;
  });

  return `{\n${formatedData.join('\n')}\n${' '.repeat(deep)}}`;
};
export default stylish;
