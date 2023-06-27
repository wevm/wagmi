import { config } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { getWalletClient } from './getWalletClient.js'

describe('getWalletClient', () => {
  test('behavior: not connected', async () => {
    await expect(
      getWalletClient(config),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Connector not found.

      Version: @wagmi/core@2.0.0"
    `)
  })
})
