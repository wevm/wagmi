import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import type { SourceFn } from '../config'
import { etherscan } from './etherscan'

const apiKey = 'abc'
const address = '0xaf0326d92b97df1221759476b072abfd8084f9be'
const unverifiedContractAddress = '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'

const handlers = [
  rest.get('https://api.etherscan.io/api', (req, res, ctx) => {
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
    }
  }),
]

const server = setupServer(...handlers)

describe('etherscan', () => {
  it('creates etherscan source', () => {
    expect(etherscan({ apiKey, chainId: 1 })).toBeDefined()
  })

  describe('calls', () => {
    let source: SourceFn
    beforeEach(() => {
      source = etherscan({ apiKey, chainId: 1 })
    })

    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close())

    it('fetches ABI', async () => {
      const abi = await source({ address })
      expect(abi).toMatchSnapshot()
    })

    it('fails to fetch for unverified contract', async () => {
      await expect(
        source({ address: unverifiedContractAddress }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Contract source code not verified"',
      )
    })

    it('throws when chainId is not in deployment addresses', async () => {
      await expect(
        etherscan({ apiKey, chainId: 10 })({
          address: {
            1: '0x314159265dd8dbb310642f98f50c066173c1259b',
            5: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
          },
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"No contract address found for chainId \\"10\\""',
      )
    })
  })
})
