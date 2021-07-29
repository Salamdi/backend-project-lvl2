import yaml from 'js-yaml';

export default (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yaml':
    case '.yml':
      return yaml.load;
    default:
      throw new Error('Unsupported format');
  }
};
