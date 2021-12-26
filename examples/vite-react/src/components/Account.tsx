import { useAccount, useBalance, useFeeData, useNetwork, useToken } from 'wagmi'

export const Account = () => {
  const [{ connector: activeConnector, data: accountData }, disconnect] =
    useAccount({ fetchEns: true })
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork()

  const formatUnits = 'gwei'
  const [{ data: feeData }] = useFeeData({ formatUnits, watch: true })
  const [{ data: balanceData }] = useBalance({
    address: accountData?.address,
    watch: true,
  })
  const [{ data: tokenData, error: tokenError }, watchToken] = useToken({
    address: '0x622236bb180256b6ae1a935dae08dc0356141632',
  })

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
          {networkData.chain?.name ?? networkData.chain?.id}{' '}
          {networkData.unsupported && '(unsupported)'}
        </div>

        <div>
          Balance: {balanceData?.formatted} {balanceData?.symbol}{' '}
        </div>

        <div>
          Gas Price: {feeData?.formatted?.gasPrice} {formatUnits}{' '}
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

      <br />

      <div>
        {tokenData?.symbol && (
          <button onClick={async (_event) => await watchToken(tokenData)}>
            Add ${tokenData.symbol} to wallet
          </button>
        )}
        Total supply: {tokenData?.totalSupply?.formatted}
        {tokenError && tokenError}
      </div>
    </>
  )
}
