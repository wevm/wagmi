import * as React from 'react'
import { useAccount, useContract, useProvider } from 'wagmi'

import { Account, Connect } from './components'
import {
  ENSRegistryWithFallback,
  ENSRegistryWithFallbackContract,
  MirrorWriteToken,
  MirrorWriteTokenContract,
} from './generated/contracts'

export const App = () => {
  const provider = useProvider()
  const [{ address }] = useAccount()
  const { contract: ensContract } = useContract<ENSRegistryWithFallback>({
    addressOrName: ENSRegistryWithFallbackContract.address,
    contractInterface: ENSRegistryWithFallbackContract.abi,
  })
  console.log(ensContract)

  const { contract: writeTokenContract } = useContract<MirrorWriteToken>({
    addressOrName: MirrorWriteTokenContract.address,
    contractInterface: MirrorWriteTokenContract.abi,
    signerOrProvider: provider,
  })
  console.log(writeTokenContract)

  React.useEffect(() => {
    writeTokenContract.symbol().then(console.log).catch(console.error)
  }, [writeTokenContract])

  if (address) return <Account />

  return <Connect />
}
