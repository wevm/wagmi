import { Connector, connect } from '@wagmi/core'
import * as React from 'react'

import { useIsMounted } from '../hooks'
import { wagmiClient } from '../wagmi'

type State = {
  connector?: Connector
  error?: Error
  loading: boolean
}

export const Connect = () => {
  const isMounted = useIsMounted()
  const [state, setState] = React.useState<State>({
    loading: false,
  })
  const handleConnect = React.useCallback(
    (connector: Connector) => async () => {
      try {
        setState((x) => ({ ...x, loading: true, connector }))
        await connect(connector)
        setState((x) => ({ ...x, loading: false }))
      } catch (error: any) {
        setState((x) => ({ ...x, loading: false, error }))
      }
    },
    [],
  )

  React.useEffect(() => {
    // @ts-expect-error TODO
    const handleConnectionChanged = ({ connecting, connector }) =>
      setState((x) => ({ ...x, loading: connecting, connector }))

    wagmiClient.addListener('autoConnectionChanged', handleConnectionChanged)
    return () => {
      wagmiClient.removeListener(
        'autoConnectionChanged',
        handleConnectionChanged,
      )
    }
  }, [])

  return (
    <div>
      <div>
        {wagmiClient.connectors?.map((x) => (
          <button
            disabled={isMounted && !x.ready}
            key={x.name}
            onClick={handleConnect(x)}
          >
            {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && ' (unsupported)'}
            {state.loading && x.name === state.connector?.name && '…'}
          </button>
        ))}
      </div>
      <div>{state.error && (state.error?.message ?? 'Failed to connect')}</div>
    </div>
  )
}
