import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'MockConnector',
    'addressLookup',
    'defaultChains',
    'defaultMnemonic',
    'infuraApiKey',
    'messageLookup',
  ])
})
