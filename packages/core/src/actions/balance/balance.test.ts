import { contracts, wallets } from 'wagmi-testing'

import { getProvider } from '../../../test'
import { balanceAction } from './balance'

const provider = getProvider()

describe('balanceAction', () => {
  it('fetches eth balance', async () => {
    const balance = await balanceAction({
      config: {
        addressOrName: wallets.ethers1.address,
      },
      provider,
    })
    expect(balance).toMatchInlineSnapshot(`
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

  it.skip('fetches token balance', async () => {
    const balance = await balanceAction({
      config: {
        addressOrName: wallets.ethers3.address,
        token: contracts.uniToken,
      },
      provider,
    })
    expect(balance).toMatchInlineSnapshot()
  })

  it('formats balance', async () => {
    const balance = await balanceAction({
      config: {
        addressOrName: wallets.ethers1.address,
        formatUnits: 'gwei',
      },
      provider,
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
