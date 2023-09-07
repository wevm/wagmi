import { createConfig } from '@wagmi/core'
import { http, webSocket } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import {
  type UseWatchPendingTransactionsParameters,
  useWatchPendingTransactions,
} from './useWatchPendingTransactions.js'

test('default', () => {
  useWatchPendingTransactions({
    poll: false,
    onTransactions() {},
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

  type Result = UseWatchPendingTransactionsParameters<
    typeof config,
    typeof mainnet.id | typeof optimism.id
  >
  expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchPendingTransactions({
    config,
    poll: false,
    onTransactions() {},
  })

  type Result2 = UseWatchPendingTransactionsParameters<
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  useWatchPendingTransactions({
    config,
    chainId: mainnet.id,
    poll: true,
    onTransactions() {},
  })

  type Result3 = UseWatchPendingTransactionsParameters<
    typeof config,
    typeof optimism.id
  >
  expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchPendingTransactions({
    config,
    chainId: optimism.id,
    poll: true,
    onTransactions() {},
  })
  useWatchPendingTransactions({
    config,
    chainId: optimism.id,
    poll: false,
    onTransactions() {},
  })
})
