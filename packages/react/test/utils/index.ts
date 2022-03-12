import {
  WagmiClientConfig,
  chain,
  createWagmiClient,
  defaultChains,
} from '@wagmi/core'
import {
  MockConnector,
  MockProviderOptions,
} from '@wagmi/core/src/connectors/mock'
import { JsonRpcProvider } from '@ethersproject/providers'
import { HDNode, mnemonicToSeed } from 'ethers/lib/utils'
import { defaultHardhatNetworkParams } from 'hardhat/internal/core/config/default-config'
import { HardhatNetworkHDAccountsConfig } from 'hardhat/types'

export const getMockConnector = (
  options: MockProviderOptions,
  chains = defaultChains,
) => {
  return new MockConnector({
    chains,
    options,
  })
}

class EthersProviderWrapper extends JsonRpcProvider {
  toJSON() {
    return '<WrappedHardhatProvider>'
  }
}

export const getProvider = () => {
  const url = chain.hardhat.rpcUrls[0]
  const network = {
    chainId: chain.hardhat.id,
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    name: chain.hardhat.name,
  }
  return new EthersProviderWrapper(url, network)
}

const accountsConfig =
  defaultHardhatNetworkParams.accounts as HardhatNetworkHDAccountsConfig
const getSeeds = () => {
  const seeds = []
  const initialIndex = accountsConfig.initialIndex
  const count = accountsConfig.count
  const hdpath = accountsConfig.path
  const mnemonic = accountsConfig.mnemonic
  for (let i = initialIndex; i < initialIndex + count; i++) {
    const seed = mnemonicToSeed(mnemonic, hdpath + i.toString())
    seeds.push(seed)
  }
  return seeds
}
const seeds = getSeeds()

export const getSigners = () => {
  const provider = getProvider()
  const signers = seeds.map((x) => {
    const wallet = HDNode.fromSeed(x)
    return provider.getSigner(wallet.address)
  })
  return signers
}

type Config = Partial<WagmiClientConfig>
export const setupWagmiClient = (config: Config = {}) => {
  return createWagmiClient({
    connectors: [
      getMockConnector({
        signer: getSigners()[0],
      }),
    ],
    provider: getProvider,
    ...config,
  })
}
