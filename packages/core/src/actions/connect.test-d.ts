import { accounts } from '@wagmi/test'
import { type Address, type Hex, http } from 'viem'
import { mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import type { CreateConnectorFn } from '../connectors/createConnector.js'
import { mock } from '../connectors/mock.js'
import { type Connector, createConfig } from '../createConfig.js'
import { connect } from './connect.js'

const config = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
})

test('parameters: connector (ConnectorFn)', () => {
  const connectorFn = mock({ accounts })

  connect(config, {
    connector: connectorFn,
    foo: 'bar',
  })
  expectTypeOf<
    typeof connectorFn extends CreateConnectorFn ? true : false
  >().toEqualTypeOf<true>()

  type Result = NonNullable<
    Parameters<typeof connect<typeof config, typeof connectorFn>>[1]
  >
  expectTypeOf<Result['foo']>().toEqualTypeOf<string | undefined>()
})

test('parameters: connector (Connector)', () => {
  const connector = config._internal.connectors.setup(mock({ accounts }))

  connect(config, {
    connector,
    foo: 'bar',
  })
  expectTypeOf<
    typeof connector extends Connector ? true : false
  >().toEqualTypeOf<true>()

  type Result = NonNullable<
    Parameters<typeof connect<typeof config, typeof connector>>[1]
  >
  expectTypeOf<Result['foo']>().toEqualTypeOf<string | undefined>()
})

test('parameters: withCapabilities', async () => {
  const connectorFn = mock({ accounts })

  const res0 = await connect(config, { connector: connectorFn })
  expectTypeOf(res0.accounts).toEqualTypeOf<readonly [Address, ...Address[]]>()

  const res1 = await connect(config, {
    connector: connectorFn,
    withCapabilities: false,
  })
  expectTypeOf(res1.accounts).toEqualTypeOf<readonly [Address, ...Address[]]>()

  const res2 = await connect(config, {
    connector: connectorFn,
    withCapabilities: true,
  })
  expectTypeOf(res2.accounts).toEqualTypeOf<
    readonly [
      {
        address: Address
        capabilities: {
          foo: { bar: Hex }
        }
      },
      ...{
        address: Address
        capabilities: {
          foo: { bar: Hex }
        }
      }[],
    ]
  >()
})
