import { Abi, ExtractAbiFunctionNames } from 'abitype'
import { Contract, ContractInterface } from 'ethers/lib/ethers'
import { FormatTypes } from 'ethers/lib/utils'

export function minimizeContractInterface<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>
    : string,
>(config: {
  contractInterface: TAbi
  functionName: [TFunctionName] extends [never] ? string : TFunctionName
}) {
  try {
    const minimizedAbi = (<Abi>config.contractInterface).filter(
      (x) => x.type === 'function' && x.name === config.functionName,
    )
    if (minimizedAbi.length === 0) throw new Error('Invalid ABI')
    return minimizedAbi
  } catch (error) {
    const abi = Contract.getInterface(
      <ContractInterface>config.contractInterface,
    ).format(FormatTypes.full)
    const minimizedInterface = Array.isArray(abi) ? abi : [abi]
    return minimizedInterface.filter((i) => i.includes(config.functionName))
  }
}
