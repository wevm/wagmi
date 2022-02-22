import { wagmiClient } from '../../client'

export async function autoConnect() {
  if (wagmiClient.connectors) {
    const sorted = wagmiClient.lastUsedConnector
      ? [...wagmiClient.connectors].sort((x) =>
          x.name === wagmiClient.lastUsedConnector ? -1 : 1,
        )
      : wagmiClient.connectors

    wagmiClient.setState((x) => ({
      ...x,
      connecting: true,
    }))
    for (const connector of sorted) {
      if (!connector.ready || !connector.isAuthorized) continue
      const isAuthorized = await connector.isAuthorized()
      if (!isAuthorized) continue

      const data = await connector.connect()
      wagmiClient.setState((x) => ({ ...x, data, connector }))
      break
    }
    wagmiClient.setState((x) => ({
      ...x,
      connecting: false,
    }))
  }
  return
}
