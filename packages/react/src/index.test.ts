import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // connectors
    'Connector',
    'InjectedConnector',
    'Provider',
    'WalletConnectConnector',
    'WalletLinkConnector',
    // constants
    'chain',
    'defaultChains',
    'defaultL2Chains',
    'developmentChains',
    'erc1155ABI',
    'erc20ABI',
    'erc721ABI',
    'isAddress',
    // hooks
    'useAccount',
    'useBalance',
    'useBlockNumber',
    'useConnect',
    'useContext',
    'useContract',
    'useContractEvent',
    'useEnsAvatar',
    'useEnsLookup',
    'useEnsResolver',
    'useFeeData',
    'useNetwork',
    'useProvider',
    'useToken',
    'useWebSocketProvider',
  ])
})
