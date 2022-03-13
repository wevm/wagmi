import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "Provider",
      "WagmiProvider",
      "useClient",
      "useWagmiClient",
      "useAccount",
      "useBlockNumber",
      "useConnect",
      "useEnsLookup",
      "useProvider",
      "useWebSocketProvider",
      "Client",
      "Connector",
      "WagmiClient",
      "allChains",
      "chain",
      "createClient",
      "createStorage",
      "createWagmiClient",
      "createWagmiStorage",
      "defaultChains",
      "erc1155ABI",
      "erc20ABI",
      "erc721ABI",
    ]
  `)
})

it('should alias Provider as WagmiProvider', () => {
  expect(Exports.Provider).toBe(Exports.WagmiProvider)
})
