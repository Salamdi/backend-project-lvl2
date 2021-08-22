import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export const STYLISH = 'stylish';
export const PLAIN = 'plain';
export const JSON_FORMAT = 'json';

export default (format) => {
  switch (format) {
    case '':
    case (STYLISH): {
      return stylish;
    }
    case (PLAIN): {
      return plain;
    }
    case (JSON_FORMAT): {
      return json;
    }
    default: {
      throw new Error('not supported format:', format);
    }
  }
};
