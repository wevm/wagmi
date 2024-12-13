import { mkdir, rm, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'

import {
  address,
  apiKey,
  baseUrl,
  handlers,
  timeoutAddress,
  unverifiedContractAddress,
} from '../../test/utils.js'
import { fetch } from './fetch.js'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

type Fetch = Parameters<typeof fetch>[0]
const request: Fetch['request'] = ({ address }) => {
  return {
    url: `${baseUrl}?module=contract&action=getabi&address=${address}&apikey=${apiKey}`,
  }
}
const parse: Fetch['parse'] = async ({ response }) => {
  const data = (await response.json()) as
    | { status: '1'; message: 'OK'; result: string }
    | { status: '0'; message: 'NOTOK'; result: string }
  if (data.status === '0') throw new Error(data.result)
  return JSON.parse(data.result)
}

test('fetches ABI', () => {
  expect(
    fetch({
      contracts: [{ name: 'WagmiMintExample', address }],
      request,
      parse,
    }).contracts?.(),
  ).resolves.toMatchSnapshot()
})

test('fails to fetch for unverified contract', () => {
  expect(
    fetch({
      contracts: [
        { name: 'WagmiMintExample', address: unverifiedContractAddress },
      ],
      request,
      parse,
    }).contracts?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[Error: Contract source code not verified]',
  )
})

test('aborts request', () => {
  expect(
    fetch({
      contracts: [{ name: 'WagmiMintExample', address: timeoutAddress }],
      request,
      parse,
      timeoutDuration: 1_000,
    }).contracts?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[AbortError: This operation was aborted]',
  )
})

test('reads from cache', async () => {
  const cacheDir = `${homedir}/.wagmi-cli/plugins/fetch/cache`
  await mkdir(cacheDir, { recursive: true })

  const contract = {
    name: 'WagmiMintExample',
    address: timeoutAddress,
  } as const
  const cacheKey = JSON.stringify(contract)
  const cacheFilePath = `${cacheDir}/${cacheKey}.json`
  await writeFile(
    cacheFilePath,
    JSON.stringify(
      {
        abi: [
          {
            inputs: [],
            name: 'mint',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        timestamp: Date.now() + 30_000,
      },
      null,
      2,
    ),
  )

  await expect(
    fetch({
      contracts: [contract],
      request,
      parse,
    }).contracts?.(),
  ).resolves.toMatchInlineSnapshot(`
      [
        {
          "abi": [
            {
              "inputs": [],
              "name": "mint",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
          "name": "WagmiMintExample",
        },
      ]
    `)

  await rm(cacheDir, { recursive: true })
})

test('fails and reads from cache', async () => {
  const cacheDir = `${homedir}/.wagmi-cli/plugins/fetch/cache`
  await mkdir(cacheDir, { recursive: true })

  const contract = {
    name: 'WagmiMintExample',
    address: timeoutAddress,
  } as const
  const cacheKey = JSON.stringify(contract)
  const cacheFilePath = `${cacheDir}/${cacheKey}.json`
  await writeFile(
    cacheFilePath,
    JSON.stringify(
      {
        abi: [
          {
            inputs: [],
            name: 'mint',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        timestamp: Date.now() - 30_000,
      },
      null,
      2,
    ),
  )

  await expect(
    fetch({
      contracts: [contract],
      request,
      parse,
      timeoutDuration: 1,
    }).contracts?.(),
  ).resolves.toMatchInlineSnapshot(`
      [
        {
          "abi": [
            {
              "inputs": [],
              "name": "mint",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
          "name": "WagmiMintExample",
        },
      ]
    `)

  await rm(cacheDir, { recursive: true })
})
