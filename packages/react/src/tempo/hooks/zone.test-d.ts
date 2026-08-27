import { createConfig, http } from '@wagmi/core'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import {
  useDeposit,
  useDepositSync,
  useEncryptedDeposit,
  useEncryptedDepositSync,
  useRequestVerifiableWithdrawal,
  useRequestVerifiableWithdrawalSync,
  useRequestWithdrawal,
  useRequestWithdrawalSync,
} from './zone.js'

const zoneChain = defineChain({
  ...tempoLocalnet,
  id: 4_217_000_007,
  name: 'Zone B',
  rpcUrls: {
    default: { http: ['https://rpc-zone-b.testnet.tempo.xyz'] },
  },
  sourceId: tempoLocalnet.id,
  supportsTransactionReplacementDetection: false,
})
const revealTo =
  '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
const token = '0x20c0000000000000000000000000000000000001'

const config = createConfig({
  chains: [tempoLocalnet, zoneChain],
  transports: {
    [tempoLocalnet.id]: http(),
    [zoneChain.id]: http(),
  },
})

test('deposit variables', () => {
  const deposit = useDeposit({ config })

  deposit.mutate({
    amount: 1_000_000n,
    chainId: tempoLocalnet.id,
    token,
    zoneId: 7,
  })

  expectTypeOf(deposit.variables).toExtend<
    | {
        account?: unknown
        amount: bigint
        chainId?: number | undefined
        token: unknown
        zoneId: number
      }
    | undefined
  >()
})

test('depositSync variables', () => {
  const deposit = useDepositSync({ config })

  deposit.mutate({
    amount: 1_000_000n,
    chainId: tempoLocalnet.id,
    token,
    zoneId: 7,
  })

  expectTypeOf(deposit.variables).toExtend<
    | {
        account?: unknown
        amount: bigint
        chainId?: number | undefined
        token: unknown
        zoneId: number
      }
    | undefined
  >()
})

test('encryptedDeposit variables', () => {
  const deposit = useEncryptedDeposit({ config })

  deposit.mutate({
    amount: 1_000_000n,
    chainId: tempoLocalnet.id,
    token,
    zoneId: 7,
  })

  expectTypeOf(deposit.variables).toExtend<
    | {
        account?: unknown
        amount: bigint
        chainId?: number | undefined
        token: unknown
        zoneId: number
      }
    | undefined
  >()
})

test('encryptedDepositSync variables', () => {
  const deposit = useEncryptedDepositSync({ config })

  deposit.mutate({
    amount: 1_000_000n,
    chainId: tempoLocalnet.id,
    token,
    zoneId: 7,
  })

  expectTypeOf(deposit.variables).toExtend<
    | {
        account?: unknown
        amount: bigint
        chainId?: number | undefined
        token: unknown
        zoneId: number
      }
    | undefined
  >()
})

test('requestWithdrawal variables', () => {
  const withdraw = useRequestWithdrawal({ config })

  withdraw.mutate({
    amount: 1_000_000n,
    chainId: zoneChain.id,
    token,
  })

  expectTypeOf(withdraw.variables).toExtend<
    | {
        account?: unknown
        amount: bigint
        chainId?: number | undefined
        token: unknown
      }
    | undefined
  >()
})

test('requestWithdrawalSync variables', () => {
  const withdraw = useRequestWithdrawalSync({ config })

  withdraw.mutate({
    amount: 1_000_000n,
    chainId: zoneChain.id,
    token,
  })

  expectTypeOf(withdraw.variables).toExtend<
    | {
        account?: unknown
        amount: bigint
        chainId?: number | undefined
        token: unknown
      }
    | undefined
  >()
})

test('requestVerifiableWithdrawal variables', () => {
  const withdraw = useRequestVerifiableWithdrawal({ config })

  withdraw.mutate({
    amount: 1_000_000n,
    chainId: zoneChain.id,
    revealTo,
    token,
  })

  expectTypeOf(withdraw.variables).toExtend<
    | {
        account?: unknown
        amount: bigint
        chainId?: number | undefined
        revealTo: unknown
        token: unknown
      }
    | undefined
  >()
})

test('requestVerifiableWithdrawalSync variables', () => {
  const withdraw = useRequestVerifiableWithdrawalSync({ config })

  withdraw.mutate({
    amount: 1_000_000n,
    chainId: zoneChain.id,
    revealTo,
    token,
  })

  expectTypeOf(withdraw.variables).toExtend<
    | {
        account?: unknown
        amount: bigint
        chainId?: number | undefined
        revealTo: unknown
        token: unknown
      }
    | undefined
  >()
})
