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
      case 'withChildrens': return plain(node.children, currentPath);
      case 'equalValue': return `Property '${currentPath.join('.')}' was added with value: ${getValue(node.property)}`;
      case 'hasOnlyFirstProp': return `Property '${currentPath.join('.')}' was removed`;
      case 'hasOnlySecProp': return `Property '${currentPath.join('.')}' was added with value: ${getValue(node.property)}`;
      default: return `Property '${currentPath.join('.')}' was updated. From ${getValue(node.firstProperty)} to ${getValue(node.secondProperty)}`;
    }
  });
  return formatedData.join('\n');
};
export default plain;
