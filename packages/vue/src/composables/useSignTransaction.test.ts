import { connect, disconnect } from '@wagmi/core'
import { config, signedTransactionRegex } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { useSignTransaction } from './useSignTransaction.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [result] = renderComposable(() => useSignTransaction())

  result.mutate({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
  await waitFor(result.isSuccess)

  expect(result.data.value).toMatch(signedTransactionRegex)

  await disconnect(config, { connector })
})
