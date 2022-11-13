import type { Abi } from 'abitype'
import type { ContractInterface } from 'ethers'
import { Contract } from 'ethers'

function isPlainArray(value: unknown) {
  return Array.isArray(value) && Object.keys(value).length === value.length
}

export function parseContractResult({
  abi,
  data,
  functionName,
}: {
  abi: ContractInterface | Abi | readonly unknown[]
  data: any
  functionName: string
}) {
  if (data && isPlainArray(data)) {
    const iface = Contract.getInterface(abi as ContractInterface)
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
