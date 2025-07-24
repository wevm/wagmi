import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { safe } from './safe.js'

/*
 * To manually test the Safe connector:
 *
 * 1. Run the wagmi playground app (`pnpm dev`)
 * 2. Add a custom Safe App with App URL set to `http://localhost:5173` (make sure there is a `manifest.json` file served by the playground)
 * 3. Open the playground app at `https://app.safe.global/eth:0x4557B18E779944BFE9d78A672452331C186a9f48/apps?appUrl=http%3A%2F%2Flocalhost%3A5173`
 *
 * See https://docs.gnosis-safe.io/learn/safe-tools/sdks/safe-apps/releasing-your-safe-app for more info.
 */

test('setup', () => {
  const connectorFn = safe({
    allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
    debug: false,
  })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Safe')
})
