import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Account } from '../components'

function Page() {
  const { isConnected } = useAccount()
  return (
    <>
      <h1>wagmi + RainbowKit + Next.js</h1>

      <ConnectButton />
      {isConnected && <Account />}
    </>
  )
}

export default Page
