import { test, expect } from '@jest/globals';
import getDiff from '../index.js'
const str = 
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true 
}`
test('getDiff', () => {
  const testStr = getDiff('./files/file1.json', './files/file1.json');
  console.log(testStr);
  expect(testStr).not.toEqual(str);
});
