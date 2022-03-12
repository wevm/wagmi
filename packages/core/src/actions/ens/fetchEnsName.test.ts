import { setupWagmiClient } from '../../../test'
import { fetchEnsName } from './fetchEnsName'

describe('fetchEnsName', () => {
  beforeEach(() => {
    setupWagmiClient()
  })

  it('no result', async () => {
    const result = await fetchEnsName({
      address: '0x5FE6C3F8d12D5Ad1480F6DC01D8c7864Aa58C523',
    })
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it('has ens name', async () => {
    const result = await fetchEnsName({
      address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    })
    expect(result).toMatchInlineSnapshot(`"awkweb.eth"`)
  })
})
