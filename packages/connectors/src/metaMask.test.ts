import { chain, config } from '@wagmi/test'
import { numberToHex } from 'viem'
import { beforeEach, expect, test, vi } from 'vitest'

import { metaMask } from './metaMask.js'

const mocks = vi.hoisted(() => {
  const provider = {
    request: vi.fn(),
  }
  const instance = {
    accounts: [],
    connect: vi.fn(),
    disconnect: vi.fn(),
    getChainId: vi.fn(),
    getProvider: vi.fn(() => provider),
    switchChain: vi.fn(),
  }
  return {
    createEVMClient: vi.fn(async () => instance),
    instance,
    provider,
  }
})

vi.mock('@metamask/connect-evm', () => ({
  createEVMClient: mocks.createEVMClient,
}))

beforeEach(() => {
  mocks.createEVMClient.mockClear()
  mocks.provider.request.mockReset()
  mocks.provider.request.mockResolvedValue(undefined)
  mocks.instance.accounts = []
  mocks.instance.connect.mockReset()
  mocks.instance.disconnect.mockReset()
  mocks.instance.getChainId.mockReset()
  mocks.instance.getChainId.mockReturnValue(numberToHex(chain.mainnet.id))
  mocks.instance.getProvider.mockClear()
  mocks.instance.switchChain.mockReset()
  mocks.instance.switchChain.mockResolvedValue(undefined)
})

test('setup', () => {
  const connectorFn = metaMask()
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('MetaMask')
})

test('switchChain adds the chain when MetaMask reports it is missing', async () => {
  mocks.instance.switchChain.mockRejectedValueOnce(
    Object.assign(new Error('Unrecognized chain ID'), { code: 4902 }),
  )
  const connectorFn = metaMask()
  const connector = config._internal.connectors.setup(connectorFn)

  const result = await connector.switchChain!({ chainId: chain.mainnet2.id })

  expect(result).toEqual(chain.mainnet2)
  expect(mocks.instance.switchChain).toHaveBeenCalledWith({
    chainId: numberToHex(chain.mainnet2.id),
    chainConfiguration: {
      blockExplorerUrls: [chain.mainnet2.blockExplorers.default.url],
      chainId: numberToHex(chain.mainnet2.id),
      chainName: chain.mainnet2.name,
      iconUrls: undefined,
      nativeCurrency: chain.mainnet2.nativeCurrency,
      rpcUrls: [...chain.mainnet2.rpcUrls.default.http],
    },
  })
  expect(mocks.provider.request).toHaveBeenCalledWith({
    method: 'wallet_addEthereumChain',
    params: [
      {
        blockExplorerUrls: [chain.mainnet2.blockExplorers.default.url],
        chainId: numberToHex(chain.mainnet2.id),
        chainName: chain.mainnet2.name,
        iconUrls: undefined,
        nativeCurrency: chain.mainnet2.nativeCurrency,
        rpcUrls: [chain.mainnet2.rpcUrls.default.http[0]],
      },
    ],
  })
})
