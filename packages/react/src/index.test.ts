import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "createClient",
      "createWagmiClient",
      "Provider",
      "WagmiProvider",
      "useClient",
      "useWagmiClient",
      "useAccount",
      "useBalance",
      "useBlockNumber",
      "useConnect",
      "useContract",
      "useContractEvent",
      "useContractRead",
      "useContractWrite",
      "useDisconnect",
      "useEnsAddress",
      "useEnsAvatar",
      "useEnsName",
      "useEnsResolver",
      "useFeeData",
      "useNetwork",
      "useProvider",
      "useSendTransaction",
      "useSignMessage",
      "useSignTypedData",
      "useSigner",
      "useToken",
      "useWaitForTransaction",
      "useWebSocketProvider",
      "deserialize",
      "serialize",
      "Client",
      "Connector",
      "WagmiClient",
      "alchemyRpcUrls",
      "allChains",
      "chain",
      "chainId",
      "createStorage",
      "createWagmiStorage",
      "defaultChains",
      "defaultL2Chains",
      "erc20ABI",
      "erc721ABI",
      "etherscanBlockExplorers",
      "infuraRpcUrls",
    ]
  `)
})

it('should alias Provider as WagmiProvider', () => {
  expect(Exports.Provider).toBe(Exports.WagmiProvider)
})
