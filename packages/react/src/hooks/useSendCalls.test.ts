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
  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current.data).toMatchInlineSnapshot(
    `
    {
      "id": "0x5dedb5a4ff8968db37459b52b83cbdc92b01c9c709c9cff26e345ef5cf27f92e",
    }
  `,
  )

  await disconnect(config, { connector })
})
