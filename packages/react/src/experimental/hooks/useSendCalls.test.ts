import { connect, disconnect } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { useSendCalls } from './useSendCalls.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSendCalls())

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
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toMatchInlineSnapshot(
    `"0x943e879b78e26f9e960a0c682e53d153a75487ef24624a44dbf22ae439b3d370"`,
  )

  await disconnect(config, { connector })
})
