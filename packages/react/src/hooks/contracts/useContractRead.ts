import * as React from 'react'
import { CallOverrides, ethers } from 'ethers'

import { useBlockNumber } from '../network-status'
import { useProvider } from '../providers'
import { Config as UseContractConfig, useContract } from './useContract'
import { ReadMethodNames, Reads } from './types'

export type Config<
  Contract extends ethers.Contract,
  MethodName extends ReadMethodNames<Contract>,
> = {
  args?: Parameters<Reads<Contract>[MethodName]>
  overrides?: CallOverrides
  skip?: boolean
  watch?: boolean
}

export type State<
  Contract extends ethers.Contract,
  MethodName extends ReadMethodNames<Contract>,
> = {
  response?: Awaited<ReturnType<Reads<Contract>[MethodName]>>
  error?: Error
  loading?: boolean
}

export const useContractRead = <
  Contract extends ethers.Contract,
  MethodName extends ReadMethodNames<Contract> = ReadMethodNames<Contract>,
>(
  contractConfig: UseContractConfig,
  functionName: MethodName,
  { args, overrides, skip, watch }: Config<Contract, MethodName> = {},
) => {
  const provider = useProvider()
  const contract = useContract<Contract>({
    signerOrProvider: provider,
    ...contractConfig,
  })
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch })
  const [state, setState] = React.useState<State<Contract, MethodName>>({
    loading: false,
  })

  const read = React.useCallback(
    async (config?: {
      args?: Config<Contract, MethodName>['args']
      overrides?: Config<Contract, MethodName>['overrides']
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

        setState((x) => ({
          ...x,
          error: undefined,
          loading: true,
          response: undefined,
        }))
        const response = await contract[functionName](...params)
        setState((x) => ({ ...x, loading: false, response }))
        return { data: response, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        setState((x) => ({ ...x, error, loading: false }))
        return { data: undefined, error }
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
