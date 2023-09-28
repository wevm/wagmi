import { useNetwork, useSwitchNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <div>
      <div>
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && ' (unsupported)'}
      </div>
      <br />
      {switchNetwork && (
        <div>
          Switch to:{' '}
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button key={x.id} onClick={() => switchNetwork(x.id)}>
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </button>
            ),
          )}
        </div>
      )}

      <div>{error?.message}</div>
    </div>
  )
}
