import { createConfig } from '@wagmi/core'
import { http, webSocket } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import {
  type UseWatchBlocksParameters,
  useWatchBlocks,
} from './useWatchBlocks.js'

test('default', () => {
  useWatchBlocks({
    poll: false,
    onBlock() {},
  })
})

test('differing transports', () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  type Result = UseWatchBlocksParameters<
    false,
    'latest',
    typeof config,
    typeof mainnet.id | typeof optimism.id
  >
  expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchBlocks({
    config,
    poll: false,
    onBlock() {},
  })

  type Result2 = UseWatchBlocksParameters<
    false,
    'latest',
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  useWatchBlocks({
    config,
    chainId: mainnet.id,
    poll: true,
    onBlock() {},
  })

  type Result3 = UseWatchBlocksParameters<
    false,
    'latest',
    typeof config,
    typeof optimism.id
  >
  expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchBlocks({
    config,
    chainId: optimism.id,
    poll: true,
    onBlock() {},
  })
  useWatchBlocks({
    config,
    chainId: optimism.id,
    poll: false,
    onBlock() {},
  })
})
