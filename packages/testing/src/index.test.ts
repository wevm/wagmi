import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "defaultChains",
      "MockConnector",
      "contracts",
      "infuraApiKey",
      "wallets",
      "server",
    ]
  `)
})
