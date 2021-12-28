import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // connectors
    'Connector',
    'InjectedConnector',
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
    'units',
  ])
})
