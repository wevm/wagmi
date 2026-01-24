import { connect, disconnect } from '@wagmi/core'
import { parseUnits } from 'viem'
import { Actions, Addresses } from 'viem/tempo'
import { afterAll, beforeAll, beforeEach, vi } from 'vitest'
import { accounts, config, rpcUrl } from './config.js'

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

beforeAll(async () => {
  await connect(config, {
    connector: config.connectors[0]!,
  })
  const client = config.getClient()

  // Mint liquidity for fee tokens.
  await Promise.all(
    [1n, 2n, 3n].map((id) =>
      Actions.amm.mintSync(client, {
        account: accounts[0],
        feeToken: Addresses.pathUsd,
        nonceKey: 'random',
        userTokenAddress: id,
        validatorTokenAddress: Addresses.pathUsd,
        validatorTokenAmount: parseUnits('1000', 6),
        to: accounts[0].address,
      }),
    ),
  )

  await disconnect(config).catch(() => {})
})

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

afterAll(async () => {
  await fetch(`${rpcUrl}/stop`)
})

vi.mock('../src/version.ts', () => {
  return { version: 'x.y.z' }
})

vi.mock('../../core/src/version.ts', () => {
  return { version: 'x.y.z' }
})

// Make dates stable across runs
Date.now = vi.fn(() => new Date(Date.UTC(2023, 1, 1)).valueOf())
