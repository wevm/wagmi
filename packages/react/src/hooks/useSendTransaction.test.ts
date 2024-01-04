import { connect, disconnect } from '@wagmi/core'
import { config, transactionHashRegex } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { useSendTransaction } from './useSendTransaction.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSendTransaction())

  result.current.sendTransaction({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
})
