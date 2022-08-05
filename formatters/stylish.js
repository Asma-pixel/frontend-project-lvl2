import _ from 'lodash';

const stringify = (value, replacer, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const fourSpaces = replacer.repeat(depth * 4);
  const arr = keys.map((item) => {
    const prop = value[item];
    if (_.isObject(prop)) {
      return `${fourSpaces}${item}: ${stringify(prop, replacer, depth + 1)}`;
    }
    return `${fourSpaces}${item}: ${prop}`;
  });

  return `{\n${arr.join('\n')}\n${'    '.repeat(depth - 1)}}`;
};
const stylish = (tree, depth = 1) => {
  const fourSpaces = ' '.repeat(4 * depth);
  const twoSpaces = ' '.repeat(2 * depth);
  const progressionSpaces = '  '.repeat(depth - 1);
  const formatedData = tree.map((node) => {
    switch (node.type) {
      case 'withChildrens': return `${fourSpaces}${node.name}: ${stylish(node.children, depth + 1)}`;
      case 'equalValue': return `${fourSpaces}${node.name}: ${node.property}`;
      case 'hasOnlyFirstProp': return `${progressionSpaces}${twoSpaces}- ${node.name}: ${stringify(node.property, ' ', depth + 1)}`;
      case 'hasOnlySecProp': return `${progressionSpaces}${twoSpaces}+ ${node.name}: ${stringify(node.property, ' ', depth + 1)}`;
      default: return `${progressionSpaces}${twoSpaces}- ${node.name}: ${stringify(node.firstProperty, ' ', depth + 1)}\n${progressionSpaces}${twoSpaces}+ ${node.name}: ${stringify(node.secondProperty, '    ', depth + 1)}`;
    }
  });
  return `{\n${formatedData.join('\n')}\n${'    '.repeat(depth - 1)}}`;
};
export default stylish;
