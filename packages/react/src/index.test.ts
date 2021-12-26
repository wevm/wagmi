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
    'useTransaction',
    'useWebSocketProvider',
  ])
})
