// 并行运行所有测试

// index.mjs
import fs from 'fs';

for await (const testFile of testFiles) {
  const code = await fs.promises.readFile(testFile, 'utf8');
  console.log(testFile + ':\n' + code);
}
