module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    chrome: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  overrides: [
    {
        files: ['*.svelte'],
        plugins: ['svelte3'],
        processor: 'svelte3/svelte3',
        extends: ['eslint:recommended'],
    },
    {
        files: ['*.js'],
        plugins: ['prettier'],
        extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    }
  ],
  rules: {
  },
  ignorePatterns: ['node_modules']
}
