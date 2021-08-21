import _ from 'lodash';
import {
  REMOVED, ADDED, UPDATED, TYPE_KEY, NEW_KEY, OLD_KEY,
} from './constants.js';

function toJSON() {
  return {
    type: this[TYPE_KEY],
    removed: this[OLD_KEY],
    added: this[NEW_KEY],
  };
}

const gendiff = (obj1, obj2, depth = 0) => {
  const keys = _.flow(
    _.concat,
    _.uniq,
    _.sortBy,
  )(_.keys(obj1), _.keys(obj2));
  return _.reduce(keys, (diff, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { ...diff, [key]: gendiff(obj1[key], obj2[key], depth + 1) };
    }
    if (obj1[key] === obj2[key]) {
      return { ...diff, [key]: obj2[key] };
    }
    if (!_.isUndefined(obj1[key]) && _.isUndefined(obj2[key])) {
      return {
        ...diff,
        [key]: {
          [TYPE_KEY]: REMOVED,
          [OLD_KEY]: obj1[key],
          toJSON,
        },
      };
    }
    if (_.isUndefined(obj1[key]) && !_.isUndefined(obj2[key])) {
      return {
        ...diff,
        [key]: {
          [TYPE_KEY]: ADDED,
          [NEW_KEY]: obj2[key],
          toJSON,
        },
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        ...diff,
        [key]: {
          [TYPE_KEY]: UPDATED,
          [OLD_KEY]: obj1[key],
          [NEW_KEY]: obj2[key],
          toJSON,
        },
      };
    }
    return diff;
  }, {});
};

export default gendiff;
