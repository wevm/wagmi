import { connect, disconnect } from '@wagmi/core'
import { config, testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { beforeEach, expect, test, vi } from 'vitest'

import { useSendTransactionSync } from './useSendTransactionSync.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useSendTransactionSync())

  result.current.mutate({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
  await wait(2_000)
  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 15_000 })

  expect(result.current.data).toBeDefined()

  await disconnect(config, { connector })
})
