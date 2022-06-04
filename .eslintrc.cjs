module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'new-cap': 'off',
    'no-invalid-this': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
  },
};
