import { createConfig, http } from '@wagmi/core'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { test } from 'vitest'
import * as policy from './policy.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

test('createSync accepts optional transaction overrides', () => {
  const chainId = tempo.id

  policy.createSync(config, {
    chainId,
    feePayer: true,
    type: 'whitelist',
  })

  // @ts-expect-error required action parameters stay required
  policy.createSync(config, {
    chainId,
    feePayer: true,
  })
})
