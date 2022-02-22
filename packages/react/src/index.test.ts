import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "Provider",
      "WagmiProvider",
      "useContext",
      "Context",
      "useAccount",
      "useBalance",
      "useBlockNumber",
      "useConnect",
      "useContract",
      "useContractEvent",
      "useContractRead",
      "useContractWrite",
      "useEnsAvatar",
      "useEnsLookup",
      "useEnsResolveName",
      "useEnsResolver",
      "useFeeData",
      "useNetwork",
      "useProvider",
      "useSigner",
      "useSignMessage",
      "useToken",
      "useTransaction",
      "useWaitForTransaction",
      "useWebSocketProvider",
      "Connector",
      "InjectedConnector",
      "chain",
      "allChains",
      "defaultChains",
      "defaultL2Chains",
      "developmentChains",
      "erc1155ABI",
      "erc20ABI",
      "erc721ABI",
      "normalizeChainId",
      "AddChainError",
      "ChainNotConfiguredError",
      "ConnectorAlreadyConnectedError",
      "ConnectorNotFoundError",
      "SwitchChainError",
      "UserRejectedRequestError",
    ]
  `)
})

it('should alias Provider as WagmiProvider', () => {
  expect(Exports.Provider).toBe(Exports.WagmiProvider)
})
