import { accounts } from '@wagmi/test'
import { type Address, type Hex, http } from 'viem'
import { mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import type { CreateConnectorFn } from '../connectors/createConnector.js'
import { mock } from '../connectors/mock.js'
import { type Connector, createConfig } from '../createConfig.js'
import type { ConnectMutate, ConnectMutateAsync } from './connect.js'

const config = createConfig({
  chains: [mainnet],
  transports: { [mainnet.id]: http() },
})

test('parameters: connector (ConnectorFn)', () => {
  const connectorFn = mock({ accounts })

  const mutate: ConnectMutate<typeof config> = () => {}
  mutate({
    connector: connectorFn,
    foo: 'bar',
  })
  expectTypeOf<
    typeof connectorFn extends CreateConnectorFn ? true : false
  >().toEqualTypeOf<true>()

  type Result = NonNullable<Parameters<typeof mutate<typeof connectorFn>>[0]>
  expectTypeOf<Result['foo']>().toEqualTypeOf<string | undefined>()
})

test('parameters: connector (Connector)', () => {
  const connector = config._internal.connectors.setup(mock({ accounts }))

  const mutate: ConnectMutate<typeof config> = () => {}
  mutate({
    connector,
    foo: 'bar',
  })
  expectTypeOf<
    typeof connector extends Connector ? true : false
  >().toEqualTypeOf<true>()

  type Result = NonNullable<Parameters<typeof mutate<typeof connector>>[0]>
  expectTypeOf<Result['foo']>().toEqualTypeOf<string | undefined>()
})

test('parameters: withCapabilities', async () => {
  const connectorFn = mock({ accounts })

  const mutateAsync: ConnectMutateAsync<typeof config> = () => ({}) as any
  const res0 = await mutateAsync({ connector: connectorFn })
  expectTypeOf(res0.accounts).toEqualTypeOf<readonly [Address, ...Address[]]>()

  const res1 = await mutateAsync({
    connector: connectorFn,
    withCapabilities: false,
  })
  expectTypeOf(res1.accounts).toEqualTypeOf<readonly [Address, ...Address[]]>()

  const res2 = await mutateAsync({
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
