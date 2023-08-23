import { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useContractWrite } from 'wagmi'
import { celo, mainnet, optimism } from 'wagmi/chains'

test('chain formatters', () => {
  const { write } = useContractWrite()

  const shared = {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
  } as const

  write({
    ...shared,
    feeCurrency: '0x',
  })

  type Result = Parameters<
    typeof write<
      typeof abi.erc20,
      'transferFrom',
      [Address, Address, bigint],
      typeof celo.id
    >
  >[0]
  expectTypeOf<Result['feeCurrency']>().toEqualTypeOf<
    `0x${string}` | undefined
  >()
  expectTypeOf<Result['gatewayFee']>().toEqualTypeOf<bigint | undefined>()
  expectTypeOf<Result['gatewayFeeRecipient']>().toEqualTypeOf<
    `0x${string}` | undefined
  >()
  write({
    ...shared,
    chainId: celo.id,
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  write({
    ...shared,
    chainId: mainnet.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  write({
    ...shared,
    chainId: optimism.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })
})
