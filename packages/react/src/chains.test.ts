import * as Exports from './chains'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "arbitrum",
      "arbitrumRinkeby",
      "foundry",
      "goerli",
      "hardhat",
      "kovan",
      "localhost",
      "mainnet",
      "optimism",
      "optimismKovan",
      "polygon",
      "polygonMumbai",
      "rinkeby",
      "ropsten",
    ]
  `)
})
