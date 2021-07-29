import _ from 'lodash';

export default (obj1, obj2) => {
  const union = { ...obj1, ...obj2 };
  const result = Object
    .keys(union)
    .reduce((res, key) => {
      if (obj1[key] === obj2[key]) return `${res}   ${key}: ${union[key]}\n`;
      if (!_.isUndefined(obj1[key]) && obj2[key] === undefined) return `${res} - ${key}: ${union[key]}\n`;
      if (_.isUndefined(obj1[key]) && obj2[key] !== undefined) return `${res} + ${key}: ${union[key]}\n`;
      if (obj1[key] !== obj2[key]) {
        return `${res} - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}\n`;
      }
      return res;
    }, '\n');

  return `{${result}}`;
};
