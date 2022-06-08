import { Contract, ContractInterface } from 'ethers/lib/ethers'
import { FunctionFragment, Result } from 'ethers/lib/utils'

export function parseContractResult({
  contractInterface,
  data,
  functionName,
}: {
  contractInterface: ContractInterface
  data: Result
  functionName: string
}) {
  if (data && Array.isArray(data) && Object.keys(data).length === data.length) {
    const { fragments } = Contract.getInterface(contractInterface)
    const functionFragment = FunctionFragment.from(
      fragments.find((fragment) => fragment.name === functionName) || {},
    )
    const dataObject = functionFragment.outputs?.reduce(
      (dataObject, output, i) => ({
        ...dataObject,
        [output.name]: data[i],
      }),
      {},
    )
    return Object.assign(data, dataObject)
  }
  return data
}
