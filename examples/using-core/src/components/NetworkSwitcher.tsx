import { getNetwork, watchNetwork } from 'wagmi-core'
import * as React from 'react'

export const NetworkSwitcher = () => {
  // const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
  //   useNetwork()
  const [networkData, setNetworkData] = React.useState(getNetwork)
  React.useEffect(() => {
    const unwatch = watchNetwork(setNetworkData)
    return unwatch
  }, [])

  return (
    <div>
      <div>
        Connected to {networkData.chain?.name ?? networkData.chain?.id}{' '}
        {networkData.chain?.unsupported && '(unsupported)'}
      </div>

      {/* {switchNetwork &&
        networkData.chains.map((x) =>
          x.id === networkData.chain?.id ? null : (
            <button key={x.id} onClick={() => switchNetwork(x.id)}>
              Switch to {x.name}
            </button>
          ),
        )}

      {switchNetworkError && switchNetworkError?.message} */}
    </div>
  )
}
