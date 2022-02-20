import { providers } from 'ethers'
import { infuraApiKey } from 'wagmi-testing'

export const getProvider = ({ chainId }: { chainId?: number } = {}) =>
  new providers.InfuraProvider(chainId ?? 1, infuraApiKey)
