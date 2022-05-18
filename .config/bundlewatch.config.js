module.exports = {
  files: [
    // Core
    {
      path: 'packages/core/dist/*.cjs.prod.js',
    },
    {
      path: 'packages/core/dist/*.esm.js',
    },
    // React
    {
      path: 'packages/react/dist/*.cjs.prod.js',
    },
    {
      path: 'packages/react/dist/*.esm.js',
    },
  ],
  ci: {
    trackBranches: ['main'],
  },
}
