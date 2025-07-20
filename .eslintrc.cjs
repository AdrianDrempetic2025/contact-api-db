module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'jest', 'security'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:@next/next/recommended',
    'prettier'
  ],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-restricted-imports': [
      'error',
      { patterns: ['../*../*'] }  // blocks ../../foo style forever
    ]
  },
  ignorePatterns: ['dist', '.eslintrc.cjs']
};
