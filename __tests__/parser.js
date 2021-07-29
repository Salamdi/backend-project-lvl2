import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { readFileSync } from 'fs';
import makeParser from '../src/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFile1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const jsonFile2 = join(__dirname, '..', '__fixtures__', 'file2.json');
const yamlFile1 = join(__dirname, '..', '__fixtures__', 'file1.yml');
const yamlFile2 = join(__dirname, '..', '__fixtures__', 'file2.yml');
const jsonFileContent1 = readFileSync(jsonFile1);
const jsonFileContent2 = readFileSync(jsonFile2);
const yamlFileContent1 = readFileSync(yamlFile1);
const yamlFileContent2 = readFileSync(yamlFile2);

describe('parser works with json and yml', () => {
  const jsonExtension = extname(jsonFile1);
  const yamlExtension = extname(yamlFile1);
  const parseJson = makeParser(jsonExtension);
  const parseYaml = makeParser(yamlExtension);
  const objectFromJson1 = parseJson(jsonFileContent1);
  const objectFromJson2 = parseJson(jsonFileContent2);
  const objectFromYaml1 = parseYaml(yamlFileContent1);
  const objectFromYaml2 = parseYaml(yamlFileContent2);
  test('yaml and json should be parsed to the same object', () => {
    expect(objectFromJson1).toEqual(objectFromYaml1);
    expect(objectFromJson2).toEqual(objectFromYaml2);
  });
});
