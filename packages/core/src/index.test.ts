import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "Connector",
      "InjectedConnector",
      "connect",
      "disconnect",
      "getAccount",
      "watchAccount",
      "getNetwork",
      "watchNetwork",
      "erc1155ABI",
      "erc20ABI",
      "erc721ABI",
      "chain",
      "allChains",
      "defaultChains",
      "defaultL2Chains",
      "developmentChains",
      "units",
      "AddChainError",
      "ChainNotConfiguredError",
      "ConnectorNotFoundError",
      "SwitchChainError",
      "UserRejectedRequestError",
      "createWagmiClient",
      "normalizeChainId",
    ]
  `)
})
