import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Connector',
    'InjectedConnector',
    'Provider',
    'WalletConnectConnector',
    'WalletLinkConnector',
    'defaultChains',
    'defaultL2Chains',
    'developmentChains',
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
