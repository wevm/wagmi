import { wallets } from 'wagmi-testing'

import { setupWagmiClient } from '../../../test'
import { fetchEnsName } from './fetchEnsName'

describe('fetchEnsName', () => {
  it('no result', async () => {
    setupWagmiClient()
    const result = await fetchEnsName({ address: wallets.ethers1.address })
    expect(result).toMatchInlineSnapshot(`
      {
        "ensName": null,
      }
    `)
  })

  it('has ens name', async () => {
    setupWagmiClient()
    const result = await fetchEnsName({ address: wallets.ethers3.address })
    expect(result).toMatchInlineSnapshot(`
      {
        "ensName": "meagher.eth",
      }
    `)
  })
})
