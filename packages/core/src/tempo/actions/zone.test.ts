import { connect, disconnect } from '@wagmi/core'
import {
  accounts,
  config,
  queryClient,
  setupToken,
  tempoLocal,
  zoneDepositStatus,
  zoneInfo,
  zoneLocal,
  zonePortalAddress,
  zoneStorage,
} from '@wagmi/test/tempo'
import { Addresses, Storage } from 'viem/tempo'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import * as tokenActions from './token.js'
import * as zoneActions from './zone.js'

const revealTo =
  '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798' as const
let depositToken: Awaited<ReturnType<typeof setupToken>>['token']

beforeAll(async () => {
  ;({ token: depositToken } = await setupToken())
  await disconnect(config).catch(() => {})
})

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

describe('signAuthorizationToken', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const result = await zoneActions.signAuthorizationToken(config, {
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })

    expect(result.token).toBeDefined()
    expect(await zoneStorage.getItem(`auth:token:${zoneLocal.id}`)).toBe(
      result.token,
    )
  })

  test('parameters: storage', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const storage = Storage.memory()
    const result = await zoneActions.signAuthorizationToken(config, {
      chainId: zoneLocal.id,
      expiresAt: Math.floor(Date.now() / 1000) + 300,
      issuedAt: Math.floor(Date.now() / 1000) - 100,
      storage,
    })

    expect(await storage.getItem(`auth:token:${zoneLocal.id}`)).toBe(
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
      chainId: tempoLocal.id,
      token: depositToken,
      zoneId: zoneInfo.zoneId,
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
      chainId: tempoLocal.id,
      token: depositToken,
      zoneId: zoneInfo.zoneId,
    })

    expect(result.receipt.status).toBe('success')
    expect(
      await tokenActions.getAllowance(config, {
        account: accounts[0].address,
        chainId: tempoLocal.id,
        spender: zonePortalAddress,
        token: depositToken,
      }),
    ).toBe(amount)
  })
})

describe('encryptedDeposit', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const hash = await zoneActions.encryptedDeposit(config, {
      amount: 123_000n,
      chainId: tempoLocal.id,
      token: depositToken,
      zoneId: zoneInfo.zoneId,
    })

    expect(hash).toBeDefined()
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
      chainId: tempoLocal.id,
      token: depositToken,
      zoneId: zoneInfo.zoneId,
    })

    expect(result.receipt.status).toBe('success')
    expect(
      await tokenActions.getAllowance(config, {
        account: accounts[0].address,
        chainId: tempoLocal.id,
        spender: zonePortalAddress,
        token: depositToken,
      }),
    ).toBe(amount)
  })
})

describe('requestWithdrawal', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const hash = await zoneActions.requestWithdrawal(config, {
      amount: 123_000n,
      chainId: zoneLocal.id,
      token: zoneInfo.zoneTokens[0],
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
    const result = await zoneActions.requestWithdrawalSync(config, {
      amount,
      chainId: zoneLocal.id,
      token: zoneInfo.zoneTokens[0],
    })

    expect(result.receipt.status).toBe('success')
    expect(
      await tokenActions.getAllowance(config, {
        account: accounts[0].address,
        chainId: zoneLocal.id,
        spender: Addresses.zoneOutbox,
        token: zoneInfo.zoneTokens[0],
      }),
    ).toBe(amount)
  })
})

describe('requestVerifiableWithdrawal', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const hash = await zoneActions.requestVerifiableWithdrawal(config, {
      amount: 123_000n,
      chainId: zoneLocal.id,
      revealTo,
      token: zoneInfo.zoneTokens[0],
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
    const result = await zoneActions.requestVerifiableWithdrawalSync(config, {
      amount,
      chainId: zoneLocal.id,
      revealTo,
      token: zoneInfo.zoneTokens[0],
    })

    expect(result.receipt.status).toBe('success')
    expect(
      await tokenActions.getAllowance(config, {
        account: accounts[0].address,
        chainId: zoneLocal.id,
        spender: Addresses.zoneOutbox,
        token: zoneInfo.zoneTokens[0],
      }),
    ).toBe(amount)
  })
})

describe('getZoneInfo', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })

    expect(
      await zoneActions.getZoneInfo(config, {
        chainId: zoneLocal.id,
      }),
    ).toEqual(zoneInfo)
  })

  test('queryOptions', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })

    expect(
      await queryClient.fetchQuery(
        zoneActions.getZoneInfo.queryOptions(config, {
          chainId: zoneLocal.id,
        }),
      ),
    ).toEqual(zoneInfo)
  })
})

describe('getAuthorizationTokenInfo', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneLocal.id,
      expiresAt: 1_700_000_000,
      storage: zoneStorage,
    })

    expect(
      await zoneActions.getAuthorizationTokenInfo(config, {
        chainId: zoneLocal.id,
      }),
    ).toEqual({
      account: accounts[0].address,
      expiresAt: 1_700_000_000n,
    })
  })

  test('queryOptions', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneLocal.id,
      expiresAt: 1_700_000_000,
      storage: zoneStorage,
    })

    expect(
      await queryClient.fetchQuery(
        zoneActions.getAuthorizationTokenInfo.queryOptions(config, {
          chainId: zoneLocal.id,
        }),
      ),
    ).toEqual({
      account: accounts[0].address,
      expiresAt: 1_700_000_000n,
    })
  })
})

describe('getDepositStatus', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })

    expect(
      await zoneActions.getDepositStatus(config, {
        chainId: zoneLocal.id,
        tempoBlockNumber: zoneDepositStatus.tempoBlockNumber,
      }),
    ).toEqual(zoneDepositStatus)
  })

  test('queryOptions', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    await zoneActions.signAuthorizationToken(config, {
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })

    expect(
      await queryClient.fetchQuery(
        zoneActions.getDepositStatus.queryOptions(config, {
          chainId: zoneLocal.id,
          tempoBlockNumber: zoneDepositStatus.tempoBlockNumber,
        }),
      ),
    ).toEqual(zoneDepositStatus)
  })
})

describe('getWithdrawalFee', () => {
  test('default', async () => {
    expect(
      await zoneActions.getWithdrawalFee(config, {
        chainId: zoneLocal.id,
      }),
    ).toBe(1_000n)
  })

  test('parameters: gas', async () => {
    expect(
      await zoneActions.getWithdrawalFee(config, {
        chainId: zoneLocal.id,
        gas: 21_000n,
      }),
    ).toBe(22_000n)
  })

  test('queryOptions', async () => {
    expect(
      await queryClient.fetchQuery(
        zoneActions.getWithdrawalFee.queryOptions(config, {
          chainId: zoneLocal.id,
          gas: 21_000n,
        }),
      ),
    ).toBe(22_000n)
  })
})
