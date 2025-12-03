import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useSendTransaction } from 'wagmi'
import { celo, mainnet, optimism } from 'wagmi/chains'
import type { ChainId } from './config.js'

test('chain formatters', () => {
  const { mutate } = useSendTransaction()

  mutate(
    {
      to: '0x',
      feeCurrency: '0x',
    },
    {
      onSuccess(_data, variables) {
        expectTypeOf(variables.chainId).toEqualTypeOf<ChainId | undefined>()
      },
    },
  )

  type Result = Parameters<typeof mutate<typeof celo.id>>[0]
  expectTypeOf<Result['feeCurrency']>().toEqualTypeOf<
    `0x${string}` | undefined
  >()
  mutate({
    chainId: celo.id,
    to: '0x',
    feeCurrency: '0x',
  })

  mutate({
    chainId: mainnet.id,
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
  })

  mutate({
    chainId: optimism.id,
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
  })
})

test('parameters: config', async () => {
  const { mutate } = useSendTransaction({ config })

  mutate({
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
