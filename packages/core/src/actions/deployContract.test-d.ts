import { abi, bytecode, config } from '@wagmi/test'
import { http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { celo, mainnet, tempoLocalnet } from 'viem/chains'
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

test('tempo feePayer', () => {
  const feePayer = privateKeyToAccount(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
  )

  const tempoConfig = createConfig({
    chains: [tempoLocalnet],
    transports: { [tempoLocalnet.id]: http() },
  })

  deployContract(tempoConfig, {
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    feePayer: true,
  })

  deployContract(tempoConfig, {
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    feePayer,
  })

  const config = createConfig({
    chains: [mainnet, tempoLocalnet],
    transports: { [mainnet.id]: http(), [tempoLocalnet.id]: http() },
  })

  deployContract(config, {
    chainId: tempoLocalnet.id,
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    feePayer: true,
  })

  deployContract(config, {
    chainId: tempoLocalnet.id,
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    feePayer,
  })

  deployContract(config, {
    chainId: mainnet.id,
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    // @ts-expect-error
    feePayer: true,
  })

  type Result = DeployContractParameters<
    typeof abi.bayc,
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result>().not.toMatchTypeOf<{
    feePayer?: true | typeof feePayer | undefined
  }>()
})
