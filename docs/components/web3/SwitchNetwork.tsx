import { Button } from 'degen'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'

export function SwitchNetwork() {
  const { chain: activeChain } = useNetwork()
  const { switchNetwork, isLoading } = useSwitchNetwork()

  if (!activeChain) return null
  return (
    <Button
      onClick={() =>
        activeChain.id === mainnet.id
          ? switchNetwork?.(goerli.id)
          : switchNetwork?.(mainnet.id)
      }
      variant="transparent"
      size="small"
      width="full"
      center
      disabled={isLoading}
      loading={isLoading}
    >
      Connect to{' '}
      {activeChain?.id === mainnet.id ? 'Testnet (Goerli)' : 'Mainnet'}
    </Button>
  )
}
