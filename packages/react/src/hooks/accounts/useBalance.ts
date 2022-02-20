import * as React from 'react'
import { BigNumber } from 'ethers'
import {
  BalanceActionArgs,
  balanceAction,
  defaultChains,
  defaultL2Chains,
} from 'wagmi-core'

import { useContext } from '../../context'
import { useProvider } from '../providers'
import { useBlockNumber } from '../network-status'
import { useCacheBuster, useCancel } from '../utils'

export type Config = {
  /** Disables fetching */
  skip?: boolean
  /** Subscribe to changes */
  watch?: boolean
} & Partial<BalanceActionArgs['config']>

type State = {
  balance?: {
    decimals: number
    formatted: string
    symbol: string
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

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const balance = await balanceAction({
          chains: [
            ...(connector?.chains ?? []),
            ...defaultChains,
            ...defaultL2Chains,
          ],
          config: <BalanceActionArgs['config']>config_,
          provider,
        })
        if (!didCancel) setState((x) => ({ ...x, balance, loading: false }))

        return { data: balance, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) setState((x) => ({ ...x, error, loading: false }))
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
