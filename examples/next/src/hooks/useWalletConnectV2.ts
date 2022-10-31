import * as React from 'react'
import { Connector, useConnect } from 'wagmi'
import { WalletConnectConnectorV2 } from 'wagmi/connectors/walletConnectV2'

export function useWalletConnectV2() {
  const [uri, setUri] = React.useState('')
  const { connectors } = useConnect()

  React.useEffect(() => {
    const wc: Connector<WalletConnectConnectorV2> | undefined = connectors.find(
      (connector: Connector) => connector instanceof WalletConnectConnectorV2,
    )

    wc?.on('message', (payload: any) => {
      if (payload.type === 'display_uri') {
        setUri(payload.data as string)
      }
    })

    return () => {
      wc?.off('message')
    }
  }, [connectors])

  return { uri, setUri }
}
