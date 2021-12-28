import * as React from 'react'
import { BigNumber, ethers, utils } from 'ethers'
import { Unit, erc20ABI } from '@wagmi/private'

import { useContext } from '../../context'
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
  balance?: { formatted: string; symbol: string; value: BigNumber }
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
  const {
    state: { data },
  } = useContext()
  const provider = useProvider()
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch })
  const [state, setState] = React.useState<State>(initialState)

  const getBalance = React.useCallback(
    async ({
      address,
      formatUnits = 'ether',
      token,
    }: Pick<Config, 'address' | 'formatUnits' | 'token'>) => {
      try {
        if (!address) return
        setState((x) => ({ ...x, error: undefined, loading: true }))

        let balance: State['balance']
        if (token) {
          const contract = new ethers.Contract(token, erc20ABI, provider)
          const value = await contract.balanceOf(address)
          const symbol = await contract.symbol()
          balance = {
            formatted: utils.formatUnits(value, formatUnits),
            symbol,
            value,
          }
        } else {
          const value = await provider.getBalance(address)
          balance = {
            formatted: utils.formatUnits(value, formatUnits),
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

  // Fetch balance when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    getBalance({ address, formatUnits, token })
  }, [address, token, data?.chainId])
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
