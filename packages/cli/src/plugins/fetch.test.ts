import { default as fs } from 'fs-extra'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'

import { homedir } from 'os'
import { fetch } from './fetch.js'

export const baseUrl = 'https://api.etherscan.io/api'
export const apiKey = 'abc'
export const invalidApiKey = 'xyz'
export const address = '0xaf0326d92b97df1221759476b072abfd8084f9be'
export const unverifiedContractAddress =
  '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
export const timeoutAddress = '0xecb504d39723b0be0e3a9aa33d646642d1051ee1'

export const handlers = [
  rest.get(baseUrl, async (req, res, ctx) => {
    switch (req.url.search) {
      case `?module=contract&action=getabi&address=${unverifiedContractAddress}&apikey=${apiKey}`:
        return res(
          ctx.status(200),
          ctx.json({
            status: '0',
            message: 'NOTOK',
            result: 'Contract source code not verified',
          }),
        )
      case `?module=contract&action=getabi&address=${timeoutAddress}&apikey=${invalidApiKey}`:
        return res(
          ctx.status(200),
          ctx.json({
            status: '0',
            message: 'NOTOK',
            result: 'Invalid API Key',
          }),
        )
      case `?module=contract&action=getabi&address=${address}&apikey=${apiKey}`:
        return res(
          ctx.status(200),
          ctx.json({
            status: '1',
            message: 'OK',
            result:
              '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
          }),
        )
      case `?module=contract&action=getabi&address=${timeoutAddress}&apikey=${apiKey}`:
        // TODO: Add back in once msw supports aborting native fetch requests
        // https://github.com/mswjs/msw/issues/1701
        // await new Promise((resolve) => setTimeout(resolve, 10_000))
        // return res(ctx.status(200), ctx.json({}))
        throw new Error('The operation was aborted.')
      default:
        throw new Error(`Unhandled request: ${req.url.search}`)
    }
  }),
]

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

test('fetches ABI', async () => {
  await expect(
    fetch({
      contracts: [{ name: 'WagmiMintExample', address }],
      request,
      parse,
    }).contracts(),
  ).resolves.toMatchSnapshot()
})

test('fails to fetch for unverified contract', async () => {
  await expect(
    fetch({
      contracts: [
        { name: 'WagmiMintExample', address: unverifiedContractAddress },
      ],
      request,
      parse,
    }).contracts(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '"Contract source code not verified"',
  )
})

test('aborts request', async () => {
  await expect(
    fetch({
      contracts: [{ name: 'WagmiMintExample', address: timeoutAddress }],
      request,
      parse,
      timeoutDuration: 1,
    }).contracts(),
  ).rejects.toThrowErrorMatchingInlineSnapshot('"Failed to fetch"')
})

test('reads from cache', async () => {
  const cacheDir = `${homedir}/.wagmi-cli/plugins/fetch/cache`
  await fs.ensureDir(cacheDir)

  const contract = {
    name: 'WagmiMintExample',
    address: timeoutAddress,
  } as const
  const cacheKey = JSON.stringify(contract)
  const cacheFilePath = `${cacheDir}/${cacheKey}.json`
  await fs.writeJSON(cacheFilePath, {
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
  })

  await expect(
    fetch({
      contracts: [contract],
      request,
      parse,
    }).contracts(),
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

  await fs.rm(cacheDir, { recursive: true })
})

test('fails and reads from cache', async () => {
  const cacheDir = `${homedir}/.wagmi-cli/plugins/fetch/cache`
  await fs.ensureDir(cacheDir)

  const contract = {
    name: 'WagmiMintExample',
    address: timeoutAddress,
  } as const
  const cacheKey = JSON.stringify(contract)
  const cacheFilePath = `${cacheDir}/${cacheKey}.json`
  await fs.writeJSON(cacheFilePath, {
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
  })

  await expect(
    fetch({
      contracts: [contract],
      request,
      parse,
      timeoutDuration: 1,
    }).contracts(),
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

  await fs.rm(cacheDir, { recursive: true })
})
