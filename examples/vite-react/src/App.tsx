import { useAccount, useContract } from 'wagmi'

import { Account, Connect } from './components'
import { default as ENSRegistryWithFallbackABI } from './generated/contracts/ENSRegistryWithFallback.json'
import { ENSRegistryWithFallback } from './generated/contracts/ENSRegistryWithFallback'

export const App = () => {
  const [{ address }] = useAccount({ skipEns: true })
  const { contract } = useContract<ENSRegistryWithFallback>({
    addressOrName: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    contractInterface: ENSRegistryWithFallbackABI,
  })
  console.log(contract)

  if (address) return <Account />

  return <Connect />
}
