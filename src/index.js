import { readFileSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const fileContent1 = readFileSync(
    resolve(process.cwd(), filepath1),
    'utf8',
  );
  const fileContent2 = readFileSync(
    resolve(process.cwd(), filepath2),
    'utf8',
  );
  const dotPosition = filepath1.lastIndexOf('.');
  const extension = filepath1.substr(dotPosition);

  if (extension === '.json') {
    const json1 = JSON.parse(fileContent1);
    const json2 = JSON.parse(fileContent2);
    const union = { ...json1, ...json2 };
    const result = Object
      .keys(union)
      .reduce((res, key) => {
        if (json1[key] === json2[key]) return `${res}   ${key}: ${union[key]}\n`;
        if (!_.isUndefined(json1[key]) && json2[key] === undefined) return `${res} - ${key}: ${union[key]}\n`;
        if (_.isUndefined(json1[key]) && json2[key] !== undefined) return `${res} + ${key}: ${union[key]}\n`;
        if (json1[key] !== json2[key]) {
          return `${res} - ${key}: ${json1[key]}\n + ${key}: ${json2[key]}\n`;
        }
        return res;
      }, '\n');

    return `{${result}}`;
  }
  return '';
};
