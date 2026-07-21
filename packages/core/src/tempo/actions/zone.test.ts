import { connect, disconnect } from '@wagmi/core'
import { accounts } from '@wagmi/test/tempo'
import {
  authorize,
  config,
  context,
  parentChain,
  portalAddress,
  queryClient,
  setupZoneBalance,
  zoneChain,
  zoneId,
  zoneStorage,
} from '@wagmi/test/tempo/zone'
import { Actions, Addresses, Storage } from 'viem/tempo'
import { beforeEach, describe, expect, test } from 'vitest'
import * as zoneActions from './zone.js'

const revealTo =
  '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798' as const
const depositToken = Addresses.pathUsd

async function getPreparedEncryptedDeposit() {
  return Actions.zone.encryptedDeposit.prepare(
    config.getClient({ chainId: parentChain.id }),
    {
      amount: 123_000n,
      bouncebackRecipient: accounts[0].address,
      portalAddress,
      recipient: accounts[0].address,
      token: depositToken,
      zoneId,
    },
  )
}

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

describe('signAuthorizationToken', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const result = await zoneActions.signAuthorizationToken(config, {
      chainId: zoneChain.id,
      storage: zoneStorage,
      zoneId,
    })

    expect(result.token).toBeDefined()
    expect(await zoneStorage.getItem(`auth:token:${zoneChain.id}`)).toBe(
      result.token,
    )
  })

  test('parameters: storage', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const storage = Storage.memory()
    const result = await zoneActions.signAuthorizationToken(config, {
      chainId: zoneChain.id,
      expiresAt: Math.floor(Date.now() / 1000) + 300,
      issuedAt: Math.floor(Date.now() / 1000) - 100,
      storage,
      zoneId,
    })

    expect(await storage.getItem(`auth:token:${zoneChain.id}`)).toBe(
      result.token,
    )
  })
})

describe('deposit', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const hash = await zoneActions.deposit(config, {
      amount: 123_000n,
      chainId: parentChain.id,
      token: depositToken,
      zoneId,
    })

    expect(hash).toBeDefined()
  })
})

describe('depositSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const amount = 456_000n
    const result = await zoneActions.depositSync(config, {
      amount,
      chainId: parentChain.id,
      token: depositToken,
      zoneId,
    })

    expect(result.receipt.status).toBe('success')
  })
})

describe('encryptedDeposit', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const hash = await zoneActions.encryptedDeposit(config, {
      amount: 123_000n,
      chainId: parentChain.id,
      token: depositToken,
      zoneId,
    })

    expect(hash).toBeDefined()
  })

  test('parameters: prepared encrypted payload', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    expect(
      await zoneActions.encryptedDeposit(
        config,
        await getPreparedEncryptedDeposit(),
      ),
    ).toBeDefined()
  })
})

describe('encryptedDepositSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const amount = 456_000n
    const result = await zoneActions.encryptedDepositSync(config, {
      amount,
      chainId: parentChain.id,
      token: depositToken,
      zoneId,
    })

    expect(result.receipt.status).toBe('success')
  })

  test('parameters: prepared encrypted payload', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    expect(
      await zoneActions.encryptedDepositSync(
        config,
        await getPreparedEncryptedDeposit(),
      ),
    ).toMatchObject({ receipt: { status: 'success' } })
  })
})

describe('requestWithdrawal', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const amount = 123_000n
    const token = await setupZoneBalance(amount)
    const hash = await zoneActions.requestWithdrawal(config, {
      amount,
      chainId: zoneChain.id,
      token,
    })

    expect(hash).toBeDefined()
  })
})

describe('requestWithdrawalSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const amount = 456_000n
    const token = await setupZoneBalance(amount)
    const result = await zoneActions.requestWithdrawalSync(config, {
      amount,
      chainId: zoneChain.id,
      token,
    })

    expect(result.receipt.status).toBe('success')
  })
})

describe('requestVerifiableWithdrawal', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const amount = 123_000n
    const token = await setupZoneBalance(amount)
    const hash = await zoneActions.requestVerifiableWithdrawal(config, {
      amount,
      chainId: zoneChain.id,
      revealTo,
      token,
    })

    expect(hash).toBeDefined()
  })
})

describe('requestVerifiableWithdrawalSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const amount = 456_000n
    const token = await setupZoneBalance(amount)
    const result = await zoneActions.requestVerifiableWithdrawalSync(config, {
      amount,
      chainId: zoneChain.id,
      revealTo,
      token,
    })

    expect(result.receipt.status).toBe('success')
  })
})

describe('getZoneInfo', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneChain.id,
      storage: zoneStorage,
      zoneId,
    })

    const result = await zoneActions.getZoneInfo(config, {
      chainId: zoneChain.id,
    })
    expect(result).toMatchObject({ chainId: context.chainId, zoneId })
    expect(result.zoneTokens.length).toBeGreaterThan(0)
  })

  test('queryOptions', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneChain.id,
      storage: zoneStorage,
      zoneId,
    })

    expect(
      await queryClient.fetchQuery(
        zoneActions.getZoneInfo.queryOptions(config, {
          chainId: zoneChain.id,
        }),
      ),
    ).toMatchObject({ chainId: context.chainId, zoneId })
  })
})

describe('getAuthorizationTokenInfo', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const expiresAt = Math.floor(Date.now() / 1000) + 300
    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneChain.id,
      expiresAt,
      storage: zoneStorage,
      zoneId,
    })

    const result = await zoneActions.getAuthorizationTokenInfo(config, {
      chainId: zoneChain.id,
    })
    expect(result.account.toLowerCase()).toBe(accounts[0].address.toLowerCase())
    expect(result.expiresAt).toBe(BigInt(expiresAt))
  })

  test('queryOptions', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const expiresAt = Math.floor(Date.now() / 1000) + 300
    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneChain.id,
      expiresAt,
      storage: zoneStorage,
      zoneId,
    })

    const result = await queryClient.fetchQuery(
      zoneActions.getAuthorizationTokenInfo.queryOptions(config, {
        chainId: zoneChain.id,
      }),
    )
    expect(result.account.toLowerCase()).toBe(accounts[0].address.toLowerCase())
    expect(result.expiresAt).toBe(BigInt(expiresAt))
  })
})

describe('getWithdrawalFee', () => {
  test('default', async () => {
    await authorize()
    const fee = await zoneActions.getWithdrawalFee(config, {
      chainId: zoneChain.id,
    })
    expect(typeof fee).toBe('bigint')
    expect(fee).toBeGreaterThanOrEqual(0n)
  })

  test('parameters: callbackGas', async () => {
    await authorize()
    const fee = await zoneActions.getWithdrawalFee(config, {
      callbackGas: 21_000n,
      chainId: zoneChain.id,
    })
    expect(fee).toBeGreaterThanOrEqual(0n)
  })

  test('queryOptions', async () => {
    await authorize()
    const fee = await queryClient.fetchQuery(
      zoneActions.getWithdrawalFee.queryOptions(config, {
        callbackGas: 21_000n,
        chainId: zoneChain.id,
      }),
    )
    expect(fee).toBeGreaterThanOrEqual(0n)
  })
})
