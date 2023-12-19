import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'

import {
  address,
  apiKey,
  handlers,
  invalidApiKey,
  timeoutAddress,
  unverifiedContractAddress,
} from '../../test/utils.js'
import { etherscan } from './etherscan.js'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetches ABI', async () => {
  await expect(
    etherscan({
      apiKey,
      chainId: 1,
      contracts: [{ name: 'WagmiMintExample', address }],
    }).contracts(),
  ).resolves.toMatchSnapshot()
})

test('fetches ABI with multichain deployment', async () => {
  await expect(
    etherscan({
      apiKey,
      chainId: 1,
      contracts: [
        { name: 'WagmiMintExample', address: { 1: address, 10: address } },
      ],
    }).contracts(),
  ).resolves.toMatchSnapshot()
})

test('fails to fetch for unverified contract', async () => {
  await expect(
    etherscan({
      apiKey,
      chainId: 1,
      contracts: [
        { name: 'WagmiMintExample', address: unverifiedContractAddress },
      ],
    }).contracts(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '"Contract source code not verified"',
  )
})

test('missing address for chainId', async () => {
  await expect(
    etherscan({
      apiKey,
      chainId: 1,
      // @ts-expect-error `chainId` and `keyof typeof contracts[number].address` mismatch
      contracts: [{ name: 'WagmiMintExample', address: { 10: address } }],
    }).contracts(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '"No address found for chainId \\"1\\". Make sure chainId \\"1\\" is set as an address."',
  )
})

test('invalid api key', async () => {
  await expect(
    etherscan({
      apiKey: invalidApiKey,
      chainId: 1,
      contracts: [{ name: 'WagmiMintExample', address: timeoutAddress }],
    }).contracts(),
  ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid API Key"')
})
