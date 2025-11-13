import { connect, disconnect } from '@wagmi/core'
import { accounts, config, testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test, vi } from 'vitest'

import { useSendCallsSync } from './useSendCallsSync.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useSendCallsSync())

  result.current.sendCallsSync({
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
  await wait(2_000)
  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
    timeout: 5_000,
  })

  expect(result.current.data).toBeDefined()

  await disconnect(config, { connector })
})
