'use client'

import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { baseAccount } from 'wagmi/connectors'

const config = createConfig({
  chains: [mainnet],
  connectors: [baseAccount()],
  transports: { [mainnet.id]: http() },
})

export default function Page() {
  return <div>{config.connectors[0]?.name}</div>
}
