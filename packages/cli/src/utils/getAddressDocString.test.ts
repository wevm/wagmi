import { expect, test } from 'vitest'

import { getAddressDocString } from './getAddressDocString.js'

test('address', async () => {
  expect(
    getAddressDocString({
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    }),
  ).toMatchInlineSnapshot('""')
})

test('multichain address with known chain ids', async () => {
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
        * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e)"
      `)
})

test('multichain address with unknown chain id', async () => {
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
