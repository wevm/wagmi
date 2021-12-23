import { useAccount, useNetwork } from 'wagmi'

export const Account = () => {
  const [
    { address, connector: activeConnector, data: accountData },
    disconnect,
  ] = useAccount({ fetchEns: true })
  const [
    { chainId, data: networkData, error: switchNetworkError, chains },
    switchNetwork,
  ] = useNetwork()

  return (
    <>
      <div>
        <button onClick={() => disconnect()}>
          Disconnect from {activeConnector?.name}
        </button>
      </div>

      <div>{accountData?.ens ?? address}</div>
      {accountData?.avatar ? (
        <img src={accountData?.avatar} style={{ height: 40, width: 40 }} />
      ) : (
        <div style={{ height: 40, width: 40 }} />
      )}

      <div>
        <div>
          {networkData?.name ?? chainId}{' '}
          {networkData?.unsupported && '(unsupported)'}
        </div>

        {switchNetwork &&
          chains.map((x) =>
            x.id === chainId ? null : (
              <button key={x.id} onClick={() => switchNetwork(x.id)}>
                Switch to {x.name}
              </button>
            ),
          )}

        {switchNetworkError && switchNetworkError?.message}
      </div>
    </>
  )
}
