// index.mjs
import JestHasteMap from 'jest-haste-map';
import {cpus} from 'os';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

// Get the root path to our project (Like `__dirname`).
const root = dirname(fileURLToPath(import.meta.url));

// Need to use `.default` as of Jest 27.
const hasteMap = new JestHasteMap.default({
  extensions: ['js'],
  maxWorkers: cpus().length,
  name: 'best-test-framework',
  platforms: [],
  rootDir: root,
  roots: [root],
});

const {hasteFS} = await hasteMap.build();
// const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js']);
const testFiles = hasteFS.getAllFiles();

console.log(testFiles);
// ['/path/to/tests/01.test.js', '/path/to/tests/02.test.js', …]
