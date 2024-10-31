import { connect, disconnect, getAccount } from '@wagmi/core'
import { config, privateKey } from '@wagmi/test'
import { recoverMessageAddress } from 'viem'
import { expect, test, vi } from 'vitest'

import { privateKeyToAccount } from 'viem/accounts'
import { testHook } from './test.svelte.js'
import { useSignMessage } from './useSignMessage.svelte'

const connector = config.connectors[0]!

test(
  'default',
  testHook(async () => {
    await connect(config, { connector })

    const signMessage = $derived.by(useSignMessage())

    signMessage.signMessage({ message: 'foo bar baz' })
    await expect.poll(() => signMessage.isSuccess).toBeTruthy()

    await expect(
      recoverMessageAddress({
        message: 'foo bar baz',
        signature: signMessage.data!,
      }),
    ).resolves.toEqual(getAccount(config).address)

    await disconnect(config, { connector })
  }),
)

test(
  'behavior: local account',
  testHook(async () => {
    const signMessage = $derived.by(useSignMessage())

    const account = privateKeyToAccount(privateKey)
    signMessage.signMessage({ account, message: 'foo bar baz' })

    await expect.poll(() => signMessage.isSuccess).toBeTruthy()

    await expect(
      recoverMessageAddress({
        message: 'foo bar baz',
        signature: signMessage.data!,
      }),
    ).resolves.toEqual(account.address)
  }),
)
