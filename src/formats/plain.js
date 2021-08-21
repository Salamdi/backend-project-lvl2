import _ from 'lodash';
import { ADDED, NEW_KEY, OLD_KEY, REMOVED, TYPE_KEY, UPDATED } from '../constants.js';

const internalToPlain = (internalDiff, prefix = '') => _.flatMap(internalDiff, (value, key) => {
    if (!_.isObject(value)) {
        return '';
    }

    const path = prefix ? `${prefix}.${key}` : key;

    if (!value[TYPE_KEY]) {
        return internalToPlain(value, path);
    }

    let added = _.isString(value[NEW_KEY]) ? `'${value[NEW_KEY]}'` : value[NEW_KEY];
    added = _.isObjectLike(added) ? '[complex value]' : added;
    let removed = _.isString(value[OLD_KEY]) ? `'${value[OLD_KEY]}'` : value[OLD_KEY];
    removed = _.isObjectLike(removed) ? '[complex value]' : removed;

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
