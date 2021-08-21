import _ from 'lodash';
import {
  TYPE_KEY, OLD_KEY, NEW_KEY,
} from '../constants.js';

const internalToJson = (obj) => _.reduce(obj, (json, value, key) => {
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

const formatStylish = (obj) => JSON.stringify(internalToJson(obj), null, 4)
  .replaceAll(',', '')
  .replaceAll('"', '')
  .replaceAll('    + ', '  + ')
  .replaceAll('    - ', '  - ');

export default formatStylish;
