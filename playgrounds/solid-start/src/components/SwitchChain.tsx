import { useChainId, useChains, useSwitchChain } from '@wagmi/solid'
import { For } from 'solid-js'

export function SwitchChain() {
  const chainId = useChainId()
  const switchChain = useSwitchChain()
  const chains = useChains()

  return (
    <div>
      <h2>Switch Chain</h2>

      <For each={chains()}>
        {(chain) => (
          <button
            disabled={chainId() === chain.id}
            onClick={() => switchChain.mutate({ chainId: chain.id })}
            type="button"
          >
            {chain.name}
          </button>
        )}
      </For>

      {switchChain.error?.message}
    </div>
  )
}
