import { abi, config } from '@wagmi/test'
import { type Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { celo, mainnet, optimism } from 'wagmi/chains'
import { createUseWriteContract } from 'wagmi/codegen'

const useWriteErc20 = createUseWriteContract({
  abi: abi.erc20,
})

test('chain formatters', () => {
  const { writeContract } = useWriteErc20()
  const shared = {
    address: '0x',
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
  } as const

  writeContract({
    ...shared,
    feeCurrency: '0x',
  })

  type Result = Parameters<
    typeof writeContract<
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
  writeContract({
    ...shared,
    chainId: celo.id,
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  writeContract({
    ...shared,
    chainId: mainnet.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  writeContract({
    ...shared,
    chainId: optimism.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })
})

test('parameters: config', async () => {
  const { writeContract } = useWriteErc20({ config })

  writeContract({
    address: '0x',
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
