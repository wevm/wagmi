import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Connector',
    'InjectedConnector',
    'WalletConnectConnector',
    'WalletLinkConnector',
    'defaultChains',
    'defaultL2Chains',
    'developmentChains',
  ])
})
