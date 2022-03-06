import { setupWagmiClient } from '../../../test'
import { fetchEnsAvatar } from './fetchEnsAvatar'

describe('fetchEnsAvatar', () => {
  beforeEach(async () => {
    await setupWagmiClient()
  })

  it('no result', async () => {
    const result = await fetchEnsAvatar({ addressOrName: 'awkweb.eth' })
    expect(result).toMatchInlineSnapshot(`null`)
  })

  describe('has avatar', () => {
    it('erc1155', async () => {
      setupWagmiClient()
      const result = await fetchEnsAvatar({
        addressOrName: 'nick.eth',
      })
      expect(result).toMatchInlineSnapshot(
        `"https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE"`,
      )
    })

    it('erc721', async () => {
      setupWagmiClient()
      const result = await fetchEnsAvatar({
        addressOrName: 'brantly.eth',
      })
      expect(result).toMatchInlineSnapshot(
        `"https://api.wrappedpunks.com/images/punks/2430.png"`,
      )
    })

    it('custom', async () => {
      setupWagmiClient()
      const result = await fetchEnsAvatar({
        addressOrName: 'tanrikulu.eth',
      })
      expect(result).toMatchInlineSnapshot(
        `"https://ipfs.io/ipfs/QmUShgfoZQSHK3TQyuTfUpsc8UfeNfD8KwPUvDBUdZ4nmR"`,
      )
    })
  })
})
