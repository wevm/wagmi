import { wallets } from 'wagmi-testing'

import { setupWagmiClient } from '../../../test'
import { fetchBalance } from './fetchBalance'

describe('fetchBalance', () => {
  it('fetches eth balance', async () => {
    setupWagmiClient()
    expect(
      await fetchBalance({
        addressOrName: wallets.ethers1.address,
      }),
    ).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "0.193861344139087225",
        "symbol": "ETH",
        "unit": "ether",
        "value": {
          "hex": "0x02b0bbdd89170d79",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('formats balance', async () => {
    const balance = await fetchBalance({
      addressOrName: wallets.ethers1.address,
      formatUnits: 'gwei',
    })
    expect(balance).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "193861344.139087225",
        "symbol": "ETH",
        "unit": "gwei",
        "value": {
          "hex": "0x02b0bbdd89170d79",
          "type": "BigNumber",
        },
      }
    `)
  })
})
