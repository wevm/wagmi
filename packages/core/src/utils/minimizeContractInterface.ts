import { Contract, ContractInterface } from 'ethers'
import { FormatTypes } from 'ethers/lib/utils.js'

export function minimizeContractInterface({
  contractInterface,
  functionName,
}: {
  contractInterface: ContractInterface
  functionName: string
}) {
  const abi = Contract.getInterface(contractInterface).format(FormatTypes.full)
  const minimizedInterface = Array.isArray(abi) ? abi : [abi]
  return minimizedInterface.filter((i) => i.includes(functionName))
}
