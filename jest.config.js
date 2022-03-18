const config = {
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/'],
  snapshotFormat: {
    printBasicPrototype: false,
  },
  transform: {
    '^.+\\.(ts|js)(x)?$': [
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
      setupFilesAfterEnv: ['<rootDir>/packages/core/test/setup.ts'],
      testEnvironment: 'node',
      testRegex: 'packages/core/.*\\.test\\.ts$',
    },
    {
      ...config,
      displayName: 'react',
      globals: {
        Uint8Array: Uint8Array,
        ArrayBuffer: ArrayBuffer,
      },
      setupFilesAfterEnv: ['<rootDir>/packages/react/test/setup.ts'],
      testEnvironment: 'jsdom',
      testRegex: 'packages/react/.*\\.test\\.ts(x)?$',
    },
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
