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
    'erc20ABI',
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
