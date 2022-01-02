import * as React from 'react'
import { BigNumber, ethers, utils } from 'ethers'
import { Unit, erc20ABI } from 'wagmi-private'

import { useProvider } from '../providers'
import { useBlockNumber } from '../network-status'
import { useCacheBuster } from '../utils'

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
  balance?: { formatted: string; symbol: string; value: BigNumber }
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useBalance = ({
  addressOrName: address,
  formatUnits = 'ether',
  skip,
  token,
  watch,
}: Config = {}) => {
  const cacheBuster = useCacheBuster()
  const provider = useProvider()
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch })
  const [state, setState] = React.useState<State>(initialState)

  const getBalance = React.useCallback(
    async (config?: {
      address: string
      formatUnits?: Config['formatUnits']
      token?: Config['token']
    }) => {
      try {
        const config_ = config ?? { address, formatUnits, token }
        if (!config_.address) throw new Error('address is required')

        const formatUnits_ = config_.formatUnits ?? 'ether'

        setState((x) => ({ ...x, error: undefined, loading: true }))
        let balance: State['balance']
        if (config_.token) {
          const contract = new ethers.Contract(
            config_.token,
            erc20ABI,
            provider,
          )
          const value = await contract.balanceOf(config_.address)
          const symbol = await contract.symbol()
          balance = {
            formatted: utils.formatUnits(value, formatUnits_),
            symbol,
            value,
          }
        } else {
          const value = await provider.getBalance(config_.address)
          balance = {
            formatted: utils.formatUnits(value, formatUnits_),
            symbol: 'ETH',
            value,
          }
        }

        setState((x) => ({ ...x, balance, loading: false }))
        return balance
      } catch (error_) {
        const error = <Error>error_
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [address, formatUnits, provider, token],
  )

  // Fetch balance when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !address) return

    let didCancel = false
    if (didCancel) return
    getBalance({ address, formatUnits, token })

    return () => {
      didCancel = true
    }
  }, [address, cacheBuster, skip, token])
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!watch) return
    if (!blockNumber) return
    if (!address) return
    getBalance({ address, formatUnits, token })
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
