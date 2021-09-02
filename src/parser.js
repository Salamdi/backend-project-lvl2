import yaml from 'js-yaml';

export default (type) => {
  switch (type) {
    case 'json':
      return JSON.parse;
    case 'yaml':
    case 'yml':
      return yaml.load;
    default:
      throw new Error('Unsupported format');
  }
};
