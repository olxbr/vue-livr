const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/test/unit/babel-transformer.js',
  },
  transformIgnorePatterns: ['node_modules'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: ['src/**/*.{js}', '!src/index.js', '!**/node_modules/**'],
  verbose: true,
  testURL: 'http://localhost/',
  globals: {
    'babel-jest': {
      useBabelrc: true,
    },
  },
};
