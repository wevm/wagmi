import { config as testConfig } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { usePrepareTransactionRequest } from 'wagmi'
import { celo, mainnet, optimism } from 'wagmi/chains'

test('chain formatters', () => {
  const { data } = usePrepareTransactionRequest({
    feeCurrency: '0x',
  })
  if (data && data.chainId === celo.id) {
    expectTypeOf(data.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()
  }

  const { data: data2 } = usePrepareTransactionRequest({
    chainId: celo.id,
    feeCurrency: '0x',
  })
  if (data2) {
    expectTypeOf(data2.chainId).toEqualTypeOf(celo.id)
    expectTypeOf(data2.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()
  }

  usePrepareTransactionRequest({
    chainId: mainnet.id,
    // @ts-expect-error
    feeCurrency: '0x',
  })

  usePrepareTransactionRequest({
    chainId: optimism.id,
    // @ts-expect-error
    feeCurrency: '0x',
  })
})

test('parameters: config', async () => {
  usePrepareTransactionRequest({
    config: testConfig,
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
