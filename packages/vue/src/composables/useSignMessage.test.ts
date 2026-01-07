import { connect, disconnect, getConnection } from '@wagmi/core'
import { config, privateKey } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { recoverMessageAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test } from 'vitest'
import { useSignMessage } from './useSignMessage.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [result] = renderComposable(() => useSignMessage())

  result.mutate({ message: 'foo bar baz' })
  await waitFor(result.isSuccess)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.data.value!,
    }),
  ).resolves.toEqual(getConnection(config).address)

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const [result] = renderComposable(() => useSignMessage())

  const account = privateKeyToAccount(privateKey)
  result.mutate({ account, message: 'foo bar baz' })
  await waitFor(result.isSuccess)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.data.value!,
    }),
  ).resolves.toEqual(account.address)
})
