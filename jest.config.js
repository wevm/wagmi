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
      snapshotFormat: {
        printBasicPrototype: false,
      },
      testEnvironment: 'jsdom',
      testRegex: 'packages/react/.*\\.test\\.ts(x)?$',
    },
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
