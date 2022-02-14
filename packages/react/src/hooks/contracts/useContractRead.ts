import * as React from 'react'
import { CallOverrides, ethers } from 'ethers'
import { Result } from 'ethers/lib/utils'

import { useBlockNumber } from '../network-status'
import { useProvider } from '../providers'
import { Config as UseContractConfig, useContract } from './useContract'
import { useCacheBuster, useCancel } from '../utils'

type Config = {
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
  /** Disables fetching */
  skip?: boolean
  /** Subscribe to changes */
  watch?: boolean
}

type State = {
  response?: Result
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useContractRead = <
  Contract extends ethers.Contract = ethers.Contract,
>(
  contractConfig: UseContractConfig,
  functionName: string,
  { args, overrides, skip, watch }: Config = {},
) => {
  const cacheBuster = useCacheBuster()
  const provider = useProvider()
  const contract = useContract<Contract>({
    signerOrProvider: provider,
    ...contractConfig,
  })
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch })
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const read = React.useCallback(
    async (config?: {
      args?: Config['args']
      overrides?: Config['overrides']
    }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { args, overrides }
        const params = [
          ...(Array.isArray(config_.args)
            ? config_.args
            : config_.args
            ? [config_.args]
            : []),
          ...(config_.overrides ? [config_.overrides] : []),
        ]

        setState((x) => ({
          ...x,
          error: undefined,
          loading: true,
          response: undefined,
        }))
        const response = (await contract[functionName](...params)) as Result
        if (!didCancel) {
          setState((x) => ({ ...x, loading: false, response }))
        }
        return { data: response, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [args, cancelQuery, contract, functionName, overrides],
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    read()
    return cancelQuery
  }, [cacheBuster, cancelQuery, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!watch) return
    if (!blockNumber) return
    read()
    return cancelQuery
  }, [blockNumber, cancelQuery, watch])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    {
      data: state.response,
      error: state.error,
      loading: state.loading,
    },
    read,
  ] as const
}
