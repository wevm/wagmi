import { createConfig, http } from '@wagmi/core'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { test } from 'vitest'
import * as token from './token.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const tokenAddress = '0x20c0000000000000000000000000000000000001'
const to = '0xd2135CfB216b74109775236E36d4b433F1DF507B'

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

test('transferSync accepts optional transaction overrides', () => {
  const chainId = tempo.id

  token.transferSync(config, {
    amount: 1_000_000n,
    chainId,
    feePayer: true,
    to,
    token: tokenAddress,
  })

  // @ts-expect-error required action parameters stay required
  token.transferSync(config, {
    chainId,
    feePayer: true,
    to,
    token: tokenAddress,
  })
})
