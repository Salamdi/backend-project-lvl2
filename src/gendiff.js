import _ from 'lodash';
import {
  REMOVED, ADDED, UPDATED, TYPE_KEY, NEW_KEY, OLD_KEY,
} from './constants.js';

const reduceProperty = (prop1, prop2) => {
  if (prop1 === prop2) return prop2;
  if (!_.isUndefined(prop1) && _.isUndefined(prop2)) {
    return {
      [TYPE_KEY]: REMOVED,
      [OLD_KEY]: prop1,
    };
  }
  if (_.isUndefined(prop1) && !_.isUndefined(prop2)) {
    return {
      [TYPE_KEY]: ADDED,
      [NEW_KEY]: prop2,
    };
  }
  if (prop1 !== prop2) {
    return {
      [TYPE_KEY]: UPDATED,
      [OLD_KEY]: prop1,
      [NEW_KEY]: prop2,
    };
  }
  return null;
};

const gendiff = (obj1, obj2, depth = 0) => {
  const keys = _.flow(
    _.concat,
    _.uniq,
    _.sortBy,
  )(_.keys(obj1), _.keys(obj2));
  return _.reduce(keys, (diff, key) => ({
    ...diff,
    [key]: (_.isObject(obj1[key]) && _.isObject(obj2[key]))
      ? gendiff(obj1[key], obj2[key], key + 1)
      : reduceProperty(obj1[key], obj2[key], depth),
  }), {});
};

export default gendiff;
