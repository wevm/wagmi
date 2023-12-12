import { config, typedData } from '@wagmi/test'
import { expect, test } from 'vitest'

import { verifyTypedData } from './verifyTypedData.js'

const smartAccountAddress = '0x3FCf42e10CC70Fe75A62EB3aDD6D305Aa840d145'
const notDeployedAddress = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'

test('valid signature', async () => {
  expect(
    await verifyTypedData(config, {
      ...typedData.basic,
      primaryType: 'Mail',
      address: smartAccountAddress,
      signature:
        '0x79d756d805073dc97b7bc885b0d56ddf319a2599530fe1e178c2a7de5be88980068d24f20a79b318ea0a84d33ae06f93db77e4235e5d9eeb8b1d7a63922ada3e1c',
    }),
  ).toBe(true)
})

test('invalid signature', async () => {
  expect(
    await verifyTypedData(config, {
      ...typedData.basic,
      primaryType: 'Mail',
      address: smartAccountAddress,
      signature: '0xdead',
    }),
  ).toBe(false)
})

test('account not deployed', async () => {
  expect(
    await verifyTypedData(config, {
      ...typedData.basic,
      primaryType: 'Mail',
      address: notDeployedAddress,
      signature:
        '0x79d756d805073dc97b7bc885b0d56ddf319a2599530fe1e178c2a7de5be88980068d24f20a79b318ea0a84d33ae06f93db77e4235e5d9eeb8b1d7a63922ada3e1c',
    }),
  ).toBe(false)
})
