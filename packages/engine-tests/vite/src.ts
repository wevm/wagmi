import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { baseAccount } from 'wagmi/connectors'

const config = createConfig({
  chains: [mainnet],
  connectors: [baseAccount()],
  transports: { [mainnet.id]: http() },
})

document.querySelector<HTMLDivElement>('#app')!.textContent =
  config.connectors[0]?.name ?? ''
