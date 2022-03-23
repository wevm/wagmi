import { setupWagmiClient } from '../../../test'
import { fetchEnsResolver } from './fetchEnsResolver'

describe('fetchEnsResolver', () => {
  beforeEach(() => {
    setupWagmiClient()
  })

  it('no result', async () => {
    const result = await fetchEnsResolver({ name: 'awkweb123.eth' })
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it('has resolver', async () => {
    const result = await fetchEnsResolver({ name: 'awkweb.eth' })
    expect(result).toMatchInlineSnapshot(`
      Resolver {
        "_resolvedAddress": undefined,
        "address": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
        "name": "awkweb.eth",
        "provider": "<WrappedHardhatProvider>",
      }
    `)
  })
})
