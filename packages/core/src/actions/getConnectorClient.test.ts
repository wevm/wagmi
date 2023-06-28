import { config } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { getConnectorClient } from './getConnectorClient.js'

describe('getConnectorClient', () => {
  test('behavior: not connected', async () => {
    await expect(
      getConnectorClient(config),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Connector not found.

      Version: @wagmi/core@2.0.0"
    `)
  })
})
