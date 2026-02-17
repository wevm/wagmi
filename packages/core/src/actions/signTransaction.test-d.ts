import { config } from '@wagmi/test'
import {
  http,
  parseEther,
  type TransactionSerializedEIP1559,
  type TransactionSerializedEIP2930,
  type TransactionSerializedEIP4844,
  type TransactionSerializedEIP7702,
  type TransactionSerializedLegacy,
} from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import { createConfig } from '../createConfig.js'
import {
  type SignTransactionParameters,
  signTransaction,
} from './signTransaction.js'

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = SignTransactionParameters<typeof config>
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  signTransaction(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })

  type Result2 = SignTransactionParameters<typeof config, typeof celo.id>
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  signTransaction(config, {
    chainId: celo.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    feeCurrency: '0x',
  })

  type Result3 = SignTransactionParameters<typeof config, typeof mainnet.id>
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  signTransaction(config, {
    chainId: mainnet.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
})

test('legacy', () => {
  const signature1 = signTransaction(config, { gasPrice: 0n })
  const signature2 = signTransaction(config, { type: 'legacy' })

  expectTypeOf(signature1).toEqualTypeOf<Promise<TransactionSerializedLegacy>>()
  expectTypeOf(signature2).toEqualTypeOf<Promise<TransactionSerializedLegacy>>()

  // @ts-expect-error
  signTransaction(config, {
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
  })

  // @ts-expect-error
  signTransaction(config, {
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'legacy',
  })
  // @ts-expect-error
  signTransaction(config, {
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'legacy',
  })
})

test('eip7702', () => {
  const signature1 = signTransaction(config, {
    authorizationList: [],
  })
  const signature2 = signTransaction(config, {
    authorizationList: [],
    type: 'eip7702',
  })

  expectTypeOf(signature1).toEqualTypeOf<
    Promise<TransactionSerializedEIP7702>
  >()
  expectTypeOf(signature2).toEqualTypeOf<
    Promise<TransactionSerializedEIP7702>
  >()
})

test('eip4844', () => {
  const signature1 = signTransaction(config, {
    blobVersionedHashes: [],
    maxFeePerBlobGas: 0n,
    to: '0x0000000000000000000000000000000000000000',
  })
  const signature2 = signTransaction(config, {
    blobVersionedHashes: [],
    maxFeePerBlobGas: 0n,
    to: '0x0000000000000000000000000000000000000000',
    type: 'eip4844',
  })

  expectTypeOf(signature1).toEqualTypeOf<
    Promise<TransactionSerializedEIP4844>
  >()
  expectTypeOf(signature2).toEqualTypeOf<
    Promise<TransactionSerializedEIP4844>
  >()
})

test('eip1559', () => {
  const signature1 = signTransaction(config, {
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
  })
  const signature2 = signTransaction(config, {
    type: 'eip1559',
  })

  expectTypeOf(signature1).toEqualTypeOf<
    Promise<TransactionSerializedEIP1559>
  >()
  expectTypeOf(signature2).toEqualTypeOf<
    Promise<TransactionSerializedEIP1559>
  >()

  // @ts-expect-error
  signTransaction(config, {
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
  })

  // @ts-expect-error
  signTransaction(config, {
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'eip1559',
  })
  // @ts-expect-error
  signTransaction(config, {
    gasPrice: 0n,
    type: 'eip1559',
  })
})

test('eip2930', () => {
  const signature1 = signTransaction(config, {
    accessList: [],
    gasPrice: 0n,
  })

  const signature2 = signTransaction(config, {
    type: 'eip2930',
  })

  expectTypeOf(signature1).toEqualTypeOf<
    Promise<TransactionSerializedEIP2930>
  >()
  expectTypeOf(signature2).toEqualTypeOf<
    Promise<TransactionSerializedEIP2930>
  >()

  // @ts-expect-error
  signTransaction(config, {
    accessList: [],
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
  })

  // @ts-expect-error
  signTransaction(config, {
    accessList: [],
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'eip2930',
  })
  // @ts-expect-error
  signTransaction(config, {
    accessList: [],
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'eip2930',
  })
})
