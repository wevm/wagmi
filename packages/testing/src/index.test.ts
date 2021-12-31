import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "defaultChains",
      "MockConnector",
      "addressLookup",
      "defaultMnemonic",
      "infuraApiKey",
      "messageLookup",
      "server",
    ]
  `)
})
