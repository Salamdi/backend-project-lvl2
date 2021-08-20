export default (obj) => JSON.stringify(obj, null, 4)
  .replaceAll(',', '')
  .replaceAll('"', '')
  .replaceAll('    + ', '  + ')
  .replaceAll('    - ', '  - ');
