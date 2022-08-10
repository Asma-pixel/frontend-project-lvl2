import * as yaml from 'js-yaml';

export default (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(data);
  }
  throw new Error('Program can\'t parse this format');
};
