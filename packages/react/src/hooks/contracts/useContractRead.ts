import * as React from 'react'
import { Overrides, ethers } from 'ethers'
import { Result } from 'ethers/lib/utils'

import { useBlockNumber } from '../network-status'
import { useProvider } from '../providers'
import { Config as UseContractConfig, useContract } from './useContract'

type Config = {
  args?: any | any[]
  overrides?: Overrides
  skip?: boolean
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
  const provider = useProvider()
  const contract = useContract<Contract>({
    signerOrProvider: provider,
    ...contractConfig,
  })
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch })
  const [state, setState] = React.useState<State>(initialState)

  const read = React.useCallback(
    async (config?: {
      args?: Config['args']
      overrides?: Config['overrides']
    }) => {
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

        setState((x) => ({ ...x, loading: true }))
        const response = await contract[functionName](...params)
        setState((x) => ({ ...x, loading: false, response }))
        return response as Result
      } catch (error_) {
        const error = <Error>error_
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [args, contract, functionName, overrides],
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return

    let didCancel = false
    if (didCancel) return
    read({ args, overrides })

    return () => {
      didCancel = true
    }
  }, [args, overrides, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!watch) return
    if (!blockNumber) return
    read({ args, overrides })
  }, [blockNumber])
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
