import { abi, config } from '@wagmi/test'
import { useWriteContract } from '@wagmi/vue'
import { celo, mainnet, optimism } from '@wagmi/vue/chains'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

test('chain formatters', () => {
  const { writeContract } = useWriteContract()

  const shared = {
    address: '0x',
    abi: abi.erc20,
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
  writeContract({
    ...shared,
    chainId: celo.id,
    feeCurrency: '0x',
  })

  writeContract({
    ...shared,
    chainId: mainnet.id,
    // @ts-expect-error
    feeCurrency: '0x',
  })

  writeContract({
    ...shared,
    chainId: optimism.id,
    // @ts-expect-error
    feeCurrency: '0x',
  })
})

test('parameters: config', async () => {
  const { writeContract } = useWriteContract({ config })

  writeContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
