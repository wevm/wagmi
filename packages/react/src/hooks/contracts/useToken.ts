import * as React from 'react'
import { BigNumber, ethers, utils } from 'ethers'
import { Unit, erc20ABI } from '@wagmi/private'

import { useContext } from '../../context'
import { useProvider } from '../providers'

type Config = {
  address: string
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

export const useToken = ({ address, formatUnits = 'ether', skip }: Config) => {
  const {
    state: { connector },
  } = useContext()

  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const getToken = React.useCallback(
    async ({
      address,
      formatUnits = 'ether',
    }: Pick<Config, 'address' | 'formatUnits'>) => {
      try {
        setState((x) => ({ ...x, error: undefined, loading: true }))
        const contract = new ethers.Contract(address, erc20ABI, provider)
        const decimals = await contract.decimals()
        const totalSupply = await contract.totalSupply()
        const symbol = await contract.symbol()
        const token = {
          address,
          decimals,
          symbol,
          totalSupply: {
            formatted: utils.formatUnits(totalSupply, formatUnits),
            value: totalSupply,
          },
        }
        setState((x) => ({ ...x, token, loading: false }))
        return token
      } catch (_error) {
        const error = _error as Error
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [provider],
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
        setState((x) => ({ ...x, error: undefined }))
        await connector.watchAsset(token)
        return true
      } catch (_error) {
        const error = _error as Error
        setState((x) => ({ ...x, error }))
        return error
      }
    },
    [connector],
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    getToken({ address, formatUnits })
  }, [address])
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
