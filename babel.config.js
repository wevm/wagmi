module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-react'],

  overrides: [
    {
      include: ['./packages/core', './packages/react'],
      presets: [['@babel/preset-env', { targets: { esmodules: true } }]],
    },
  ],
}
