import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { readFileSync } from 'fs';
import makeParser from '../src/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFile1 = join(__dirname, '..', '__fixtures__', 'file1.json');
const jsonFile2 = join(__dirname, '..', '__fixtures__', 'file2.json');
const ymlFile1 = join(__dirname, '..', '__fixtures__', 'file1.yml');
const ymlFile2 = join(__dirname, '..', '__fixtures__', 'file2.yml');
const yamlFile1 = join(__dirname, '..', '__fixtures__', 'file1.yaml');
const yamlFile2 = join(__dirname, '..', '__fixtures__', 'file2.yaml');
const jsonFileContent1 = readFileSync(jsonFile1);
const jsonFileContent2 = readFileSync(jsonFile2);
const ymlFileContent1 = readFileSync(ymlFile1);
const ymlFileContent2 = readFileSync(ymlFile2);
const yamlFileContent1 = readFileSync(yamlFile1);
const yamlFileContent2 = readFileSync(yamlFile2);

describe('parser works with json and yml', () => {
  const jsonExtension = extname(jsonFile1);
  const ymlExtension = extname(ymlFile1);
  const parseJson = makeParser(jsonExtension);
  const parseYaml = makeParser(ymlExtension);
  const objectFromJson1 = parseJson(jsonFileContent1);
  const objectFromJson2 = parseJson(jsonFileContent2);
  const objectFromYml1 = parseYaml(ymlFileContent1);
  const objectFromYml2 = parseYaml(ymlFileContent2);
  const objectFromYaml1 = parseYaml(yamlFileContent1);
  const objectFromYaml2 = parseYaml(yamlFileContent2);

  test('yml and json should be parsed to the same object', () => {
    expect(objectFromJson1).toEqual(objectFromYml1);
    expect(objectFromJson2).toEqual(objectFromYml2);
  });

  test('yaml and yml should be parsed the same', () => {
    expect(objectFromYaml1).toEqual(objectFromYml1);
    expect(objectFromYaml2).toEqual(objectFromYml2);
  })
});
