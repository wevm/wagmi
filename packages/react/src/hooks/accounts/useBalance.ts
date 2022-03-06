import * as React from 'react'
import { BigNumber, ethers, utils } from 'ethers'
import { Unit, defaultChains, defaultL2Chains, erc20ABI } from '@wagmi/core'

import { useContext } from '../../context'
import { useProvider } from '../providers'
import { useBlockNumber } from '../network-status'
import { useCacheBuster, useCancel } from '../utils'

export type Config = {
  /** Address or ENS name */
  addressOrName?: string
  /** Units for formatting output */
  formatUnits?: Unit | number
  /** Disables fetching */
  skip?: boolean
  /** ERC-20 address */
  token?: string
  /** Subscribe to changes */
  watch?: boolean
}

type State = {
  balance?: {
    decimals: number
    formatted: string
    symbol: string
    unit: Unit | number
    value: BigNumber
  }
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useBalance = ({
  addressOrName,
  formatUnits = 'ether',
  skip,
  token,
  watch,
}: Config = {}) => {
  const {
    state: { connector },
  } = useContext()
  const cacheBuster = useCacheBuster()
  const provider = useProvider()
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch })
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const getBalance = React.useCallback(
    async (config?: {
      addressOrName: string
      formatUnits?: Config['formatUnits']
      token?: Config['token']
    }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? {
          addressOrName,
          formatUnits,
          token,
        }
        if (!config_.addressOrName) throw new Error('address is required')

        const formatUnits_ = config_.formatUnits ?? 'ether'

        setState((x) => ({ ...x, error: undefined, loading: true }))
        let balance: State['balance']
        if (config_.token) {
          const contract = new ethers.Contract(
            config_.token,
            erc20ABI,
            provider,
          )
          const [value, decimals, symbol] = await Promise.all([
            contract.balanceOf(config_.addressOrName),
            contract.decimals(),
            contract.symbol(),
          ])
          balance = {
            decimals,
            formatted: utils.formatUnits(value, formatUnits_),
            symbol,
            unit: formatUnits_,
            value,
          }
        } else {
          const value = await provider.getBalance(config_.addressOrName)
          const chain = [
            ...(connector?.chains ?? []),
            ...defaultChains,
            ...defaultL2Chains,
          ].find((x) => x.id === provider.network.chainId)
          balance = {
            decimals: chain?.nativeCurrency?.decimals ?? 18,
            formatted: utils.formatUnits(value, formatUnits_),
            symbol: chain?.nativeCurrency?.symbol ?? 'ETH',
            unit: formatUnits_,
            value,
          }
        }

        if (!didCancel) {
          setState((x) => ({ ...x, balance, loading: false }))
        }

        return { data: balance, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [addressOrName, cancelQuery, connector, formatUnits, provider, token],
  )

  // Fetch balance when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !addressOrName) return
    getBalance({ addressOrName, formatUnits, token })
    return cancelQuery
  }, [addressOrName, cacheBuster, cancelQuery, skip, token])
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!watch) return
    if (!blockNumber) return
    if (!addressOrName) return
    getBalance({ addressOrName, formatUnits, token })
  }, [blockNumber])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    {
      data: state.balance,
      error: state.error,
      loading: state.loading,
    },
    getBalance,
  ] as const
}
