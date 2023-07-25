import { expectTypeOf, test } from 'vitest'
import { useSendTransaction } from 'wagmi'
import { celo, mainnet, optimism } from 'wagmi/chains'

test('chain formatters', () => {
  const { sendTransaction } = useSendTransaction()

  sendTransaction({
    to: '0x',
    feeCurrency: '0x',
  })

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
  })

  sendTransaction({
    chainId: mainnet.id,
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
  })

  sendTransaction({
    chainId: optimism.id,
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
