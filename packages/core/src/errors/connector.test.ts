import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import {
  ProviderNotFoundError,
  SwitchChainNotSupportedError,
} from './connector.js'

test('constructors', () => {
  expect(new ProviderNotFoundError()).toMatchInlineSnapshot(`
    [ProviderNotFoundError: Provider not found.

    Version: @wagmi/core@x.y.z]
  `)
  expect(
    new SwitchChainNotSupportedError({
      connector: config.connectors[0]!,
    }),
  ).toMatchInlineSnapshot(`
    [SwitchChainNotSupportedError: "Mock Connector" does not support programmatic chain switching.

    Version: @wagmi/core@x.y.z]
  `)
})
