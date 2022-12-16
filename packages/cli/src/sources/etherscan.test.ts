import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { etherscan } from './etherscan'
import {
  address,
  apiKey,
  handlers,
  unverifiedContractAddress,
} from './fetch.test'

const server = setupServer(...handlers)

describe('etherscan', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('fetches ABI', async () => {
    expect(
      etherscan({
        apiKey,
        chainId: 1,
        contracts: [{ name: 'WagmiMintExample', address }],
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
})
