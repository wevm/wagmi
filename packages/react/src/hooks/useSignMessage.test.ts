import { connect, disconnect, getAccount } from '@wagmi/core'
import { config, privateKey } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { recoverMessageAddress } from 'viem'
import { expect, test } from 'vitest'

import { privateKeyToAccount } from 'viem/accounts'
import { useSignMessage } from './useSignMessage.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSignMessage())

  result.current.signMessage({ message: 'foo bar baz' })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.current.data!,
    }),
  ).resolves.toEqual(getAccount(config).address)

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const { result } = renderHook(() => useSignMessage())

  const account = privateKeyToAccount(privateKey)
  result.current.signMessage({ account, message: 'foo bar baz' })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.current.data!,
    }),
  ).resolves.toEqual(account.address)
})
