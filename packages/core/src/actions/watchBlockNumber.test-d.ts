import { http, webSocket } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type WatchBlockNumberParameters,
  watchBlockNumber,
} from './watchBlockNumber.js'

test('differing transports', () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  type Result = WatchBlockNumberParameters<
    typeof config,
    typeof mainnet.id | typeof optimism.id
  >
  expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  watchBlockNumber(config, {
    poll: false,
    onBlockNumber() {},
  })

  type Result2 = WatchBlockNumberParameters<typeof config, typeof mainnet.id>
  expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  watchBlockNumber(config, {
    chainId: mainnet.id,
    poll: true,
    onBlockNumber() {},
  })
  watchBlockNumber(config, {
    chainId: mainnet.id,
    // @ts-expect-error
    poll: false,
    onBlockNumber() {},
  })

  type Result3 = WatchBlockNumberParameters<typeof config, typeof optimism.id>
  expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  watchBlockNumber(config, {
    chainId: optimism.id,
    poll: true,
    onBlockNumber() {},
  })
  watchBlockNumber(config, {
    chainId: optimism.id,
    poll: false,
    onBlockNumber() {},
  })
})
