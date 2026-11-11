import { accounts, config } from '@wagmi/test'
import type { EIP1193Provider } from 'viem'
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

test('behavior: unstable_shimAsyncInject removes listener after timeout', async () => {
  vi.useFakeTimers()
  const connector = config._internal.connectors.setup(
    injected({
      target: { id: 'test', name: 'Test', provider: () => undefined },
      unstable_shimAsyncInject: 100,
    }),
  )

  const promise = connector.isAuthorized()
  await vi.advanceTimersByTimeAsync(100)
  await expect(promise).resolves.toBe(false)

  const getProvider = vi.spyOn(connector, 'getProvider')
  window.dispatchEvent(new Event('ethereum#initialized'))
  expect(getProvider).not.toHaveBeenCalled()
})

test('behavior: unstable_shimAsyncInject clears timeout after `ethereum#initialized`', async () => {
  vi.useFakeTimers()
  let provider: EIP1193Provider | undefined
  const connector = config._internal.connectors.setup(
    injected({
      target: { id: 'test', name: 'Test', provider: () => provider },
      unstable_shimAsyncInject: 100,
    }),
  )

  const promise = connector.isAuthorized()
  await vi.advanceTimersByTimeAsync(0)
  provider = mockProvider([accounts[0]])
  window.dispatchEvent(new Event('ethereum#initialized'))
  await expect(promise).resolves.toBe(true)

  const getProvider = vi.spyOn(connector, 'getProvider')
  await vi.advanceTimersByTimeAsync(100)
  expect(getProvider).not.toHaveBeenCalled()
})

test('behavior: unstable_shimAsyncInject checks accounts', async () => {
  vi.useFakeTimers()
  let provider: EIP1193Provider | undefined
  const connector = config._internal.connectors.setup(
    injected({
      target: { id: 'test', name: 'Test', provider: () => provider },
      unstable_shimAsyncInject: 100,
    }),
  )

  const promise = connector.isAuthorized()
  await vi.advanceTimersByTimeAsync(0)
  provider = mockProvider([])
  window.dispatchEvent(new Event('ethereum#initialized'))
  await expect(promise).resolves.toBe(false)
})

function mockProvider(accounts: readonly string[]) {
  return {
    async request({ method }: { method: string }) {
      if (method === 'eth_accounts') return accounts
      return null
    },
  } as unknown as EIP1193Provider
}
