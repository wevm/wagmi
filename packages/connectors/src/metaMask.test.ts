import { createConfig, reconnect } from '@wagmi/core'
import { chain, config, Provider } from '@wagmi/test'
import { getAddress, http } from 'viem'
import { beforeEach, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  const sdkProvider = {
    emit: vi.fn(),
    request: vi.fn(),
  }
  const sdkInstance = {
    accounts: [],
    connect: vi.fn(async () => ({
      accounts: ['0x0000000000000000000000000000000000000001'],
    })),
    disconnect: vi.fn(),
    getChainId: vi.fn(() => 1),
    getProvider: vi.fn(() => sdkProvider),
    switchChain: vi.fn(),
  }
  return {
    createEVMClient: vi.fn(() => sdkInstance),
    sdkInstance,
    sdkProvider,
  }
})

vi.mock('@metamask/connect-evm', () => ({
  createEVMClient: mocks.createEVMClient,
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.resetModules()
  config._internal.mipd?.clear()
})

test('setup', async () => {
  const { metaMask } = await import('./metaMask.js')
  const connectorFn = metaMask()
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('MetaMask')
})

test('uses announced EIP-6963 MetaMask provider for pre-connect probes', async () => {
  const { metaMask } = await import('./metaMask.js')
  const accounts = ['0xa0cf798816d4b9b9866b5330eea46a18382f251e']
  const provider = mockEip6963Provider(({ method }) => {
    if (method === 'eth_accounts') return accounts
    if (method === 'eth_chainId') return '0x1'
    return null
  })
  const unwatch = announceProviderOnRequest(provider)

  try {
    const connector = config._internal.connectors.setup(metaMask())

    await expect(connector.getProvider()).resolves.toBe(provider)
    await expect(connector.isAuthorized()).resolves.toBe(true)
    await expect(connector.getAccounts()).resolves.toEqual(
      accounts.map((account) => getAddress(account)),
    )
    await expect(connector.getChainId()).resolves.toBe(1)

    expect(mocks.createEVMClient).not.toHaveBeenCalled()
  } finally {
    unwatch()
  }
})

test('reconnect does not load SDK for unauthorized extension users', async () => {
  const { metaMask } = await import('./metaMask.js')
  const provider = mockEip6963Provider(({ method }) => {
    if (method === 'eth_accounts') return []
    if (method === 'eth_chainId') return '0x1'
    return null
  })
  const unwatch = announceProviderOnRequest(provider)

  try {
    const reconnectConfig = createConfig({
      chains: [chain.mainnet],
      connectors: [metaMask()],
      storage: null,
      transports: { [chain.mainnet.id]: http() },
    })

    await expect(reconnect(reconnectConfig)).resolves.toEqual([])
    expect(provider.request).toHaveBeenCalledWith({ method: 'eth_accounts' })
    expect(mocks.createEVMClient).not.toHaveBeenCalled()
  } finally {
    unwatch()
  }
})

test('falls back to SDK when no EIP-6963 MetaMask provider is announced', async () => {
  const { metaMask } = await import('./metaMask.js')
  const connector = config._internal.connectors.setup(metaMask())

  await expect(connector.getProvider()).resolves.toBe(mocks.sdkProvider)

  expect(mocks.createEVMClient).toHaveBeenCalledTimes(1)
})

test('forces skipAutoAnnounce when loading the SDK', async () => {
  const { metaMask } = await import('./metaMask.js')
  // wagmi already surfaces the native MetaMask provider via MIPD/EIP-6963, so
  // the connector must always opt the SDK out of announcing a second provider.
  const connector = config._internal.connectors.setup(metaMask())

  await connector.getProvider()

  expect(mocks.createEVMClient).toHaveBeenCalledWith(
    expect.objectContaining({ skipAutoAnnounce: true }),
  )
})

test('connect still loads SDK when EIP-6963 MetaMask provider is announced', async () => {
  const { metaMask } = await import('./metaMask.js')
  const provider = mockEip6963Provider(({ method }) => {
    if (method === 'eth_accounts') return []
    if (method === 'eth_chainId') return '0x1'
    return null
  })
  const unwatch = announceProviderOnRequest(provider)

  try {
    const connector = config._internal.connectors.setup(metaMask())

    await expect(connector.connect()).resolves.toEqual({
      accounts: ['0x0000000000000000000000000000000000000001'],
      chainId: 1,
    })

    expect(mocks.createEVMClient).toHaveBeenCalledTimes(1)
    expect(mocks.sdkInstance.connect).toHaveBeenCalled()
  } finally {
    unwatch()
  }
})

function announceProviderOnRequest(provider: Provider.Provider) {
  const event = new CustomEvent('eip6963:announceProvider', {
    detail: Object.freeze({
      info: {
        icon: 'data:image/svg+xml,<svg></svg>',
        name: 'MetaMask',
        rdns: 'io.metamask',
        uuid: 'metaMask',
      },
      provider,
    }),
  })
  window.dispatchEvent(event)

  const announce = () => window.dispatchEvent(event)
  window.addEventListener('eip6963:requestProvider', announce)
  return () => window.removeEventListener('eip6963:requestProvider', announce)
}

function mockEip6963Provider(request: (args: { method: string }) => unknown) {
  const provider = Provider.from({
    request: vi.fn(async (args: { method: string }) => request(args)),
  })
  vi.spyOn(provider, 'request')
  return provider
}
