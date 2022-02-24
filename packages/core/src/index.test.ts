import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "Connector",
      "InjectedConnector",
      "balanceAction",
      "connect",
      "disconnect",
      "fetchEnsName",
      "getAccount",
      "getNetwork",
      "switchNetwork",
      "watchAccount",
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
      "ConnectorAlreadyConnectedError",
      "ConnectorNotFoundError",
      "SwitchChainError",
      "UserRejectedRequestError",
      "createWagmiClient",
      "normalizeChainId",
      "createStorage",
    ]
  `)
})
