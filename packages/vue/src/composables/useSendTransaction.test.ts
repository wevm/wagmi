import { connect, disconnect } from '@wagmi/core'
import { config, transactionHashRegex } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { useSendTransaction } from './useSendTransaction.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [result] = renderComposable(() => useSendTransaction())

  result.sendTransaction({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
  await waitFor(result.isSuccess)

  expect(result.data.value).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
})
