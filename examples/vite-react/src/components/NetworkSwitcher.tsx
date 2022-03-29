import { useNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const { activeChain, chains, error, switchNetwork } = useNetwork()

  return (
    <div>
      <div>
        Connected to {activeChain?.name ?? activeChain?.id}{' '}
        {activeChain?.unsupported && '(unsupported)'}
      </div>

      {switchNetwork &&
        chains.map((x) =>
          x.id === activeChain?.id ? null : (
            <button key={x.id} onClick={() => switchNetwork(x.id)}>
              Switch to {x.name}
            </button>
          ),
        )}

      <div>{error && error.message}</div>
    </div>
  )
}
