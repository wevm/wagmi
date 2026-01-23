import { config } from '@wagmi/test'
import type { ZkSyncL2ToL1Log, ZkSyncLog } from 'viem/zksync'
import { expectTypeOf, test } from 'vitest'
import { useWaitForTransactionReceipt } from 'wagmi'
import { zkSync } from 'wagmi/chains'

test('chain formatters', () => {
  const result = useWaitForTransactionReceipt()

  if (result.data?.chainId === zkSync.id) {
    expectTypeOf(result.data.l1BatchNumber).toEqualTypeOf<bigint | null>()
    expectTypeOf(result.data.l1BatchTxIndex).toEqualTypeOf<bigint | null>()
    expectTypeOf(result.data.logs).toEqualTypeOf<ZkSyncLog[]>()
    expectTypeOf(result.data.l2ToL1Logs).toEqualTypeOf<ZkSyncL2ToL1Log[]>()
  }

  const result2 = useWaitForTransactionReceipt({ chainId: zkSync.id })
  if (result2.data) {
    expectTypeOf(result2.data.l1BatchNumber).toEqualTypeOf<bigint | null>()
    expectTypeOf(result2.data.l1BatchTxIndex).toEqualTypeOf<bigint | null>()
    expectTypeOf(result2.data.logs).toEqualTypeOf<ZkSyncLog[]>()
    expectTypeOf(result2.data.l2ToL1Logs).toEqualTypeOf<ZkSyncL2ToL1Log[]>()
  }
})

test('parameters: config', async () => {
  const result = useWaitForTransactionReceipt({ config })

  if (result.data && 'l1BatchNumber' in result.data)
    expectTypeOf(result.data.l1BatchNumber).toEqualTypeOf<unknown>()
})
