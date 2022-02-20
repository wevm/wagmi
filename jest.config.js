const config = {
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/'],
  snapshotFormat: {
    printBasicPrototype: false,
  },
  transform: {
    '^.+\\.ts(x)?$': [
      '@swc-node/jest',
      {
        jsc: {
          minify: false,
        },
      },
    ],
  },
}

module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/docs/', '<rootDir>/examples/'],
  coverageProvider: 'v8',
  coverageReporters: ['text'],
  projects: [
    {
      ...config,
      displayName: 'core',
      testEnvironment: 'node',
      testRegex: 'packages/core/.*\\.test\\.ts$',
    },
    {
      ...config,
      displayName: 'react',
      setupFilesAfterEnv: ['<rootDir>/packages/react/test/setup.ts'],
      testEnvironment: 'jsdom',
      testRegex: 'packages/react/.*\\.test\\.ts(x)?$',
    },
    {
      ...config,
      displayName: 'testing',
      testEnvironment: 'node',
      testRegex: 'packages/testing/.*\\.test\\.ts$',
    },
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
