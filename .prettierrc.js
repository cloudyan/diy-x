// 文档 https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 80, // default 80
  semi: true, // default true
  singleQuote: true, // default false
  tabWidth: 2, // default 2
  trailingComma: 'all', // default es5
  // 以上为改动，其他选项都使用默认值

  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.{ejs,html}', // document.ejs
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.{yaml,yml}',
      options: {
        // singleQuote: false,
      },
    },
    {
      files: 'src/locale/*.ts',
      options: {
        printWidth: 800,
      },
    },
  ],
};
