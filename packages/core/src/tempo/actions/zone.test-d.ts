import { http } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { zone, http as zoneHttp } from 'viem/tempo/zones'
import { expectTypeOf, test } from 'vitest'
import { createConfig } from '../../createConfig.js'
import * as zoneActions from './zone.js'

const zoneChain = zone(7)
const revealTo =
  '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
const token = '0x20c0000000000000000000000000000000000001'

const config = createConfig({
  chains: [tempoLocalnet, zoneChain],
  transports: {
    [tempoLocalnet.id]: http(),
    [zoneChain.id]: zoneHttp(),
  },
})

test('deposit parameters', () => {
  zoneActions.deposit(config, {
    amount: 1_000_000n,
    chainId: tempoLocalnet.id,
    token,
    zoneId: 7,
  })

  expectTypeOf<zoneActions.deposit.Parameters<typeof config>>().toMatchTypeOf<{
    account?: unknown
    amount: bigint
    chainId?: number | undefined
    token: unknown
    zoneId: number
  }>()
})

test('depositSync parameters', () => {
  zoneActions.depositSync(config, {
    amount: 1_000_000n,
    chainId: tempoLocalnet.id,
    token,
    zoneId: 7,
  })

  expectTypeOf<
    zoneActions.depositSync.Parameters<typeof config>
  >().toMatchTypeOf<{
    account?: unknown
    amount: bigint
    chainId?: number | undefined
    token: unknown
    zoneId: number
  }>()
})

test('encryptedDeposit parameters', () => {
  zoneActions.encryptedDeposit(config, {
    amount: 1_000_000n,
    chainId: tempoLocalnet.id,
    token,
    zoneId: 7,
  })

  expectTypeOf<
    zoneActions.encryptedDeposit.Parameters<typeof config>
  >().toMatchTypeOf<{
    account?: unknown
    amount: bigint
    chainId?: number | undefined
    token: unknown
    zoneId: number
  }>()
})

test('encryptedDepositSync parameters', () => {
  zoneActions.encryptedDepositSync(config, {
    amount: 1_000_000n,
    chainId: tempoLocalnet.id,
    token,
    zoneId: 7,
  })

  expectTypeOf<
    zoneActions.encryptedDepositSync.Parameters<typeof config>
  >().toMatchTypeOf<{
    account?: unknown
    amount: bigint
    chainId?: number | undefined
    token: unknown
    zoneId: number
  }>()
})

test('requestWithdrawal parameters', () => {
  zoneActions.requestWithdrawal(config, {
    amount: 1_000_000n,
    chainId: zoneChain.id,
    token,
  })

  expectTypeOf<
    zoneActions.requestWithdrawal.Parameters<typeof config>
  >().toMatchTypeOf<{
    account?: unknown
    amount: bigint
    chainId?: number | undefined
    token: unknown
  }>()
})

test('requestWithdrawalSync parameters', () => {
  zoneActions.requestWithdrawalSync(config, {
    amount: 1_000_000n,
    chainId: zoneChain.id,
    token,
  })

  expectTypeOf<
    zoneActions.requestWithdrawalSync.Parameters<typeof config>
  >().toMatchTypeOf<{
    account?: unknown
    amount: bigint
    chainId?: number | undefined
    token: unknown
  }>()
})

test('requestVerifiableWithdrawal parameters', () => {
  zoneActions.requestVerifiableWithdrawal(config, {
    amount: 1_000_000n,
    chainId: zoneChain.id,
    revealTo,
    token,
  })

  expectTypeOf<
    zoneActions.requestVerifiableWithdrawal.Parameters<typeof config>
  >().toMatchTypeOf<{
    account?: unknown
    amount: bigint
    chainId?: number | undefined
    revealTo: unknown
    token: unknown
  }>()
})

test('requestVerifiableWithdrawalSync parameters', () => {
  zoneActions.requestVerifiableWithdrawalSync(config, {
    amount: 1_000_000n,
    chainId: zoneChain.id,
    revealTo,
    token,
  })

  expectTypeOf<
    zoneActions.requestVerifiableWithdrawalSync.Parameters<typeof config>
  >().toMatchTypeOf<{
    account?: unknown
    amount: bigint
    chainId?: number | undefined
    revealTo: unknown
    token: unknown
  }>()
})
