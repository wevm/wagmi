import { connect, disconnect } from '@wagmi/core'
import { parseUnits } from 'viem'
import { Actions, Addresses } from 'viem/tempo'
import { beforeAll, beforeEach, vi } from 'vitest'
import { accounts, config } from './config.js'

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
  // Temporarily restore real Date.now so viem calculates a valid validBefore timestamp.
  if ((Date.now as any).mockRestore) (Date.now as any).mockRestore()
  await Promise.all(
    [1n, 2n, 3n].map((id) =>
      Actions.amm.mintSync(client, {
        account: accounts[0],
        feeToken: Addresses.pathUsd,
        nonceKey: 'expiring',
        userTokenAddress: id,
        validatorTokenAddress: Addresses.pathUsd,
        validatorTokenAmount: parseUnits('1000', 6),
        to: accounts[0].address,
      }),
    ),
  )
  vi.spyOn(Date, 'now').mockReturnValue(
    new Date(Date.UTC(2023, 1, 1)).valueOf(),
  )

  await disconnect(config).catch(() => {})
})

beforeEach(async () => {
  await disconnect(config).catch(() => {})
  // Make dates stable across runs (set here so it doesn't affect beforeAll setup)
  vi.spyOn(Date, 'now').mockReturnValue(
    new Date(Date.UTC(2023, 1, 1)).valueOf(),
  )
})

vi.mock('../src/version.ts', () => {
  return { version: 'x.y.z' }
})

vi.mock('../../core/src/version.ts', () => {
  return { version: 'x.y.z' }
})
