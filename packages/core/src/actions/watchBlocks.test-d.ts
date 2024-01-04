import { http, webSocket } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { type WatchBlocksParameters, watchBlocks } from './watchBlocks.js'

test('differing transports', () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  type Result = WatchBlocksParameters<
    false,
    'latest',
    typeof config,
    typeof mainnet.id | typeof optimism.id
  >
  expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  watchBlocks(config, {
    poll: false,
    onBlock() {},
  })

  type Result2 = WatchBlocksParameters<
    false,
    'latest',
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  watchBlocks(config, {
    chainId: mainnet.id,
    poll: true,
    onBlock() {},
  })

  type Result3 = WatchBlocksParameters<
    false,
    'latest',
    typeof config,
    typeof optimism.id
  >
  expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  watchBlocks(config, {
    chainId: optimism.id,
    poll: true,
    onBlock() {},
  })
  watchBlocks(config, {
    chainId: optimism.id,
    poll: false,
    onBlock() {},
  })
})
