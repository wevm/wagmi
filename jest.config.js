module.exports = {
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
    '/testing/',
    'index.ts',
  ],
  coverageProvider: 'v8',
  coverageReporters: ['text'],
  projects: [
    {
      displayName: 'private',
      testEnvironment: 'jsdom',
      testRegex: 'packages/private/.*\\.test\\.ts(x)?$',
    },
    {
      displayName: 'react',
      testEnvironment: 'jsdom',
      testRegex: 'packages/react/.*\\.test\\.ts(x)?$',
    },
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
