import { connect, disconnect, sendCalls } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { test, vi } from 'vitest'

import { useShowCallsStatus } from './useShowCallsStatus.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const { id } = await sendCalls(config, {
    calls: [
      {
        data: '0xdeadbeef',
        to: accounts[1],
        value: parseEther('1'),
      },
      {
        to: accounts[2],
        value: parseEther('2'),
      },
      {
        to: accounts[3],
        value: parseEther('3'),
      },
    ],
  })

  const { result } = await renderHook(() => useShowCallsStatus())

  result.current.mutate({ id })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  await disconnect(config, { connector })
})
