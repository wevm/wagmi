import * as React from 'react'
import { BigNumber, ethers, utils } from 'ethers'
import { Unit, erc20ABI } from '@wagmi/core'

import { useContext } from '../../context'
import { useProvider } from '../providers'
import { useCancel } from '../utils'

export type Config = {
  address?: string
  formatUnits?: Unit | number
  skip?: boolean
}

type State = {
  token?: {
    decimals: number
    symbol: string
    totalSupply: {
      formatted: string
      value: BigNumber
    }
  }
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useToken = ({
  address,
  formatUnits = 'ether',
  skip,
}: Config = {}) => {
  const {
    state: { connector },
  } = useContext()
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const getToken = React.useCallback(
    async (config?: {
      address: string
      formatUnits?: Config['formatUnits']
    }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? {
          address,
          formatUnits,
        }
        if (!config_.address) throw new Error('address is required')

        const contract = new ethers.Contract(
          config_.address,
          erc20ABI,
          provider,
        )
        const formatUnits_ = config_.formatUnits ?? 'ether'

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const [symbol, decimals, totalSupply] = await Promise.all([
          contract.symbol(),
          contract.decimals(),
          contract.totalSupply(),
        ])
        const token = {
          address: config_.address,
          decimals,
          symbol,
          totalSupply: {
            formatted: utils.formatUnits(totalSupply, formatUnits_),
            value: totalSupply,
          },
        }
        if (!didCancel) {
          setState((x) => ({ ...x, token, loading: false }))
        }
        return { data: token, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [address, cancelQuery, formatUnits, provider],
  )

  const watchToken = React.useCallback(
    async (token: {
      address: string
      decimals?: number
      image?: string
      symbol: string
    }) => {
      if (!connector?.watchAsset) return false
      try {
        await connector.watchAsset(token)
        return true
      } catch (error) {
        return <Error>error
      }
    },
    [connector],
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !address) return
    getToken({ address, formatUnits })
    return cancelQuery
  }, [address, cancelQuery, formatUnits, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    {
      data: state.token ? { ...state.token, address } : undefined,
      error: state.error,
      loading: state.loading,
    },
    watchToken,
    getToken,
  ] as const
}
