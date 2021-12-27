module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-react'],

  overrides: [
    {
      include: ['./packages/private', './packages/react'],
      presets: [['@babel/preset-env', { targets: { esmodules: true } }]],
    },
  ],
}
