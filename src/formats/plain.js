import _ from 'lodash';

const plain = (obj, prefix = '') => {
  const keys = Object.keys(obj);
  const removedAndUpdated = keys.filter((key) => key[0] === '-').map((key) => key.replace('-', ''));
  const addedAndUpdated = keys.filter((key) => key[0] === '+').map((key) => key.replace('+', ''));
  const updated = _.intersection(removedAndUpdated, addedAndUpdated);
  const removed = _.difference(removedAndUpdated, updated);
  const added = _.difference(addedAndUpdated, updated);
};

export default (obj) => Object
  .keys(obj)
  .filter((key) => /^[+|-]\s/.test(key))
  .map((key) => `${key}: ${obj[key]}`)
  .join('\n');
