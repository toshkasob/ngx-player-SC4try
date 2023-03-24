module.exports = {
  printWidth: 140,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  useTabs: false,
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 120,
        parser: 'angular',
      },
    },
    {
      files: '*.css',
      options: {
        printWidth: 120,
        parser: 'css',
      },
    },
    {
      files: '*.js',
      options: {
        parser: 'babel',
      },
    },
    {
      files: '*.ts',
      options: {
        printWidth: 120,
        parser: 'typescript',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
    {
      files: '.stylelintrc',
      options: {
        parser: 'json',
      },
    },
  ],
};
