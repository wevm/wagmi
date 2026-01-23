import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { verifyMessage } from './verifyMessage.js'

const eoaAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
const smartAccountAddress = '0x3FCf42e10CC70Fe75A62EB3aDD6D305Aa840d145'

test('smart account: valid signature', async () => {
  expect(
    await verifyMessage(config, {
      address: smartAccountAddress,
      message: 'This is a test message for viem!',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toBe(true)
})

test('smart account: invalid signature', async () => {
  expect(
    await verifyMessage(config, {
      address: smartAccountAddress,
      message: 'This is a test message for viem!',
      signature: '0xdead',
    }),
  ).toBe(false)
})

test('smart account: account not deployed', async () => {
  expect(
    await verifyMessage(config, {
      blockNumber: 1234567890n,
      address: smartAccountAddress,
      message: 'This is a test message for viem!',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toBe(false)
})

test('eoa: valid signature', async () => {
  expect(
    await verifyMessage(config, {
      address: eoaAddress,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  ).toBe(true)
})

test('eoa: invalid signature', async () => {
  expect(
    await verifyMessage(config, {
      address: eoaAddress,
      message: 'This is a test message for viem!',
      signature: '0xdead',
    }),
  ).toBe(false)
})

test('eoa: raw message', async () => {
  expect(
    await verifyMessage(config, {
      address: eoaAddress,
      message: { raw: '0x68656c6c6f20776f726c64' },
      signature:
        '0xa461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b',
    }),
  ).toBe(true)
})
