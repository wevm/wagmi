import * as React from 'react'
import { Contract, ContractInterface, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

export type Config = {
  addressOrName: string
  contractInterface: ContractInterface
  signerOrProvider?: Signer | Provider
}

const getContract = <T = Contract>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: Config) =>
  <T>(<unknown>new Contract(addressOrName, contractInterface, signerOrProvider))

export const useContract = <T = any>({
  addressOrName,
  contractInterface,
  signerOrProvider,
}: Config) => {
  const contractRef = React.useRef(
    getContract<T>({ addressOrName, contractInterface, signerOrProvider }),
  )

  React.useEffect(() => {
    contractRef.current = getContract({
      addressOrName,
      contractInterface,
      signerOrProvider,
    })
  }, [addressOrName, contractInterface, signerOrProvider])

  return contractRef.current
}
