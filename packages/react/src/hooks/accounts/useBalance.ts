import * as React from 'react'
import { BigNumber, ethers, utils } from 'ethers'
import { Unit, erc20ABI } from '@wagmi/private'

import { useProvider } from '../providers'
import { useBlockNumber } from '../network-status'

type Config = {
  address?: string
  formatUnits?: Unit | number
  skip?: boolean
  token?: string
  watch?: boolean
}

type State = {
  balance?: { formatted?: string; symbol?: string; value: BigNumber }
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useBalance = ({
  address,
  formatUnits = 'ether',
  skip,
  token,
  watch,
}: Config) => {
  const provider = useProvider()
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch })
  const [state, setState] = React.useState<State>(initialState)

  const getBalance = React.useCallback(
    async (config: Pick<Config, 'address' | 'formatUnits' | 'token'>) => {
      try {
        if (!config.address) return
        setState((x) => ({ ...x, error: undefined, loading: true }))
        let balance: State['balance']
        if (config.token) {
          const contract = new ethers.Contract(config.token, erc20ABI, provider)
          const value = await contract.balanceOf(config.address)
          const symbol = await contract.symbol()
          balance = {
            formatted: utils.formatUnits(value, config.formatUnits),
            symbol,
            value,
          }
        } else {
          const value = await provider.getBalance(config.address)
          balance = {
            formatted: utils.formatUnits(value, config.formatUnits),
            symbol: 'ETH',
            value,
          }
        }
        setState((x) => ({ ...x, balance, loading: false }))
        return balance
      } catch (_error) {
        const error = _error as Error
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [provider],
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    getBalance({ address, formatUnits, token })
  }, [address, token])
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!watch) return
    if (!blockNumber) return
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
