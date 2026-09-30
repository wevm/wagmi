import { chain, config } from '@wagmi/test'
import { numberToHex, UserRejectedRequestError } from 'viem'
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

test('switchChain removes change listener when the switch request fails', async () => {
  const provider = {
    request: vi.fn(async ({ method }: { method: string }) => {
      if (method === 'eth_chainId') return numberToHex(chain.mainnet.id)
      if (method === 'eth_accounts') return []
      if (method === 'wallet_switchEthereumChain')
        throw Object.assign(new Error('User rejected the request.'), {
          code: UserRejectedRequestError.code,
        })
      return undefined
    }),
  }
  const connector = config._internal.connectors.setup(
    injected({
      target: {
        id: 'mockInjected',
        name: 'Mock Injected',
        provider,
      },
    }),
  )
  const before = config.emitter.listenerCount('change')

  await expect(
    connector.switchChain({ chainId: chain.optimism.id }),
  ).rejects.toThrow('User rejected')

  expect(config.emitter.listenerCount('change')).toBe(before)
})
