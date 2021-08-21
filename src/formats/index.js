import stylish from './stylish.js';
import plain from './plain.js';

export const STYLISH = 'stylish';
export const PLAIN = 'plain';

export default (format) => {
  switch (format) {
    case (STYLISH): {
      return stylish;
    }
    case (PLAIN): {
      return plain;
    }
    default: {
      throw new Error('not supported format:', format);
    }
  }
};
