import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Connector',
    'InjectedConnector',
    'WalletConnectConnector',
    'WalletLinkConnector',
    'chain',
    'defaultChains',
    'defaultL2Chains',
    'developmentChains',
    'erc1155ABI',
    'erc20ABI',
    'erc721ABI',
    'normalizeChainId',
    'normalizeMessage',
    'units',
    'verifyNormalizedMessage',
  ])
})
