import { describe, expect, it } from 'vitest'

import { testChains } from '../test'
import { SafeConnector } from './safe'

/*
 * To manually test the Safe connector:
 *
 * 1. Run the wagmi playground app (`pnpm playground`)
 * 2. Add a custom Safe App with App URL set to `http://localhost:3000` (make sure there is a `manifest.json` file served by the playground)
 * 3. Open the playground app at `https://app.safe.global/eth:0x/apps?appUrl=http%3A%2F%2Flocalhost%3A3000`
 *
 * See https://docs.gnosis-safe.io/learn/safe-tools/sdks/safe-apps/releasing-your-safe-app for more info.
 */
describe('SafeConnector', () => {
  it('inits', () => {
    const connector = new SafeConnector({
      chains: testChains,
      options: {
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: false,
      },
    })
    expect(connector.name).toEqual('Safe')
  })
})
