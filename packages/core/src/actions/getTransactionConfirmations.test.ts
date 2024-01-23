import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionConfirmations } from './getTransactionConfirmations.js'
import { getTransactionReceipt } from './getTransactionReceipt.js'

test('default', async () => {
  await expect(
    getTransactionConfirmations(config, {
      hash: '0xa559259bd2d0e8372421e222ff3545f705b5da60005bd787a23c2e68d6d7fefd',
    }),
  ).resolves.toBeTypeOf('bigint')
})

test('parameters: transactionReceipt', async () => {
  const transactionReceipt = await getTransactionReceipt(config, {
    hash: '0xa559259bd2d0e8372421e222ff3545f705b5da60005bd787a23c2e68d6d7fefd',
  })

  await expect(
    getTransactionConfirmations(config, {
      transactionReceipt,
    }),
  ).resolves.toBeTypeOf('bigint')
})
