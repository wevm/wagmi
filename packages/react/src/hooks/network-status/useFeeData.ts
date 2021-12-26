import * as React from 'react'
import { BigNumberish, utils } from 'ethers'
import { FeeData } from '@ethersproject/providers'
import { Unit } from '@wagmi/private'

import { useProvider } from '../providers'
import { useBlockNumber } from './useBlockNumber'

type State = {
  feeData?: FeeData
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

type Config = {
  formatUnits?: Unit | number
  once?: boolean
  skip?: boolean
}

export const useFeeData = ({
  formatUnits = 'wei',
  once,
  skip,
}: Config = {}) => {
  const provider = useProvider()
  const [{ data: blockNumber }] = useBlockNumber({ once, skip: true })
  const [state, setState] = React.useState<State>(initialState)

  const getFeeData = React.useCallback(async () => {
    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      const feeData = await provider.getFeeData()
      setState((x) => ({ ...x, feeData, loading: false }))
      return feeData
    } catch (_error) {
      const error = _error as Error
      setState((x) => ({ ...x, error, loading: false }))
      return error
    }
  }, [provider])

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    getFeeData()
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (once) return
    if (!blockNumber) return
    getFeeData()
  }, [blockNumber])
  /* eslint-enable react-hooks/exhaustive-deps */

  const formatted = state.feeData
    ? {
        gasPrice: utils.formatUnits(
          <BigNumberish>state.feeData.gasPrice,
          formatUnits,
        ),
        maxFeePerGas: utils.formatUnits(
          <BigNumberish>state.feeData.maxFeePerGas,
          formatUnits,
        ),
        maxPriorityFeePerGas: utils.formatUnits(
          <BigNumberish>state.feeData.maxPriorityFeePerGas,
          formatUnits,
        ),
      }
    : undefined

  return [
    {
      data: state.feeData ? { ...state.feeData, formatted } : undefined,
      loading: state.loading,
      error: state.error,
    },
    getFeeData,
  ] as const
}
