import _ from 'lodash';

const gendiff = (obj1, obj2, depth = 0) => {
  const union = { ...obj1, ...obj2 };
  return _.reduce(union, (diff, value, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { ...diff, [key]: gendiff(obj1[key], obj2[key], depth + 1) };
    }
    if (obj1[key] === obj2[key]) {
      return { ...diff, [key]: value };
    }
    if (!_.isUndefined(obj1[key]) && _.isUndefined(obj2[key])) {
      return { ...diff, [`- ${key}`]: obj1[key] };
    }
    if (_.isUndefined(obj1[key]) && !_.isUndefined(obj2[key])) {
      return { ...diff, [`+ ${key}`]: obj2[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        ...diff,
        [`- ${key}`]: obj1[key],
        [`+ ${key}`]: obj2[key],
      };
    }
    return diff;
  }, {});
};

export default gendiff;
