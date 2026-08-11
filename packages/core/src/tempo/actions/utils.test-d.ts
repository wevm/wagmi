import { expectTypeOf, test } from 'vitest'
import type { OptionalTransactionOverrides } from './utils.js'

test('OptionalTransactionOverrides', () => {
  type Parameters = OptionalTransactionOverrides<{
    account: `0x${string}`
    amount: bigint
    gas: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas: bigint
    nonce: number
    to: `0x${string}`
  }>

  expectTypeOf<Parameters>().toExtend<{
    account?: `0x${string}` | undefined
    amount: bigint
    gas?: bigint | undefined
    maxFeePerGas?: bigint | undefined
    maxPriorityFeePerGas?: bigint | undefined
    nonce?: number | undefined
    to: `0x${string}`
  }>()

  void ({
    account: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    amount: 1_000_000n,
    gas: 21_000n,
    maxFeePerGas: 1_000_000n,
    maxPriorityFeePerGas: 1_000_000n,
    nonce: 1,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  } satisfies Parameters)

  void ({
    amount: 1_000_000n,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  } satisfies Parameters)

  void ({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    // @ts-expect-error required non-override parameters stay required
  } satisfies Parameters)

  void ({
    amount: 1_000_000n,
    // @ts-expect-error excess parameters stay rejected
    extra: true,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  } satisfies Parameters)
})
