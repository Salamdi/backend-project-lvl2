import _ from 'lodash';
import {
  ADDED, NEW_KEY, OLD_KEY, REMOVED, TYPE_KEY, UPDATED,
} from '../constants.js';

const internalToPlain = (internalDiff, prefix = '') => _.flatMap(internalDiff, (value, key) => {
  if (!_.isObject(value)) {
    return '';
  }

  const path = prefix ? `${prefix}.${key}` : key;

  if (!value[TYPE_KEY]) {
    return internalToPlain(value, path);
  }

  const quotedAddedPropertyIfString = _.isString(value[NEW_KEY]) ? `'${value[NEW_KEY]}'` : value[NEW_KEY];
  const added = _.isObjectLike(value[NEW_KEY]) ? '[complex value]' : quotedAddedPropertyIfString;
  const quotedRemovedPropertyIfString = _.isString(value[OLD_KEY]) ? `'${value[OLD_KEY]}'` : value[OLD_KEY];
  const removed = _.isObjectLike(value[OLD_KEY]) ? '[complex value]' : quotedRemovedPropertyIfString;

  if (value[TYPE_KEY] === REMOVED) {
    return `Property '${path}' was removed`;
  }
  if (value[TYPE_KEY] === ADDED) {
    return `Property '${path}' was added with value: ${added}`;
  }
  if (value[TYPE_KEY] === UPDATED) {
    return `Property '${path}' was updated. From ${removed} to ${added}`;
  }
  return '';
}).filter((line) => !_.isEmpty(line));

export default (obj) => internalToPlain(obj).join('\n');
