module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['/dist/*', 'package-lock.json'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
