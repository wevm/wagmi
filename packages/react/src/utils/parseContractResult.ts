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

    const isArray =
      fragment?.outputs?.[0]?.baseType === 'array' ||
      fragment?.outputs?.[0]?.baseType === 'tuple'

    const data_ = isArray ? [data] : data
    const encodedResult = iface.encodeFunctionResult(functionName, data_)
    const decodedResult = iface.decodeFunctionResult(
      functionName,
      encodedResult,
    )
    return isArray ? decodedResult[0] : decodedResult
  }
  return data
}
