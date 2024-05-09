import { createConfig } from '@wagmi/core'
import { http, webSocket } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import type { DeepUnwrapRef } from '../types/ref.js'
import {
  type UseWatchBlockNumberParameters,
  useWatchBlockNumber,
} from './useWatchBlockNumber.js'

test('default', () => {
  useWatchBlockNumber({
    poll: false,
    onBlockNumber() {},
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

  type Result = DeepUnwrapRef<
    UseWatchBlockNumberParameters<
      typeof config,
      typeof mainnet.id | typeof optimism.id
    >
  >
  expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchBlockNumber({
    config,
    poll: false,
    onBlockNumber() {},
  })

  type Result2 = DeepUnwrapRef<
    UseWatchBlockNumberParameters<typeof config, typeof mainnet.id>
  >
  expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  useWatchBlockNumber({
    config,
    chainId: mainnet.id,
    poll: true,
    onBlockNumber() {},
  })
  useWatchBlockNumber({
    config,
    chainId: mainnet.id,
    // @ts-expect-error
    poll: false,
    onBlockNumber() {},
  })

  type Result3 = DeepUnwrapRef<
    UseWatchBlockNumberParameters<typeof config, typeof optimism.id>
  >
  expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchBlockNumber({
    config,
    chainId: optimism.id,
    poll: true,
    onBlockNumber() {},
  })
  useWatchBlockNumber({
    config,
    chainId: optimism.id,
    poll: false,
    onBlockNumber() {},
  })
})
