import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'

import {
  address,
  apiKey,
  getHandlers,
  unverifiedContractAddress,
} from '../../test/utils.js'
import { blockExplorer } from './blockExplorer.js'

const baseUrl = 'https://api.etherscan.io/v2/api'
const server = setupServer(...getHandlers(baseUrl))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetches ABI', async () => {
  await expect(
    blockExplorer({
      apiKey,
      baseUrl,
      contracts: [{ name: 'WagmiMintExample', address }],
    }).contracts!(),
  ).resolves.toMatchSnapshot()
})

test('fetches ABI with multichain deployment', async () => {
  await expect(
    blockExplorer({
      apiKey,
      baseUrl,
      contracts: [
        { name: 'WagmiMintExample', address: { 1: address, 10: address } },
      ],
    }).contracts?.(),
  ).resolves.toMatchSnapshot()
})

test('fails to fetch for unverified contract', async () => {
  await expect(
    blockExplorer({
      apiKey,
      baseUrl,
      contracts: [
        { name: 'WagmiMintExample', address: unverifiedContractAddress },
      ],
    }).contracts?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[Error: Contract source code not verified]',
  )
})
