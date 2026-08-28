import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useRequestPermissions } from './useRequestPermissions.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useRequestPermissions())

  result.current.mutate({ eth_accounts: {} })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current.data).toMatchInlineSnapshot(`
    [
      {
        "caveats": [
          {
            "type": "filterResponse",
            "value": [
              "0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb",
            ],
          },
        ],
        "invoker": "https://example.com",
        "parentCapability": "eth_accounts",
      },
    ]
  `)

  await disconnect(config, { connector })
})
