import { describe, expect, it } from 'vitest'

import { getAddressDocString } from './getAddressDocString'

describe('getAddressDocString', () => {
  it('address', async () => {
    expect(
      getAddressDocString({
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      }),
    ).toMatchInlineSnapshot('""')
  })

  describe('multichain address', () => {
    it('with known chain ids', async () => {
      expect(
        getAddressDocString({
          address: {
            1: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
            5: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
            10: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
          },
        }),
      ).toMatchInlineSnapshot(`
        "* - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e)
        * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e)
        * - [__View Contract on Optimism Optimism Explorer__](https://explorer.optimism.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e)"
      `)
    })

    it('with unknown chain id', async () => {
      expect(
        getAddressDocString({
          address: {
            1: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
            2: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
          },
        }),
      ).toMatchInlineSnapshot(
        '"* [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e)"',
      )
    })
  })
})
