import { http, webSocket } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type WatchPendingTransactionsParameters,
  watchPendingTransactions,
} from './watchPendingTransactions.js'

test('differing transports', () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  type Result = WatchPendingTransactionsParameters<
    typeof config,
    typeof mainnet.id | typeof optimism.id
  >
  expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  watchPendingTransactions(config, {
    poll: false,
    onTransactions() {},
  })

  type Result2 = WatchPendingTransactionsParameters<
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  watchPendingTransactions(config, {
    chainId: mainnet.id,
    poll: true,
    onTransactions() {},
  })

  type Result3 = WatchPendingTransactionsParameters<
    typeof config,
    typeof optimism.id
  >
  expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  watchPendingTransactions(config, {
    chainId: optimism.id,
    poll: true,
    onTransactions() {},
  })
  watchPendingTransactions(config, {
    chainId: optimism.id,
    poll: false,
    onTransactions() {},
  })
})
