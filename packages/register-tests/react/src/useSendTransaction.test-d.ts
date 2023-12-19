import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useSendTransaction } from 'wagmi'
import { celo, mainnet, optimism } from 'wagmi/chains'
import { type ChainId } from './config.js'

test('chain formatters', () => {
  const { sendTransaction } = useSendTransaction()

  sendTransaction(
    {
      to: '0x',
      feeCurrency: '0x',
      gatewayFee: 123n,
      gatewayFeeRecipient: '0x',
    },
    {
      onSuccess(_data, variables) {
        expectTypeOf(variables.chainId).toEqualTypeOf<ChainId | undefined>()
      },
    },
  )

  type Result = Parameters<typeof sendTransaction<typeof celo.id>>[0]
  expectTypeOf<Result['feeCurrency']>().toEqualTypeOf<
    `0x${string}` | undefined
  >()
  expectTypeOf<Result['gatewayFee']>().toEqualTypeOf<bigint | undefined>()
  expectTypeOf<Result['gatewayFeeRecipient']>().toEqualTypeOf<
    `0x${string}` | undefined
  >()
  sendTransaction({
    chainId: celo.id,
    to: '0x',
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  sendTransaction({
    chainId: mainnet.id,
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  sendTransaction({
    chainId: optimism.id,
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })
})

test('parameters: config', async () => {
  const { sendTransaction } = useSendTransaction({ config })

  sendTransaction({
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
