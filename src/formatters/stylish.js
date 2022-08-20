import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const obj = Object.entries(value);
  const result = obj.map((item) => {
    const [key, prop] = item;
    return `${indent(depth)}  ${key}: ${stringify(prop, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n${indent(depth - 1)}  }`;
};
const stylish = (tree) => {
  const iter = (tr, depth = 1) => {
    const formatedData = tr.map((node) => {
      switch (node.type) {
        case 'nested': return `${indent(depth)}  ${node.name}: {${iter(node.children, depth + 1)}${indent(depth)}  }`;
        case 'unchanged': return `${indent(depth)}  ${node.name}: ${node.property}`;
        case 'deleted': return `${indent(depth)}- ${node.name}: ${stringify(node.property, depth + 1)}`;
        case 'added': return `${indent(depth)}+ ${node.name}: ${stringify(node.property, depth + 1)}`;
        case 'changed': return `${indent(depth)}- ${node.name}: ${stringify(node.value1, depth + 1)}\n${indent(depth)}+ ${node.name}: ${stringify(node.value2, depth + 1)}`;
        default: throw new Error('Tree is incorrect');
      }
    });
    return `\n${formatedData.join('\n')}\n`;
  };
  return `{${iter(tree)}}`;
};
export default stylish;
