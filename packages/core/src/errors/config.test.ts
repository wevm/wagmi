import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import {
  ChainMismatchError,
  ChainNotConfiguredError,
  ConnectorAccountNotFound,
  ConnectorAlreadyConnectedError,
  ConnectorNotConnectedError,
  ConnectorNotFoundError,
} from './config.js'

test('constructors', () => {
  expect(
    new ChainMismatchError({
      activeChain: 'Ethereum',
      targetChain: 'Ethereum',
    }),
  ).toMatchInlineSnapshot(`
    [ChainMismatchError: Chain mismatch

    Details: Expected "Ethereum", received "Ethereum".
    Version: @wagmi/core@x.y.z]
  `)
  expect(new ChainNotConfiguredError()).toMatchInlineSnapshot(`
    [ChainNotConfiguredError: Chain not configured.

    Version: @wagmi/core@x.y.z]
  `)
  expect(new ConnectorAlreadyConnectedError()).toMatchInlineSnapshot(`
    [ConnectorAlreadyConnectedError: Connector already connected.

    Version: @wagmi/core@x.y.z]
  `)
  expect(new ConnectorNotConnectedError()).toMatchInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
  expect(new ConnectorNotFoundError()).toMatchInlineSnapshot(`
    [ConnectorNotFoundError: Connector not found.

    Version: @wagmi/core@x.y.z]
  `)
  expect(
    new ConnectorAccountNotFound({
      address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      connector: config.connectors[0]!,
    }),
  ).toMatchInlineSnapshot(`
    [ConnectorAccountNotFound: Account "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e" not found for connector "Test Connector".

    Version: @wagmi/core@x.y.z]
  `)
})
