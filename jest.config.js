module.exports = {
  collectCoverageFrom: ['src/**'],
  setupTestFrameworkScriptFile: '<rootDir>/test/setup.js',
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/test/setup.sass.js',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/utils/',
    '<rootDir>/src/index.js',
  ],
};
