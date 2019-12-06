module.exports = {
  collectCoverageFrom: ['src/**'],
  setupFiles: [require.resolve('raf/polyfill')],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  moduleNameMapper: { '\\.(scss)$': '<rootDir>/test/setup.sass.js' },
  coveragePathIgnorePatterns: ['<rootDir>/src/utils/', '<rootDir>/src/index.js'],
};
