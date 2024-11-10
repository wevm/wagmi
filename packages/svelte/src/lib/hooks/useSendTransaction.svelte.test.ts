import { connect, disconnect } from '@wagmi/core'
import { config, transactionHashRegex } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { setups, teardowns, testHook } from './test.svelte.js'
import { useSendTransaction } from './useSendTransaction.svelte'

test(
  'default',
  testHook(
    async () => {
      const sendTransaction = $derived.by(useSendTransaction())

      sendTransaction.sendTransaction({
        to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        value: parseEther('0.01'),
      })
      await expect.poll(() => sendTransaction.isSuccess).toBeTruthy()

      expect(sendTransaction.data).toMatch(transactionHashRegex)
    },
    {},
    setups.connect,
    teardowns.disconnect,
  ),
)
