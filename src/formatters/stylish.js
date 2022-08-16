import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const stringify = (value, replacer, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const obj = Object.entries(value);
  const result = obj.map((item) => {
    const [key, prop] = item;
    return `${indent(depth)}  ${key}: ${stringify(prop, replacer, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n${'    '.repeat(depth - 1)}}`;
};
const stylish = (tree, depth = 1) => {
  const formatedData = tree.map((node) => {
    switch (node.type) {
      case 'nested': return `${indent(depth)}  ${node.name}: ${stylish(node.children, depth + 1)}`;
      case 'unchanged': return `${indent(depth)}  ${node.name}: ${node.property}`;
      case 'deleted': return `${indent(depth)}- ${node.name}: ${stringify(node.property, ' ', depth + 1)}`;
      case 'added': return `${indent(depth)}+ ${node.name}: ${stringify(node.property, ' ', depth + 1)}`;
      case 'changed': return `${indent(depth)}- ${node.name}: ${stringify(node.value1, ' ', depth + 1)}\n${indent(depth)}+ ${node.name}: ${stringify(node.value2, ' ', depth + 1)}`;
      default: throw new Error('Tree is incorrect');
    }
  });
  return `{\n${formatedData.join('\n')}\n${'    '.repeat(depth - 1)}}`;
};
export default stylish;
