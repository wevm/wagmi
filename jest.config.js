module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/docs/', '<rootDir>/examples/'],
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
    '/testing/',
    'index.ts',
  ],
  coverageProvider: 'v8',
  coverageReporters: ['text'],
  projects: [
    {
      displayName: 'private',
      testEnvironment: 'node',
      testRegex: 'packages/private/.*\\.test\\.ts(x)?$',
    },
    {
      displayName: 'react',
      setupFilesAfterEnv: ['<rootDir>/packages/react/test/setup.ts'],
      testEnvironment: 'jsdom',
      testRegex: 'packages/react/.*\\.test\\.ts(x)?$',
      snapshotFormat: {
        printBasicPrototype: false,
      },
    },
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
