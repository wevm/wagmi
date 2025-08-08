import { mkdir, rm } from 'node:fs/promises'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'

import {
  address,
  apiKey,
  getHandlers,
  invalidApiKey,
  proxyAddress,
  timeoutAddress,
  unverifiedContractAddress,
} from '../../test/utils.js'
import { getCacheDir } from './fetch.js'
import { routescan } from './routescan.js'

const server = setupServer(...getHandlers('https://api.routescan.io/v2/api'))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetches ABI', async () => {
  await expect(
    routescan({
      apiKey,
      chainId: 1,
      contracts: [{ name: 'WagmiMintExample', address }],
    }).contracts?.(),
  ).resolves.toMatchSnapshot()
})

test('fetches ABI with multichain deployment', async () => {
  await expect(
    routescan({
      apiKey,
      chainId: 1,
      contracts: [
        { name: 'WagmiMintExample', address: { 1: address, 10: address } },
      ],
    }).contracts?.(),
  ).resolves.toMatchSnapshot()
})

test('fails to fetch for unverified contract', async () => {
  await expect(
    routescan({
      apiKey,
      chainId: 1,
      contracts: [
        { name: 'WagmiMintExample', address: unverifiedContractAddress },
      ],
    }).contracts?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[Error: Contract source code not verified]',
  )
})

test('missing address for chainId', async () => {
  await expect(
    routescan({
      apiKey,
      chainId: 1,
      // @ts-expect-error `chainId` and `keyof typeof contracts[number].address` mismatch
      contracts: [{ name: 'WagmiMintExample', address: { 10: address } }],
    }).contracts?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: No address found for chainId "1". Make sure chainId "1" is set as an address.]`,
  )
})

test('invalid api key', async () => {
  await expect(
    routescan({
      apiKey: invalidApiKey,
      chainId: 1,
      contracts: [{ name: 'WagmiMintExample', address: timeoutAddress }],
    }).contracts?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot('[Error: Invalid API Key]')
})

test('tryFetchProxyImplementation: fetches ABI', async () => {
  const cacheDir = getCacheDir()
  await mkdir(cacheDir, { recursive: true })

  await expect(
    routescan({
      apiKey,
      chainId: 1,
      contracts: [{ name: 'WagmiMintExample', address }],
      tryFetchProxyImplementation: true,
    }).contracts?.(),
  ).resolves.toMatchSnapshot()

  await rm(cacheDir, { recursive: true })
})

test('tryFetchProxyImplementation: fetches implementation ABI', async () => {
  const cacheDir = getCacheDir()
  await mkdir(cacheDir, { recursive: true })

  await expect(
    routescan({
      apiKey,
      chainId: 1,
      contracts: [{ name: 'FiatToken', address: proxyAddress }],
      tryFetchProxyImplementation: true,
    }).contracts?.(),
  ).resolves.toMatchSnapshot()

  await rm(cacheDir, { recursive: true })
})
