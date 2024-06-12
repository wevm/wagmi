import { abi, bytecode, config } from '@wagmi/test'
import { http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type DeployContractParameters,
  deployContract,
} from './deployContract.js'

test('default', async () => {
  await deployContract(config, {
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    chainId: mainnet.id,
  })
})

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = DeployContractParameters<typeof abi.bayc, typeof config>
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  deployContract(config, {
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    feeCurrency: '0x',
  })

  type Result2 = DeployContractParameters<
    typeof abi.bayc,
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  deployContract(config, {
    chainId: celo.id,
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    feeCurrency: '0x',
  })

  type Result3 = DeployContractParameters<
    typeof abi.bayc,
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  deployContract(config, {
    chainId: mainnet.id,
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
