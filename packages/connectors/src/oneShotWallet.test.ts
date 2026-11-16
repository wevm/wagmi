import type * as OwsEvm from '@1shotapi/ows-provider/evm'
import { createConfig, http } from '@wagmi/core'
import { base, mainnet, optimism } from '@wagmi/core/chains'
import { getAddress, numberToHex } from 'viem'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { oneShotWallet } from './oneShotWallet.js'

const ADDRESS = '0x1111111111111111111111111111111111111abc'

class RpcError extends Error {
  constructor(
    message: string,
    public readonly code: number,
  ) {
    super(message)
  }
}

type FakeWallet = {
  granted: boolean
  chainId: number
  supportedChainIds: Set<number>
  rejectNext: boolean
  calls: { method: string; params: unknown }[]
  provider: OwsEvm.EIP1193Provider
  configureCalls: unknown[]
  configureError: Error | undefined
  destroyed: boolean
}

const wallet = vi.hoisted(() => ({
  current: undefined as FakeWallet | undefined,
}))
const createSpy = vi.hoisted(() => vi.fn())

vi.mock('@1shotapi/ows-provider/evm', async (importOriginal) => {
  const actual = await importOriginal<typeof OwsEvm>()
  return {
    ...actual,
    OWSProxyCore: {
      create: createSpy.mockImplementation(async () => {
        const fake = wallet.current!
        return {
          ethereum: fake.provider,
          rpc: async (method: string, params: unknown) => {
            if (method === 'configure') {
              if (fake.configureError) throw fake.configureError
              fake.configureCalls.push(params)
            }
            return null
          },
          destroy: () => {
            fake.destroyed = true
          },
        }
      }),
    },
  }
})

async function makeFakeWallet(): Promise<FakeWallet> {
  const { EIP1193Provider } = await vi.importActual<typeof OwsEvm>(
    '@1shotapi/ows-provider/evm',
  )
  const fake = {
    granted: false,
    chainId: mainnet.id,
    supportedChainIds: new Set<number>([mainnet.id, base.id]),
    rejectNext: false,
    calls: [],
    configureCalls: [],
    configureError: undefined,
    destroyed: false,
  } as unknown as FakeWallet

  fake.provider = new EIP1193Provider(async (method, params) => {
    fake.calls.push({ method, params })
    if (fake.rejectNext) {
      fake.rejectNext = false
      throw new RpcError('User rejected the request', 4001)
    }
    const [first] = params as [Record<string, unknown> | undefined]
    switch (method) {
      case 'eth_requestAccounts':
        fake.granted = true
        return [ADDRESS]
      case 'eth_accounts':
        return fake.granted ? [ADDRESS] : []
      case 'eth_chainId':
        return numberToHex(fake.chainId)
      case 'wallet_switchEthereumChain': {
        const next = Number(first?.chainId)
        if (!fake.supportedChainIds.has(next))
          throw new RpcError('Unrecognized chain', 4902)
        fake.chainId = next
        fake.provider.emit('chainChanged', numberToHex(next))
        return null
      }
      case 'wallet_revokePermissions':
        fake.granted = false
        fake.provider.emit('accountsChanged', [])
        return null
      default:
        throw new RpcError(`Unsupported ${method}`, -32601)
    }
  })
  return fake
}

function setup(parameters: Parameters<typeof oneShotWallet>[0] = {}) {
  const config = createConfig({
    chains: [mainnet, base, optimism],
    connectors: [
      oneShotWallet({ container: {} as HTMLElement, ...parameters }),
    ],
    multiInjectedProviderDiscovery: false,
    storage: null,
    transports: {
      [mainnet.id]: http(),
      [base.id]: http(),
      [optimism.id]: http(),
    },
  })
  return config.connectors[0]!
}

beforeEach(async () => {
  vi.stubGlobal('window', globalThis)
  createSpy.mockClear()
  wallet.current = await makeFakeWallet()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('oneShotWallet', () => {
  it('has wagmi connector metadata', () => {
    const connector = setup()
    expect(connector.id).toBe('oneShotWallet')
    expect(connector.name).toBe('1Shot Wallet')
    expect(connector.type).toBe('oneShotWallet')
    expect(connector.rdns).toBe('com.1shotapi.wallet')
    expect(connector.icon).toMatch(/^data:image\/svg\+xml;base64,/)
  })

  it('connects with eth_requestAccounts and checksums accounts', async () => {
    const connector = setup()
    const result = await connector.connect()
    expect(result).toEqual({
      accounts: [getAddress(ADDRESS)],
      chainId: mainnet.id,
    })
    expect(wallet.current!.calls.map((c) => c.method)).toContain(
      'eth_requestAccounts',
    )
  })

  it('returns account capabilities when withCapabilities is set', async () => {
    const connector = setup()
    const result = await connector.connect({ withCapabilities: true })
    expect(result.accounts).toEqual([
      { address: getAddress(ADDRESS), capabilities: {} },
    ])
  })

  it('reconnects silently with eth_accounts when already granted', async () => {
    wallet.current!.granted = true
    const connector = setup()
    expect(await connector.isAuthorized()).toBe(true)
    const result = await connector.connect({ isReconnecting: true })
    expect(result.accounts).toEqual([getAddress(ADDRESS)])
    expect(wallet.current!.calls.map((c) => c.method)).not.toContain(
      'eth_requestAccounts',
    )
  })

  it('refuses to reconnect after the permission was revoked', async () => {
    const connector = setup()
    expect(await connector.isAuthorized()).toBe(false)
    await expect(connector.connect({ isReconnecting: true })).rejects.toThrow(
      /not connected/i,
    )
  })

  it('maps 4001 to UserRejectedRequestError', async () => {
    const connector = setup()
    wallet.current!.rejectNext = true
    await expect(connector.connect()).rejects.toMatchObject({
      name: 'UserRejectedRequestError',
    })
  })

  it('switches to the requested chain on connect', async () => {
    const connector = setup()
    const result = await connector.connect({ chainId: base.id })
    expect(result.chainId).toBe(base.id)
  })

  it('disconnect revokes eth_accounts so isAuthorized is false afterwards', async () => {
    const connector = setup()
    const onDisconnect = vi.fn()
    connector.emitter.on('disconnect', onDisconnect)
    await connector.connect()

    await connector.disconnect()

    const revoke = wallet.current!.calls.find(
      (c) => c.method === 'wallet_revokePermissions',
    )
    expect(revoke?.params).toEqual([{ eth_accounts: {} }])
    expect(await connector.isAuthorized()).toBe(false)
    // Listeners are detached before revoke, so the wallet's
    // accountsChanged([]) does not emit a second disconnect.
    expect(onDisconnect).not.toHaveBeenCalled()
  })

  it('emits disconnect when the wallet revokes accounts on its own', async () => {
    const connector = setup()
    const onDisconnect = vi.fn()
    connector.emitter.on('disconnect', onDisconnect)
    await connector.connect()

    wallet.current!.provider.emit('accountsChanged', [])
    expect(onDisconnect).toHaveBeenCalledTimes(1)
  })

  it('emits change with checksummed accounts', async () => {
    const connector = setup()
    const onChange = vi.fn()
    connector.emitter.on('change', onChange)
    await connector.connect()

    wallet.current!.provider.emit('accountsChanged', [
      '0x2222222222222222222222222222222222222def',
    ])
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        accounts: [getAddress('0x2222222222222222222222222222222222222def')],
      }),
    )
  })

  it('switchChain switches a supported chain', async () => {
    const connector = setup()
    await connector.connect()
    const chain = await connector.switchChain!({ chainId: base.id })
    expect(chain.id).toBe(base.id)
    expect(await connector.getChainId()).toBe(base.id)
  })

  it('switchChain surfaces SwitchChainError for a chain the wallet does not support (4902)', async () => {
    const connector = setup()
    await connector.connect()
    await expect(
      connector.switchChain!({ chainId: optimism.id }),
    ).rejects.toMatchObject({ name: 'SwitchChainError' })
    const methods = wallet.current!.calls.map((c) => c.method)
    expect(methods).not.toContain('wallet_addEthereumChain')
    expect(await connector.getChainId()).toBe(mainnet.id)
  })

  it('maps a rejected switchChain to UserRejectedRequestError', async () => {
    const connector = setup()
    await connector.connect()
    wallet.current!.rejectNext = true
    await expect(
      connector.switchChain!({ chainId: base.id }),
    ).rejects.toMatchObject({ name: 'UserRejectedRequestError' })
  })

  it('switchChain rejects chains missing from the wagmi config', async () => {
    const connector = setup()
    await expect(connector.switchChain!({ chainId: 424242 })).rejects.toThrow(
      /switch chain/i,
    )
  })

  it('emits change for EVM chainChanged and ignores Bitcoin / Solana ids', async () => {
    const connector = setup()
    const onChange = vi.fn()
    connector.emitter.on('change', onChange)
    await connector.connect()

    wallet.current!.provider.emit('chainChanged', 'Bitcoin')
    wallet.current!.provider.emit('chainChanged', 'solana:mainnet')
    expect(onChange).not.toHaveBeenCalled()

    wallet.current!.provider.emit('chainChanged', '0x2105')
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ chainId: base.id }),
    )
  })

  it('creates the wallet iframe once for concurrent provider requests', async () => {
    const connector = setup()
    await Promise.all([
      connector.getProvider(),
      connector.getProvider(),
      connector.isAuthorized(),
      connector.getChainId(),
    ])
    expect(createSpy).toHaveBeenCalledTimes(1)
  })

  it('retries creation after a failed handshake', async () => {
    const connector = setup()
    createSpy.mockRejectedValueOnce(new Error('handshake timeout'))
    await expect(connector.getProvider()).rejects.toThrow('handshake timeout')
    await expect(connector.getProvider()).resolves.toBeDefined()
    expect(createSpy).toHaveBeenCalledTimes(2)
  })

  it('removes its own container when creation fails, so retries do not leak elements', async () => {
    const appended: { remove(): void }[] = []
    vi.stubGlobal('document', {
      createElement: () => {
        const element = {
          dataset: {} as Record<string, string>,
          remove: () => {
            appended.splice(appended.indexOf(element), 1)
          },
        }
        return element
      },
      body: {
        appendChild: (element: { remove(): void }) => {
          appended.push(element)
          return element
        },
      },
    })
    const connector = setup({ container: undefined })
    createSpy.mockRejectedValueOnce(new Error('handshake timeout'))
    await expect(connector.getProvider()).rejects.toThrow('handshake timeout')
    expect(appended).toHaveLength(0)
    await connector.getProvider()
    expect(appended).toHaveLength(1)
  })

  it('destroys the proxy when configure fails', async () => {
    const connector = setup({ configure: { theme: { accent: '#5B8DEF' } } })
    wallet.current!.configureError = new Error('Invalid params')
    await expect(connector.getProvider()).rejects.toThrow('Invalid params')
    expect(wallet.current!.destroyed).toBe(true)
  })

  it('applies the configure payload once after creation', async () => {
    const connector = setup({ configure: { theme: { accent: '#5B8DEF' } } })
    await connector.getProvider()
    await connector.getProvider()
    expect(wallet.current!.configureCalls).toEqual([
      { theme: { accent: '#5B8DEF' } },
    ])
  })

  it('passes presentation and size options to OWSProxyCore.create', async () => {
    const connector = setup({
      walletUrl: 'https://wallet.example.com',
      presentationMode: 'inline',
      walletSizeX: 400,
    })
    await connector.getProvider()
    const [, url, options] = createSpy.mock.calls[0]!
    expect(url).toBe('https://wallet.example.com')
    expect(options).toMatchObject({
      presentationMode: 'inline',
      walletSizeX: 400,
    })
  })

  it('is not authorized outside the browser', async () => {
    vi.stubGlobal('window', undefined)
    const connector = setup()
    expect(await connector.isAuthorized()).toBe(false)
    expect(createSpy).not.toHaveBeenCalled()
  })
})
