module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    jest: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'prettier'],
  plugins: ['import', 'module-resolver', 'prettier'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'import/no-cycle': ['error'],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'acc', 'e'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    'no-shadow': [
      'error',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: ['state', 'mutations'],
      },
    ],
    'arrow-parens': [
      'error',
      'as-needed',
      {
        'requireForBlockBody': false
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['warn', { code: 120, ignoreComments: true }],
    'arrow-body-style': ['error', 'as-needed'],
    'prettier/prettier': 'error',
  },
};
