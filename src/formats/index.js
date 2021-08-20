import stylish from './stylish.js';

export const STYLISH = 'stylish';

export default (format) => {
  switch (format) {
    case (STYLISH): {
      return stylish;
    }
    default: {
      throw new Error('not supported format:', format);
    }
  }
};
