import { wallets } from 'wagmi-testing'

import { setupWagmiClient } from '../../../test'
import { fetchEnsAvatar } from './fetchEnsAvatar'

describe('fetchEnsAvatar', () => {
  it('no result', async () => {
    setupWagmiClient()
    const result = await fetchEnsAvatar({ addressOrName: 'foo.eth' })
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it('has avatar', async () => {
    setupWagmiClient()
    const result = await fetchEnsAvatar({
      addressOrName: wallets.ethers3.ensName,
    })
    expect(result).toMatchInlineSnapshot(
      `"https://pbs.twimg.com/profile_images/1462291760135258115/tJ9K8K5v_400x400.jpg"`,
    )
  })
})
