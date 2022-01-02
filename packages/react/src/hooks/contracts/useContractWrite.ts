import * as React from 'react'
import { Overrides, ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import { ConnectorNotFoundError, UserRejectedRequestError } from 'wagmi-private'

import { useContext } from '../../context'
import { Config as UseContractConfig, useContract } from './useContract'

type Config = {
  args?: any | any[]
  overrides?: Overrides
}

type State = {
  response?: TransactionResponse
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useContractWrite = <
  Contract extends ethers.Contract = ethers.Contract,
>(
  contractConfig: UseContractConfig,
  functionName: string,
  { args, overrides }: Config = {},
) => {
  const {
    state: { connector },
  } = useContext()

  const contract = useContract<Contract>(contractConfig)
  const [state, setState] = React.useState<State>(initialState)

  const write = React.useCallback(
    async (config?: {
      args?: Config['args']
      overrides: Config['overrides']
    }) => {
      try {
        const config_ = config ?? { args, overrides }
        if (!connector) throw new ConnectorNotFoundError()
        const params = [
          ...(Array.isArray(config_.args)
            ? config_.args
            : config_.args
            ? [config_.args]
            : []),
          ...(config_.overrides ? [config_.overrides] : []),
        ]

        setState((x) => ({ ...x, loading: true }))
        const signer = await connector.getSigner()
        const contract_ = contract.connect(signer)
        const response = await contract_[functionName](...params)
        setState((x) => ({ ...x, loading: false, response }))
        return response
      } catch (error_) {
        let error: Error = <Error>error_
        if ((<ProviderRpcError>error_).code === 4001)
          error = new UserRejectedRequestError()
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [args, connector, contract, functionName, overrides],
  )

  return [
    {
      data: state.response,
      error: state.error,
      loading: state.loading,
    },
    write,
  ] as const
}
