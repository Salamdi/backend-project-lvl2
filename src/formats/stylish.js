import _ from 'lodash';
import {
  TYPE_KEY, OLD_KEY, NEW_KEY,
} from '../constants.js';

const internalToJson = (internalDiff) => _.reduce(internalDiff, (json, value, key) => {
  if (!_.isObject(value)) {
    return { ...json, [key]: value };
  }
  if (!value[TYPE_KEY]) {
    return { ...json, [key]: internalToJson(value) };
  }
  return {
    ...json,
    [`- ${key}`]: value[OLD_KEY],
    [`+ ${key}`]: value[NEW_KEY],
  };
}, {});

const formatStylish = (internalDiff) => JSON.stringify(internalToJson(internalDiff), null, 4)
  .replace(/[,"]/g, '')
  .split('\n')
  .map((line) => (/[+-]\s/.test(line) ? line.substring(2) : line))
  .join('\n');

export default formatStylish;
