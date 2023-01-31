import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { etherscan } from './etherscan'
import {
  address,
  apiKey,
  handlers,
  invalidApiKey,
  timeoutAddress,
  unverifiedContractAddress,
} from './fetch.test'

const server = setupServer(...handlers)

describe('etherscan', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  describe('contracts', () => {
    it('fetches ABI', async () => {
      await expect(
        etherscan({
          apiKey,
          chainId: 1,
          contracts: [{ name: 'WagmiMintExample', address }],
        }).contracts(),
      ).resolves.toMatchSnapshot()
    })

    it('fetches ABI with multichain deployment', async () => {
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

    it('fails to fetch for unverified contract', async () => {
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

    it('missing address for chainId', async () => {
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

    it('invalid api key', async () => {
      await expect(
        etherscan({
          apiKey: invalidApiKey,
          chainId: 1,
          contracts: [{ name: 'WagmiMintExample', address: timeoutAddress }],
        }).contracts(),
      ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid API Key"')
    })
  })
})
