import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { blockExplorer } from './blockExplorer'
import {
  address,
  apiKey,
  baseUrl,
  handlers,
  unverifiedContractAddress,
} from './fetch.test'

const server = setupServer(...handlers)

describe('blockExplorer', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  describe('contracts', () => {
    it('fetches ABI', async () => {
      await expect(
        blockExplorer({
          apiKey,
          baseUrl,
          contracts: [{ name: 'WagmiMintExample', address }],
        }).contracts!(),
      ).resolves.toMatchSnapshot()
    })

    it('fetches ABI with multichain deployment', async () => {
      await expect(
        blockExplorer({
          apiKey,
          baseUrl,
          contracts: [
            { name: 'WagmiMintExample', address: { 1: address, 10: address } },
          ],
        }).contracts(),
      ).resolves.toMatchSnapshot()
    })

    it('fails to fetch for unverified contract', async () => {
      await expect(
        blockExplorer({
          apiKey,
          baseUrl,
          contracts: [
            { name: 'WagmiMintExample', address: unverifiedContractAddress },
          ],
        }).contracts(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Contract source code not verified"',
      )
    })
  })
})
