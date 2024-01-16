import { http } from 'viem'
import { mainnet, zkSync } from 'viem/chains'
import { type ZkSyncL2ToL1Log, type ZkSyncLog } from 'viem/zksync'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { getTransactionReceipt } from './getTransactionReceipt.js'

test('chain formatters', async () => {
  const config = createConfig({
    chains: [mainnet, zkSync],
    transports: { [mainnet.id]: http(), [zkSync.id]: http() },
  })
  const result = await getTransactionReceipt(config, { hash: '0x123' })
  if (result.chainId === zkSync.id) {
    expectTypeOf(result.l1BatchNumber).toEqualTypeOf<bigint | null>()
    expectTypeOf(result.l1BatchTxIndex).toEqualTypeOf<bigint | null>()
    expectTypeOf(result.logs).toEqualTypeOf<ZkSyncLog[]>()
    expectTypeOf(result.l2ToL1Logs).toEqualTypeOf<ZkSyncL2ToL1Log[]>()
  }
})

test('chainId', async () => {
  const config = createConfig({
    chains: [zkSync],
    transports: { [zkSync.id]: http() },
  })
  const result = await getTransactionReceipt(config, {
    hash: '0x123',
    chainId: zkSync.id,
  })
  expectTypeOf(result.l1BatchNumber).toEqualTypeOf<bigint | null>()
  expectTypeOf(result.l1BatchTxIndex).toEqualTypeOf<bigint | null>()
  expectTypeOf(result.logs).toEqualTypeOf<ZkSyncLog[]>()
  expectTypeOf(result.l2ToL1Logs).toEqualTypeOf<ZkSyncL2ToL1Log[]>()
})
