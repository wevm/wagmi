import { getNetwork, switchNetwork, watchNetwork } from '@wagmi/core'
import * as React from 'react'

export const NetworkSwitcher = () => {
  const [networkData, setNetworkData] = React.useState(getNetwork())
  React.useEffect(() => {
    const unwatch = watchNetwork(setNetworkData)
    return unwatch
  }, [])

  const [switchNetworkError, setSwitchNetworkError] = React.useState<any>()
  const handleSwitchNetwork = React.useCallback(async (chainId) => {
    setSwitchNetworkError(undefined)
    try {
      const chain = await switchNetwork({ chainId })
      setNetworkData((x) => ({ ...x, chain }))
    } catch (err) {
      setSwitchNetworkError(err)
    }
  }, [])

  return (
    <div>
      <div>
        Connected to {networkData.chain?.name ?? networkData.chain?.id}{' '}
        {networkData.chain?.unsupported && '(unsupported)'}
      </div>

      {networkData?.chains?.map((x) =>
        x.id === networkData.chain?.id ? null : (
          <button key={x.id} onClick={() => handleSwitchNetwork(x.id)}>
            Switch to {x.name}
          </button>
        ),
      )}

      {switchNetworkError && switchNetworkError?.message}
    </div>
  )
}
