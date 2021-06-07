// 1. 高效搜索文件系统上的测试文件

// index.mjs
import glob from 'glob';

const testFiles = glob.sync('**/*.test.js');

console.log(testFiles); // ['tests/01.test.js', 'tests/02.test.js', …]
