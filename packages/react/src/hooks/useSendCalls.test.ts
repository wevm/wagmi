import { connect, disconnect } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test, vi } from 'vitest'

import { useSendCalls } from './useSendCalls.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useSendCalls())

  result.current.sendCalls({
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
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current.data).toMatchInlineSnapshot(
    `
    {
      "id": "0xb24b52a86aa2b0bae6f1e44868c3a13d2572e766a1f6364afd93d1757839b8a1",
    }
  `,
  )

  await disconnect(config, { connector })
})
