import { connect, disconnect, getAccount } from '@wagmi/core'
import { config, privateKey } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { recoverMessageAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test, vi } from 'vitest'
import { useSignMessage } from './useSignMessage.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useSignMessage())

  result.current.signMessage({ message: 'foo bar baz' })
  await vi.waitUntil(() => result.current.isSuccess)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.current.data!,
    }),
  ).resolves.toEqual(getAccount(config).address)

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const { result } = await renderHook(() => useSignMessage())

  const account = privateKeyToAccount(privateKey)
  result.current.signMessage({ account, message: 'foo bar baz' })
  await vi.waitUntil(() => result.current.isSuccess)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.current.data!,
    }),
  ).resolves.toEqual(account.address)
})
