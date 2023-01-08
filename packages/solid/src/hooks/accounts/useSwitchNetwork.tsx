import type { SwitchNetworkArgs } from '@wagmi/core'
import { switchNetwork as _switchNetwork } from '@wagmi/core'

export const useSwitchNetwork = () => {
  const switchNetwork = (args: SwitchNetworkArgs) => _switchNetwork(args)

  return switchNetwork
}
