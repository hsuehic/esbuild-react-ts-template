module.exports = {
  env: {
    browser: true, // Enables browser globals like window and document
    es2021: true,
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  plugins: ['react', 'jsx-a11y', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-use-before-define': 'off',
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 0,
    'no-shadow': 1,
    'prefer-const': 1,
    'prefer-spread': 1,
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['{scripts,scripts-cjs,scripts-mjs}/**/*.{ts,js,mjs}'],
      rules: {
        'no-console': 0,
      },
    },
  ],
};
