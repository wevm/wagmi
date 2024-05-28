import { config } from '@wagmi/test'
import { useTransactionReceipt } from '@wagmi/vue'
import { zkSync } from '@wagmi/vue/chains'
import type { ZkSyncL2ToL1Log, ZkSyncLog } from 'viem/zksync'
import { expectTypeOf, test } from 'vitest'

test('chain formatters', () => {
  const result = useTransactionReceipt()

  if (result.data?.value?.chainId === zkSync.id) {
    expectTypeOf(result.data.value.l1BatchNumber).toEqualTypeOf<bigint | null>()
    expectTypeOf(result.data.value.l1BatchTxIndex).toEqualTypeOf<
      bigint | null
    >()
    expectTypeOf(result.data.value.logs).toEqualTypeOf<ZkSyncLog[]>()
    expectTypeOf(result.data.value.l2ToL1Logs).toEqualTypeOf<
      ZkSyncL2ToL1Log[]
    >()
  }

  const result2 = useTransactionReceipt({ chainId: zkSync.id })
  if (result2.data.value) {
    expectTypeOf(result2.data.value.l1BatchNumber).toEqualTypeOf<
      bigint | null
    >()
    expectTypeOf(result2.data.value.l1BatchTxIndex).toEqualTypeOf<
      bigint | null
    >()
    expectTypeOf(result2.data.value.logs).toEqualTypeOf<ZkSyncLog[]>()
    expectTypeOf(result2.data.value.l2ToL1Logs).toEqualTypeOf<
      ZkSyncL2ToL1Log[]
    >()
  }
})

test('parameters: config', async () => {
  const result = useTransactionReceipt({ config })

  if (result.data && 'l1BatchNumber' in result.data)
    expectTypeOf(result.data.l1BatchNumber).toEqualTypeOf<unknown>()
})
