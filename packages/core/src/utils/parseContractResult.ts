import { Contract, ContractInterface } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

function isPlainArray(value: unknown) {
  return Array.isArray(value) && Object.keys(value).length === value.length
}

export function parseContractResult({
  contractInterface,
  data,
  functionName,
}: {
  contractInterface: ContractInterface
  data: Result
  functionName: string
}) {
  if (data && isPlainArray(data)) {
    const iface = Contract.getInterface(contractInterface)
    const fragment = iface.getFunction(functionName)

    const isTuple = (fragment.outputs?.length || 0) > 1

    const data_ = isTuple ? data : [data]
    const encodedResult = iface.encodeFunctionResult(functionName, data_)
    const decodedResult = iface.decodeFunctionResult(
      functionName,
      encodedResult,
    )
    return isTuple ? decodedResult : decodedResult[0]
  }
  return data
}
