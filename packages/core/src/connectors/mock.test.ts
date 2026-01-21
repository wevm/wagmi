import { accounts, config } from '@wagmi/test'
import type { Address, Hex } from 'viem'
import { expect, expectTypeOf, test } from 'vitest'
import type { Connector } from '../createConfig.js'
import type { CreateConnectorFn } from './createConnector.js'
import { mock } from './mock.js'

test('setup', () => {
  const connectorFn = mock({ accounts })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Mock Connector')

  expectTypeOf<
    typeof connectorFn extends CreateConnectorFn ? true : false
  >().toEqualTypeOf<true>()
  expectTypeOf<
    typeof connector extends Connector ? true : false
  >().toEqualTypeOf<true>()

  type ConnectFnParameters = NonNullable<
    Parameters<(typeof connector)['connect']>[0]
  >
  expectTypeOf<ConnectFnParameters['foo']>().toMatchTypeOf<string | undefined>()

  type ConnectFnReturnType = Awaited<ReturnType<(typeof connector)['connect']>>
  expectTypeOf<ConnectFnReturnType['accounts']>().toMatchTypeOf<
    | readonly `0x${string}`[]
    | readonly {
        address: Address
        capabilities: {
          foo: {
            bar: Hex
          }
        }
      }[]
  >()
})

test('behavior: connect#withCapabilities', async () => {
  const connectorFn = mock({ accounts })
  const connector = config._internal.connectors.setup(connectorFn)
  const res = await connector.connect({ withCapabilities: true })
  expectTypeOf(res.accounts).toEqualTypeOf<
    readonly {
      address: Address
      capabilities: Record<string, unknown>
    }[]
  >()
  expect(res).toMatchObject(
    expect.objectContaining({
      accounts: expect.arrayContaining([
        expect.objectContaining({ address: expect.any(String) }),
      ]),
    }),
  )
})

test('behavior: features.connectError', async () => {
  const connectorFn = mock({ accounts, features: { connectError: true } })
  const connector = config._internal.connectors.setup(connectorFn)
  await expect(() =>
    connector.connect(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    Details: Failed to connect.
    Version: viem@2.44.4]
  `)
})

test('behavior: connector.getProvider request errors', async () => {
  const connectorFn = mock({
    accounts,
    features: {
      signMessageError: true,
      signTypedDataError: true,
      switchChainError: true,
      watchAssetError: true,
    },
  })
  const connector = config._internal.connectors.setup(
    connectorFn,
  ) as ReturnType<typeof connectorFn>
  const provider = await connector.getProvider()

  await expect(
    provider.request({
      method: 'eth_signTypedData_v4',
      params: [] as any,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    Details: Failed to sign typed data.
    Version: viem@2.44.4]
  `)

  await expect(
    provider.request({
      method: 'wallet_switchEthereumChain',
      params: [] as any,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    Details: Failed to switch chain.
    Version: viem@2.44.4]
  `)

  await expect(
    provider.request({
      method: 'wallet_watchAsset',
      params: [] as any,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    Details: Failed to switch chain.
    Version: viem@2.44.4]
  `)

  await expect(
    provider.request({
      method: 'personal_sign',
      params: [] as any,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    Details: Failed to sign message.
    Version: viem@2.44.4]
  `)
})

test('behavior: reconnect', async () => {
  const connectorFn = mock({
    accounts,
    features: {
      defaultConnected: true,
      reconnect: true,
    },
  })
  const connector = config._internal.connectors.setup(connectorFn)

  await expect(connector.isAuthorized()).resolves.toBeTruthy()
})
