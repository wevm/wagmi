import type { ConnectArgs } from '@wagmi/core'
import { connect as _connect } from '@wagmi/core'

import { useClient } from '../../context'

export type UseConnectArgs = Partial<ConnectArgs>

export const useConnect = ({
  chainId,
  connector,
}: // onError,
// onMutate,
// onSettled,
// onSuccess,
UseConnectArgs = {}) => {
  const client = useClient()

  const connect = (args?: Partial<ConnectArgs>) =>
    _connect({
      chainId: args?.chainId ?? chainId,
      connector: args?.connector ?? (connector || client?.connectors[0]),
    } as ConnectArgs)

  return {
    connect,
    connectors: client?.connectors,
  }
}
