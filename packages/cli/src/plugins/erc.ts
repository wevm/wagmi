import { erc20ABI, erc4626ABI, erc721ABI } from '@wagmi/core'

import type { Plugin } from '../config'
import type { RequiredBy } from '../types'

type ERCConfig = {
  /**
   * EIP-20: Token Standard
   *
   * https://eips.ethereum.org/EIPS/eip-20
   *
   * @default true
   */
  20?: boolean
  /**
   * EIP-721: Non-Fungible Token Standard
   *
   * https://eips.ethereum.org/EIPS/eip-721
   *
   * @default true
   */
  721?: boolean
  /**
   * EIP-4626: Tokenized Vaults
   *
   * https://eips.ethereum.org/EIPS/eip-4626
   *
   * @default false
   */
  4626?: boolean
}

type ERCResult = RequiredBy<Plugin, 'contracts'>

/**
 * Add popular ERC ABIs to contracts.
 */
export function erc(config: ERCConfig = {}): ERCResult {
  const standards = {
    20: true,
    721: true,
    4626: false,
    ...config,
  }
  return {
    contracts() {
      const contracts = []
      if (standards[20])
        contracts.push({
          name: 'ERC20',
          abi: erc20ABI,
        })
      if (standards[721])
        contracts.push({
          name: 'ERC721',
          abi: erc721ABI,
        })
      if (standards[4626])
        contracts.push({
          name: 'ERC4626',
          abi: erc4626ABI,
        })
      return contracts
    },
    name: 'ERC',
  }
}
