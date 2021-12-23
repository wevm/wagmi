module.exports = {
  testEnvironment: 'jsdom',
  testRegex: '.*\\.test\\.ts(x)?$',
  modulePathIgnorePatterns: ['<rootDir>/examples/'],
  setupFilesAfterEnv: ['<rootDir>/scripts/jestSetup.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc-node/jest',
      {
        jsc: {
          minify: false,
        },
      },
    ],
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/test/',
    'index.ts',
  ],
  coverageProvider: 'v8',
  coverageReporters: ['text'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
