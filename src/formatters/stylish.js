import _ from 'lodash';

const indent = (depth, spacesCount = 4) => {
  switch (spacesCount) {
    case 4: return ' '.repeat(depth * spacesCount);
    case 2: return `${'  '.repeat(depth - 1)}${' '.repeat(depth * spacesCount)}`;
    default: throw new Error('Incorrect spaces count');
  }
};
const stringify = (value, replacer, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const fourSpaces = replacer.repeat(depth * 4);
  const arr = keys.map((item) => {
    const prop = value[item];
    if (_.isObject(prop)) {
      return `${indent(depth)}${item}: ${stringify(prop, replacer, depth + 1)}`;
    }
    return `${fourSpaces}${item}: ${prop}`;
  });

  return `{\n${arr.join('\n')}\n${'    '.repeat(depth - 1)}}`;
};
const stylish = (tree, depth = 1) => {
  const formatedData = tree.map((node) => {
    switch (node.type) {
      case 'nested': return `${indent(depth)}${node.name}: ${stylish(node.children, depth + 1)}`;
      case 'unchanged': return `${indent(depth)}${node.name}: ${node.property}`;
      case 'deleted': return `${indent(depth, 2)}- ${node.name}: ${stringify(node.property, ' ', depth + 1)}`;
      case 'added': return `${indent(depth, 2)}+ ${node.name}: ${stringify(node.property, ' ', depth + 1)}`;
      case 'changed': return `${indent(depth, 2)}- ${node.name}: ${stringify(node.firstProperty, ' ', depth + 1)}\n${indent(depth, 2)}+ ${node.name}: ${stringify(node.secondProperty, ' ', depth + 1)}`;
      default: throw new Error('Tree is incorrect');
    }
  });
  return `{\n${formatedData.join('\n')}\n${'    '.repeat(depth - 1)}}`;
};
export default stylish;
