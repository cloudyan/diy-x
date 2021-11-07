module.exports = {
  root: true,
  extends: [require.resolve('@deepjs/lint/dist/eslint')],
  globals: {
    require: 'readonly',
  },
  rules: {
    // your rules
    // 'unicorn/filename-case': 0,
    // 'unicorn/filename-case': [
    //   'error',
    //   {
    //     cases: {
    //       kebabCase: true, // foo-bar.js
    //       camelCase: true, // fooBar.js
    //       snakeCase: true, // foo_bar.js
    //       pascalCase: true, // FooBar.js
    //     },
    //     ignore: [
    //       // 不能匹配文件夹, 如 locales, 可配合 eslintignore 使用
    //       // /^zh-CN\.[j|t]s$/,
    //     ],
    //   },
    // ],
  },
};
