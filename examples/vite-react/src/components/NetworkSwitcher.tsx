import { useNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const {
    activeChain,
    chains,
    error,
    isLoading,
    pendingChainId,
    switchNetwork,
  } = useNetwork()

  if (!activeChain) return null

  return (
    <div>
      <div>
        Connected to {activeChain?.name ?? activeChain?.id}
        {activeChain?.unsupported && ' (unsupported)'}
      </div>

      {switchNetwork && (
        <div>
          {chains.map((x) =>
            x.id === activeChain?.id ? null : (
              <button key={x.id} onClick={() => switchNetwork(x.id)}>
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </button>
            ),
          )}
        </div>
      )}

      <div>{error && error.message}</div>
    </div>
  )
}
