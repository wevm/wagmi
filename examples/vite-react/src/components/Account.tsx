import { useAccount, useFeeData, useNetwork, useTransaction } from 'wagmi'

export const Account = () => {
  const [{ connector: activeConnector, data: accountData }, disconnect] =
    useAccount({ fetchEns: true })
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork()

  const formatUnits = 'gwei'
  const [{ data: feeData, loading }] = useFeeData({
    formatUnits,
    once: true,
  })
  useTransaction()

  return (
    <>
      <div>
        <button onClick={() => disconnect()}>
          Disconnect from {activeConnector?.name}
        </button>
      </div>

      <div>{accountData?.ens ?? accountData?.address}</div>
      {accountData?.avatar ? (
        <img src={accountData?.avatar} style={{ height: 40, width: 40 }} />
      ) : (
        <div style={{ height: 40, width: 40 }} />
      )}

      <div>
        <div>
          {networkData.name ?? networkData.chainId}{' '}
          {networkData.unsupported && '(unsupported)'}
        </div>

        <div>
          Gas Price: {feeData?.formatted?.gasPrice} {formatUnits}{' '}
          {loading && '(updating…)'}
        </div>

        {switchNetwork &&
          networkData.chains.map((x) =>
            x.id === networkData.chainId ? null : (
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
