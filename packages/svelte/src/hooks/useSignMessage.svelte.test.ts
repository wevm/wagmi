import { connect, disconnect, getAccount } from '@wagmi/core'
import { config, privateKey, wait } from '@wagmi/test'
import { recoverMessageAddress } from 'viem'
import { expect, test, vi } from 'vitest'

import { setups, teardowns, testHook } from '@wagmi/test/svelte'
import { privateKeyToAccount } from 'viem/accounts'
import { useSignMessage } from './useSignMessage.svelte'

test(
  'default',
  testHook(
    async () => {
      const signMessage = $derived.by(useSignMessage())

      signMessage.signMessage({ message: 'foo bar baz' })
      await expect.poll(() => signMessage.isSuccess).toBeTruthy()

      await expect(
        recoverMessageAddress({
          message: 'foo bar baz',
          signature: signMessage.data!,
        }),
      ).resolves.toEqual(getAccount(config).address)
    },
    {},
    setups.connect,
    teardowns.disconnect,
  ),
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
