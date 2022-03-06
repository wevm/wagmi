import { setupWagmiClient } from '../../../test'
import { fetchEnsAddress } from './fetchEnsAddress'

describe('fetchEnsAddress', () => {
  beforeEach(async () => {
    await setupWagmiClient()
  })

  it('no result', async () => {
    const result = await fetchEnsAddress({ name: 'awkweb123.eth' })
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it('has address', async () => {
    const result = await fetchEnsAddress({ name: 'awkweb.eth' })
    expect(result).toMatchInlineSnapshot(
      `"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"`,
    )
  })
})
