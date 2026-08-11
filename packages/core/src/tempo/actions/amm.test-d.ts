import { createConfig, http } from '@wagmi/core'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { test } from 'vitest'
import * as amm from './amm.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const tokenA = '0x20c0000000000000000000000000000000000001'
const tokenB = '0x20c0000000000000000000000000000000000002'
const to = '0xd2135CfB216b74109775236E36d4b433F1DF507B'

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

test('mintSync accepts optional transaction overrides', () => {
  const chainId = tempo.id

  amm.mintSync(config, {
    chainId,
    feePayer: true,
    to,
    userTokenAddress: tokenA,
    validatorTokenAddress: tokenB,
    validatorTokenAmount: 1_000_000n,
  })

  // @ts-expect-error required action parameters stay required
  amm.mintSync(config, {
    chainId,
    feePayer: true,
    to,
    validatorTokenAddress: tokenB,
    validatorTokenAmount: 1_000_000n,
  })
})
