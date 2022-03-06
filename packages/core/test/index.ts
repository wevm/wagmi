import { default as hre } from 'hardhat'
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/src/types'
import { ethers as ethersLib } from 'ethers'

import { WagmiClientConfig, createWagmiClient, defaultChains } from '../src'
import { MockConnector, MockProviderOptions } from '../src/connectors/mock'

type HardhatRuntimeEnvironment = typeof hre & {
  ethers: typeof ethersLib & HardhatEthersHelpers
}
export const ethers = (<HardhatRuntimeEnvironment>hre).ethers

type Config = Partial<WagmiClientConfig>

export const setupWagmiClient = async (config: Config = {}) => {
  const signers = await ethers.getSigners()
  const signer = signers[0]

  // Temporary workaround for getting ENS to work with Hardhat forking
  // https://github.com/NomicFoundation/hardhat/issues/1306
  const provider = ethers.provider
  await provider.getNetwork()
  provider.network.ensAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'

  return createWagmiClient({
    connectors: [getMockConnector({ signer })],
    provider: ethers.provider,
    ...config,
  })
}

export const getMockConnector = (
  options: MockProviderOptions,
  chains = defaultChains,
) => {
  return new MockConnector({
    chains,
    options,
  })
}
