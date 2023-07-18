import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { usePrepareSendTransaction } from './usePrepareSendTransaction.js'
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

  expect(result.current.data).toMatchObject({ hash: expect.any(String) })

  await disconnect(config, { connector })
})

test('usePrepareSendTransaction', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => ({
    usePrepareSendTransaction: usePrepareSendTransaction({
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
    useSendTransaction: useSendTransaction(),
  }))

  await waitFor(() =>
    expect(result.current.usePrepareSendTransaction.isSuccess).toBeTruthy(),
  )

  result.current.useSendTransaction.sendTransaction(
    result.current.usePrepareSendTransaction.data!,
  )
  await waitFor(() =>
    expect(result.current.useSendTransaction.isSuccess).toBeTruthy(),
  )

  expect(result.current.useSendTransaction.data).toMatchObject({
    hash: expect.any(String),
  })

  await disconnect(config, { connector })
})
