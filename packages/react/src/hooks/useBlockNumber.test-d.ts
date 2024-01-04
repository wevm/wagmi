import { http, createConfig, webSocket } from '@wagmi/core'
import { mainnet, optimism } from '@wagmi/core/chains'
import { expectTypeOf, test } from 'vitest'

import { useBlockNumber } from './useBlockNumber.js'

test('select data', async () => {
  const result = useBlockNumber({
    query: {
      select(data) {
        return data?.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})

test('differing transports', () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  useBlockNumber({
    config,
    watch: {
      poll: false,
    },
  })

  useBlockNumber({
    config,
    chainId: mainnet.id,
    watch: {
      poll: true,
    },
  })
  useBlockNumber({
    config,
    chainId: mainnet.id,
    watch: {
      // @ts-expect-error
      poll: false,
    },
  })

  useBlockNumber({
    config,
    chainId: optimism.id,
    watch: {
      poll: true,
    },
  })
  useBlockNumber({
    config,
    chainId: optimism.id,
    watch: {
      poll: false,
    },
  })
})
