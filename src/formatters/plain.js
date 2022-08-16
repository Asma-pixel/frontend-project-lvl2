import _ from 'lodash';

const getValue = (property) => {
  if (_.isObject(property)) return '[complex value]';
  if (typeof property === 'string') return `'${property}'`;
  return property;
};
const plain = (tree, path = []) => {
  const formatedData = tree.map((node) => {
    const currentPath = [path, node.name].flat();
    switch (node.type) {
      case 'nested': return plain(node.children, currentPath);
      case 'unchanged': return '';
      case 'deleted': return `Property '${currentPath.join('.')}' was removed`;
      case 'added': return `Property '${currentPath.join('.')}' was added with value: ${getValue(node.property)}`;
      case 'changed': return `Property '${currentPath.join('.')}' was updated. From ${getValue(node.value1)} to ${getValue(node.value2)}`;
      default: throw new Error('Tree is incorrect');
    }
  });
  return formatedData.filter((n) => n).join('\n');
};
export default plain;
