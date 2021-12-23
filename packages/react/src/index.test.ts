import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Provider',
    // Hooks
    'useContext',
    'useAccount',
    'useBlockNumber',
    'useConnect',
    'useContract',
    'useEnsAvatar',
    'useEnsLookup',
    'useEnsResolver',
    'useNetwork',
    'useProvider',
    'useWebSocketProvider',
    // Connectors
    'InjectedConnector',
    'WalletConnectConnector',
    'WalletLinkConnector',
    'defaultChains',
    'defaultL2Chains',
    'developmentChains',
  ])
})
