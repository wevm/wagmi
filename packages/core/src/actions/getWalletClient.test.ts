import { config } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { getWalletClient } from './getWalletClient.js'

describe('getWalletClient', () => {
  test('behavior: not connected', async () => {
    await expect(getWalletClient(config)).toThrowErrorMatchingInlineSnapshot()
  })
})
