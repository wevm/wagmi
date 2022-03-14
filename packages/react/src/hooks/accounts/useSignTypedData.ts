import * as React from 'react'
import { BigNumberish, BytesLike } from 'ethers/lib/ethers'
import { ConnectorNotFoundError, UserRejectedRequestError } from 'wagmi-core'
import { JsonRpcSigner } from '@ethersproject/providers'

import { useContext } from '../../context'
import { useCancel } from '../utils'

type TypedDataDomain = {
  name?: string
  version?: string
  chainId?: BigNumberish
  verifyingContract?: string
  salt?: BytesLike
}

type TypedDataField = {
  name: string
  type: string
}

export type Config = {
  domain?: TypedDataDomain
  types?: Record<string, Array<TypedDataField>>
  value?: Record<string, any>
}

type State = {
  signature?: string
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useSignTypedData = ({ domain, types, value }: Config = {}) => {
  const {
    state: { connector },
  } = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const signTypedData = React.useCallback(
    async (config?: {
      domain?: Config['domain']
      types?: Config['types']
      value?: Config['value']
    }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { domain, types, value }
        if (!config_.domain) throw new Error('domain is required')
        if (!config_.types) throw new Error('type is required')
        if (!config_.value) throw new Error('value is required')
        if (!connector) throw new ConnectorNotFoundError()

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const signer = await connector.getSigner()

        // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
        const signature = await (<JsonRpcSigner>signer)._signTypedData(
          config_.domain,
          config_.types,
          config_.value,
        )

        if (!didCancel) {
          setState((x) => ({ ...x, signature, loading: false }))
        }
        return { data: signature, error: undefined }
      } catch (error_) {
        let error: Error = <Error>error_
        if ((<ProviderRpcError>error_).code === 4001)
          error = new UserRejectedRequestError()
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }

        return { data: undefined, error }
      }
    },
    [cancelQuery, connector, domain, types, value],
  )

  return [
    {
      data: state.signature,
      error: state.error,
      loading: state.loading,
    },
    signTypedData,
  ] as const
}
