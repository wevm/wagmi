import { chain, config } from '@wagmi/test'
import { UserRejectedRequestError } from 'viem'
import { expect, test, vi } from 'vitest'

import { injected } from './injected.js'

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

test('behavior: switchChain cleans up listener on switch failure', async () => {
  const provider = {
    on: vi.fn(),
    removeListener: vi.fn(),
    request: vi.fn(async ({ method }: { method: string }) => {
      if (method === 'wallet_switchEthereumChain')
        throw {
          code: UserRejectedRequestError.code,
          message: 'User rejected the request.',
        }
    }),
  }

  const connectorFn = injected({
    target: {
      id: 'test',
      name: 'Test',
      provider: provider as any,
    },
  })
  const connector = config._internal.connectors.setup(connectorFn)

  expect(connector.emitter.listenerCount('change')).toBe(0)

  await expect(
    connector.switchChain!({ chainId: chain.mainnet2.id }),
  ).rejects.toBeInstanceOf(UserRejectedRequestError)

  expect(connector.emitter.listenerCount('change')).toBe(0)
})

test('behavior: switchChain cleans up listener when add chain is rejected', async () => {
  const provider = {
    on: vi.fn(),
    removeListener: vi.fn(),
    request: vi.fn(async ({ method }: { method: string }) => {
      if (method === 'wallet_switchEthereumChain')
        throw { code: 4902, message: 'Unrecognized chain.' }
      if (method === 'wallet_addEthereumChain')
        throw {
          code: UserRejectedRequestError.code,
          message: 'User rejected the request.',
        }
    }),
  }

  const connectorFn = injected({
    target: {
      id: 'test',
      name: 'Test',
      provider: provider as any,
    },
  })
  const connector = config._internal.connectors.setup(connectorFn)

  expect(connector.emitter.listenerCount('change')).toBe(0)

  await expect(
    connector.switchChain!({ chainId: chain.mainnet2.id }),
  ).rejects.toBeInstanceOf(UserRejectedRequestError)

  expect(provider.request).toHaveBeenCalledTimes(2)
  expect(connector.emitter.listenerCount('change')).toBe(0)
})
