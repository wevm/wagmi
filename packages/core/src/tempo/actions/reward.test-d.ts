import { createConfig, http } from '@wagmi/core'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { test } from 'vitest'
import * as reward from './reward.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const token = '0x20c0000000000000000000000000000000000001'

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

test('claimSync accepts optional transaction overrides', () => {
  const chainId = tempo.id

  reward.claimSync(config, {
    chainId,
    feePayer: true,
    token,
  })

  // @ts-expect-error required action parameters stay required
  reward.claimSync(config, {
    chainId,
    feePayer: true,
  })
})
