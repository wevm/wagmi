import { useAccount, useConnect, useNetwork } from 'wagmi'

export const App = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchBalance: true,
    fetchEns: true,
  })
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork()

  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()

  if (accountData?.address)
    return (
      <main>
        <div>
          <button onClick={() => disconnect()}>
            Disconnect from {accountData?.connector?.name}
          </button>
        </div>

        <div>
          {accountData?.ens?.name ?? accountData?.address}
          {accountData?.ens ? ` (${accountData?.address})` : null}
        </div>
        {accountData?.ens?.avatar ? (
          <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
        ) : (
          <div style={{ height: 40, width: 40 }} />
        )}

        <div>
          <div>
            {networkData.chain?.name ?? networkData.chain?.id}{' '}
            {networkData.chain?.unsupported && '(unsupported)'}
          </div>

          <div>
            Balance: {accountData?.balance?.formatted}{' '}
            {accountData?.balance?.symbol}{' '}
          </div>

          {switchNetwork &&
            networkData.chains.map((x) =>
              x.id === networkData.chain?.id ? null : (
                <button key={x.id} onClick={() => switchNetwork(x.id)}>
                  Switch to {x.name}
                </button>
              ),
            )}

          {switchNetworkError && switchNetworkError?.message}
        </div>
      </main>
    )

  return (
    <main>
      <div>
        {connectors.map((x) => (
          <button key={x.name} onClick={() => connect(x)}>
            {x.name}
            {loading && x.name === connector?.name && '…'}
          </button>
        ))}
      </div>
      <div>{error && (error?.message ?? 'Failed to connect')}</div>
    </main>
  )
}
