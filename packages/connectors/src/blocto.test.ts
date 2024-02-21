import { createConfig } from '@wagmi/core'
import { normalizeChainId } from '@wagmi/core'
import { arbitrumGoerli, polygonMumbai } from '@wagmi/core/chains'
import { http, SwitchChainError, numberToHex } from 'viem'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { blocto } from './blocto.js'

const walletProvider = {
  on: vi.fn(),
}

describe('blocto-connector', () => {
  let connector: any
  beforeEach(() => {
    const config = createConfig({
      chains: [polygonMumbai, arbitrumGoerli],
      pollingInterval: 100,
      storage: null,
      transports: {
        [polygonMumbai.id]: http(),
        [arbitrumGoerli.id]: http(),
      },
    })
    connector = config._internal.connectors.setup(blocto())
  })

  afterEach(() => {
    connector = null
  })

  test('setup', () => {
    expect(connector.name).toEqual('Blocto')
  })

  test('connect', async () => {
    const chainId = 1
    const accounts = ['0xc61B4Aa62E5FD40cceB08C602Eb5D157b257b49a']
    const provider = {
      request: vi.fn().mockResolvedValue(accounts),
    }
    connector.getProvider = vi.fn().mockResolvedValue(provider)
    connector.getAccounts = vi.fn().mockResolvedValue(accounts)
    connector.getChainId = vi.fn().mockResolvedValue(chainId)

    const result = await connector.connect({ chainId })

    expect(result).toEqual({ accounts, chainId })
    expect(connector.getProvider).toHaveBeenCalledWith({ chainId })
    expect(provider.request).toHaveBeenCalledWith({
      method: 'eth_requestAccounts',
    })
  })

  test('catch error when user decline to connect', () => {
    const chainId = 1
    const userRejectedRequest = new Error('User rejected request')
    const provider = {
      request: vi.fn().mockImplementation(() => {
        throw userRejectedRequest
      }),
    }
    connector.getProvider = vi.fn().mockResolvedValue(provider)

    expect(connector.connect({ chainId })).rejects.toThrow(userRejectedRequest)
  })

  test('disconnect', async () => {
    const provider = {
      request: vi.fn().mockResolvedValue(undefined),
    }
    connector.getProvider = vi.fn().mockResolvedValue(provider)

    await connector.disconnect()

    expect(connector.getProvider).toHaveBeenCalled()
    expect(provider.request).toHaveBeenCalledWith({
      method: 'wallet_disconnect',
    })
  })

  test('getAccounts', async () => {
    const accounts = ['0xc61B4Aa62E5FD40cceB08C602Eb5D157b257b49a']
    const provider = {
      request: vi.fn().mockResolvedValue(accounts),
    }
    connector.getProvider = vi.fn().mockResolvedValue(provider)

    const result = await connector.getAccounts()

    expect(result).toEqual(['0xc61B4Aa62E5FD40cceB08C602Eb5D157b257b49a'])
    expect(connector.getProvider).toHaveBeenCalled()
    expect(provider.request).toHaveBeenCalledWith({ method: 'eth_accounts' })
  })

  test('getChainId', async () => {
    const chainId = '0x1'
    const provider = {
      chainId: undefined,
      request: vi.fn().mockResolvedValue(chainId),
    }
    connector.getProvider = vi.fn().mockResolvedValue(provider)

    const result = await connector.getChainId()

    expect(result).toEqual(normalizeChainId(chainId))
    expect(connector.getProvider).toHaveBeenCalled()
    expect(provider.request).toHaveBeenCalledWith({ method: 'eth_chainId' })
  })

  test('getProvider', async () => {
    vi.mock('@blocto/sdk', () => ({
      default: vi.fn().mockImplementation(() => ({
        ethereum: walletProvider,
      })),
    }))

    const chainId = 1
    const result = await connector.getProvider({ chainId })

    expect(result).toEqual(walletProvider)
    expect(walletProvider.on).toHaveBeenCalledWith(
      'accountsChanged',
      expect.any(Function),
    )
    expect(walletProvider.on).toHaveBeenCalledWith(
      'chainChanged',
      expect.any(Function),
    )
    expect(walletProvider.on).toHaveBeenCalledWith(
      'disconnect',
      expect.any(Function),
    )
  })
  test('isAuthorized', async () => {
    const accounts = ['0xc61B4Aa62E5FD40cceB08C602Eb5D157b257b49a']
    connector.getAccounts = vi.fn().mockResolvedValue(accounts)

    const result = await connector.isAuthorized()

    expect(result).toEqual(false)
  })

  test('switchChain', async () => {
    const chainId = arbitrumGoerli.id
    const provider = {
      request: vi.fn().mockResolvedValue(undefined),
      supportChainList: vi.fn().mockResolvedValue(
        [polygonMumbai, arbitrumGoerli].map(({ id, name }) => ({
          chainId: id,
          chainName: name,
        })),
      ),
    }
    connector.getProvider = vi.fn().mockResolvedValue(provider)

    const chain = await connector.switchChain({ chainId })

    expect(connector.getProvider).toHaveBeenCalled()
    expect(provider.request).toHaveBeenCalledWith({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: numberToHex(chainId),
          rpcUrls: arbitrumGoerli.rpcUrls.default.http,
        },
      ],
    })
    expect(provider.request).toHaveBeenCalledWith({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: numberToHex(chainId) }],
    })
    expect(chain.id).toEqual(chainId)
  })

  test('catch error when switching to unConfigured chain', async () => {
    const unConfiguredChainId = 111111
    const provider = {
      request: vi.fn().mockResolvedValue(undefined),
      supportChainList: vi.fn().mockResolvedValue(
        [polygonMumbai, arbitrumGoerli].map(({ id, name }) => ({
          chainId: id,
          chainName: name,
        })),
      ),
    }
    connector.getProvider = vi.fn().mockResolvedValue(provider)
    const expectError = new SwitchChainError(
      new Error(`Chain not in config: ${numberToHex(unConfiguredChainId)}`),
    )

    expect(
      connector.switchChain({ chainId: unConfiguredChainId }),
    ).rejects.toThrow(expectError)
  })

  test('catch error when switching to blocto unsupported chain', async () => {
    const unsupportedChainId = arbitrumGoerli.id
    const provider = {
      request: vi.fn().mockResolvedValue(undefined),
      supportChainList: vi.fn().mockResolvedValue(
        [polygonMumbai].map(({ id, name }) => ({
          chainId: id,
          chainName: name,
        })),
      ),
    }
    connector.getProvider = vi.fn().mockResolvedValue(provider)
    const expectError = new SwitchChainError(
      new Error(`Blocto unsupported chain: ${numberToHex(unsupportedChainId)}`),
    )

    expect(
      connector.switchChain({ chainId: unsupportedChainId }),
    ).rejects.toThrow(expectError)
  })
})
