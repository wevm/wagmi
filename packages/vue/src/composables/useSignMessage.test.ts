import { connect, disconnect, getAccount } from '@wagmi/core'
import { config, privateKey } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { recoverMessageAddress } from 'viem'
import { expect, test } from 'vitest'

import { privateKeyToAccount } from 'viem/accounts'
import { useSignMessage } from './useSignMessage.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [result] = renderComposable(() => useSignMessage())

  result.signMessage({ message: 'foo bar baz' })
  await waitFor(result.isSuccess)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.data.value!,
    }),
  ).resolves.toEqual(getAccount(config).address)

  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const [result] = renderComposable(() => useSignMessage())

  const account = privateKeyToAccount(privateKey)
  result.signMessage({ account, message: 'foo bar baz' })
  await waitFor(result.isSuccess)

  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature: result.data.value!,
    }),
  ).resolves.toEqual(account.address)
})
