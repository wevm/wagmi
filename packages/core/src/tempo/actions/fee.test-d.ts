import { createConfig, http } from '@wagmi/core'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { test } from 'vitest'
import * as fee from './fee.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const token = '0x20c0000000000000000000000000000000000001'

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

test('setUserTokenSync accepts optional transaction overrides', () => {
  const chainId = tempo.id

  fee.setUserTokenSync(config, {
    chainId,
    feePayer: true,
    token,
  })

  // @ts-expect-error required action parameters stay required
  fee.setUserTokenSync(config, {
    chainId,
    feePayer: true,
  })
})
