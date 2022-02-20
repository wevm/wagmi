import { ethers, utils } from 'ethers'

import { defaultChains, defaultL2Chains, erc20ABI } from '../../constants'
import { Balance, Chain, Unit, WithProvider } from '../../types'

export type BalanceActionArgs = WithProvider<{
  /** Chains to use for looking up native currency */
  chains?: Chain[]
  /** Configuration to use for balance */
  config: {
    /** Address or ENS name */
    addressOrName: string
    /** Units for formatting output */
    formatUnits?: Unit | number
    /** ERC-20 address */
    token?: string
  }
}>

export type BalanceActionResult = Balance

export const balanceAction = async ({
  chains = [...defaultChains, ...defaultL2Chains],
  config,
  provider,
}: BalanceActionArgs): Promise<BalanceActionResult> => {
  const unit = config.formatUnits ?? 'ether'

  if (config.token) {
    const contract = new ethers.Contract(config.token, erc20ABI, provider)
    const [value, decimals, symbol] = await Promise.all([
      contract.balanceOf(config.addressOrName),
      contract.decimals(),
      contract.symbol(),
    ])
    return {
      decimals,
      formatted: utils.formatUnits(value, unit),
      symbol,
      unit,
      value,
    }
  }

  const value = await provider.getBalance(config.addressOrName)
  const chain = chains.find((x) => x.id === provider.network.chainId)
  return {
    decimals: chain?.nativeCurrency?.decimals ?? 18,
    formatted: utils.formatUnits(value, unit),
    symbol: chain?.nativeCurrency?.symbol ?? 'ETH',
    unit,
    value,
  }
}
