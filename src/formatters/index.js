import json from './json.js';
import stylish from './stylish.js';
import plain from './plain.js';

export default (tree, formatter) => {
  switch (formatter) {
    case 'stylish': return stylish(tree);
    case 'plain': return plain(tree);
    case 'json': return json(tree);
    default: throw new Error('We don\'t have this type of formatter');
  }
};
