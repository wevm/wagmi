import { setupWagmiClient } from '../../../test'
import { fetchBalance } from './fetchBalance'

describe('fetchBalance', () => {
  beforeEach(() => {
    setupWagmiClient()
  })

  it('fetches eth balance for address', async () => {
    const result = await fetchBalance({
      addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    })
    expect(result).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "1.403416862768458662",
        "symbol": "ETH",
        "unit": "ether",
        "value": {
          "hex": "0x1379f033791b6ba6",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('fetches eth balance for ENS name', async () => {
    const result = await fetchBalance({
      addressOrName: 'awkweb.eth',
    })
    expect(result).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "1.403416862768458662",
        "symbol": "ETH",
        "unit": "ether",
        "value": {
          "hex": "0x1379f033791b6ba6",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('fetches UNI token balance for address', async () => {
    const result = await fetchBalance({
      addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    })
    expect(result).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "18.0553",
        "symbol": "UNI",
        "unit": "ether",
        "value": {
          "hex": "0xfa914fb05d1c4000",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('formats balance', async () => {
    const result = await fetchBalance({
      addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      formatUnits: 'gwei',
    })
    expect(result).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "1403416862.768458662",
        "symbol": "ETH",
        "unit": "gwei",
        "value": {
          "hex": "0x1379f033791b6ba6",
          "type": "BigNumber",
        },
      }
    `)
  })
})
