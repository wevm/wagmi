import { config } from '@wagmi/test'
import { afterEach, expect, test, vi } from 'vitest'

import { injected } from './injected.js'

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

test('setup', () => {
  const connectorFn = injected()
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Injected')
})

test.each([
  { wallet: undefined, expected: 'Injected' },
  { wallet: 'coinbaseWallet', expected: 'Coinbase Wallet' },
  { wallet: 'metaMask', expected: 'MetaMask' },
  { wallet: 'phantom', expected: 'Phantom' },
  { wallet: 'rainbow', expected: 'Rainbow' },
] as const satisfies readonly {
  wallet: string | undefined
  expected: string
}[])('injected({ wallet: $wallet })', ({ wallet, expected }) => {
  const connectorFn = injected({ target: wallet })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual(expected)
})

test('cleans up async injection listener after timeout', async () => {
  vi.useFakeTimers()
  const addEventListener = vi.spyOn(window, 'addEventListener')
  const removeEventListener = vi.spyOn(window, 'removeEventListener')
  const connector = config._internal.connectors.setup(
    injected({
      target: {
        id: 'test',
        name: 'Test',
        provider: () => undefined,
      },
      unstable_shimAsyncInject: 100,
    }),
  )
  const getProvider = vi.spyOn(connector, 'getProvider')

  const isAuthorized = connector.isAuthorized()
  await vi.advanceTimersByTimeAsync(0)
  const listener = addEventListener.mock.calls.find(
    ([type]) => type === 'ethereum#initialized',
  )?.[1]

  await vi.advanceTimersByTimeAsync(100)
  await expect(isAuthorized).resolves.toBe(false)
  expect(removeEventListener).toHaveBeenCalledWith(
    'ethereum#initialized',
    listener,
  )

  const calls = getProvider.mock.calls.length
  window.dispatchEvent(new Event('ethereum#initialized'))
  await vi.advanceTimersByTimeAsync(0)
  expect(getProvider).toHaveBeenCalledTimes(calls)
})

test('cancels async injection timeout after event', async () => {
  vi.useFakeTimers()
  let provider: object | undefined
  const connector = config._internal.connectors.setup(
    injected({
      target: {
        id: 'test',
        name: 'Test',
        provider: () => provider as never,
      },
      unstable_shimAsyncInject: 100,
    }),
  )
  const getProvider = vi.spyOn(connector, 'getProvider')

  const isAuthorized = connector.isAuthorized()
  await vi.advanceTimersByTimeAsync(0)
  provider = {}
  window.dispatchEvent(new Event('ethereum#initialized'))

  await expect(isAuthorized).resolves.toBe(true)
  const calls = getProvider.mock.calls.length
  await vi.advanceTimersByTimeAsync(100)
  expect(getProvider).toHaveBeenCalledTimes(calls)
})
