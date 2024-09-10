import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import {
  ChainNotConfiguredError,
  ConnectorAccountNotFoundError,
  ConnectorAlreadyConnectedError,
  ConnectorChainMismatchError,
  ConnectorNotConnectedError,
  ConnectorNotFoundError,
  ConnectorUnavailableReconnectingError,
} from './config.js'

test('constructors', () => {
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
    new ConnectorAccountNotFoundError({
      address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      connector: config.connectors[0]!,
    }),
  ).toMatchInlineSnapshot(`
    [ConnectorAccountNotFoundError: Account "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e" not found for connector "Mock Connector".

    Version: @wagmi/core@x.y.z]
  `)
  expect(
    new ConnectorChainMismatchError({
      connectionChainId: 1,
      connectorChainId: 123,
    }),
  ).toMatchInlineSnapshot(`
    [ConnectorChainMismatchError: The current chain of the connector (id: 123) does not match the connection's chain (id: 1).

    Current Chain ID:  123
    Expected Chain ID: 1

    Version: @wagmi/core@x.y.z]
  `)
  expect(
    new ConnectorUnavailableReconnectingError({
      connector: { name: 'Rabby Wallet' },
    }),
  ).toMatchInlineSnapshot(`
    [ConnectorUnavailableReconnectingError: Connector "Rabby Wallet" unavailable while reconnecting.

    Details: During the reconnection step, the only connector methods guaranteed to be available are: \`id\`, \`name\`, \`type\`, \`uuid\`. All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored. This error commonly occurs for connectors that asynchronously inject after reconnection has already started.
    Version: @wagmi/core@x.y.z]
  `)
})
