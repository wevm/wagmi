import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as nonce from './nonce.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const selected = 'selected' as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

test('useNonce', () => {
  const result = nonce.useNonce({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.nonce.getNonce.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})
