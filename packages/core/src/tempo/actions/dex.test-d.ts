import { createConfig, http } from '@wagmi/core'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { test } from 'vitest'
import * as dex from './dex.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const tokenA = '0x20c0000000000000000000000000000000000001'
const tokenB = '0x20c0000000000000000000000000000000000002'

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

test('buySync accepts optional transaction overrides', () => {
  const chainId = tempo.id

  dex.buySync(config, {
    amountOut: 1_000_000n,
    chainId,
    feePayer: true,
    maxAmountIn: 1_000_000n,
    tokenIn: tokenA,
    tokenOut: tokenB,
  })

  // @ts-expect-error required action parameters stay required
  dex.buySync(config, {
    chainId,
    feePayer: true,
    maxAmountIn: 1_000_000n,
    tokenIn: tokenA,
    tokenOut: tokenB,
  })
})
