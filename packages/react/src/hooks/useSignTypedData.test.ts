import { connect, disconnect, getAccount } from '@wagmi/core'
import { config, privateKey, typedData } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { recoverTypedDataAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test, vi } from 'vitest'
import { useSignTypedData } from './useSignTypedData.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useSignTypedData())

  result.current.signTypedData({
    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })
  await vi.waitUntil(() => result.current.isSuccess)

  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature: result.current.data!,
    }),
  ).resolves.toEqual(getAccount(config).address)

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const { result } = await renderHook(() => useSignTypedData())

  const account = privateKeyToAccount(privateKey)
  result.current.signTypedData({
    account,
    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })
  await vi.waitUntil(() => result.current.isSuccess)

  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature: result.current.data!,
    }),
  ).resolves.toEqual(account.address)
})
