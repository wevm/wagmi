import * as React from 'react'
import { BigNumber, ethers, utils } from 'ethers'
import { Unit, erc20ABI } from 'wagmi-private'

import { useProvider } from '../providers'
import { useBlockNumber } from '../network-status'
import { useCacheBuster } from '../utils'

export type Config = {
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
        const _config = config ?? { address, formatUnits, token }
        if (!_config.address) throw new Error('address is required')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const _formatUnits = _config.formatUnits ?? 'ether'

        let balance: State['balance']
        if (_config.token) {
          const contract = new ethers.Contract(
            _config.token,
            erc20ABI,
            provider,
          )
          const value = await contract.balanceOf(_config.address)
          const symbol = await contract.symbol()
          balance = {
            formatted: utils.formatUnits(value, _formatUnits),
            symbol,
            value,
          }
        } else {
          const value = await provider.getBalance(_config.address)
          balance = {
            formatted: utils.formatUnits(value, _formatUnits),
            symbol: 'ETH',
            value,
          }
        }

        setState((x) => ({ ...x, balance, loading: false }))
        return balance
      } catch (err) {
        const error = <Error>err
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
