import { wallets } from 'wagmi-testing'

import { setupWagmiClient } from '../../../test'
import { fetchEnsAddress } from './fetchEnsAddress'

describe('fetchEnsAddress', () => {
  it('no result', async () => {
    setupWagmiClient()
    const result = await fetchEnsAddress({ name: 'foo.eth' })
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it('has address', async () => {
    setupWagmiClient()
    const result = await fetchEnsAddress({ name: wallets.ethers3.ensName })
    expect(result).toMatchInlineSnapshot(
      `"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"`,
    )
  })
})
