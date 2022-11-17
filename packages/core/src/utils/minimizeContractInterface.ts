import type { Abi, ExtractAbiFunctionNames } from 'abitype'
import type { ContractInterface } from 'ethers'
import { Contract } from 'ethers'
import { FormatTypes } from 'ethers/lib/utils.js'

export function minimizeContractInterface<
  TAbi extends Abi | readonly unknown[],
>(config: {
  abi: TAbi
  functionName: TAbi extends Abi ? ExtractAbiFunctionNames<TAbi> : string
}) {
  try {
    const minimizedAbi = (config.abi as Abi).filter(
      (x) => x.type === 'function' && x.name === config.functionName,
    )
    if (minimizedAbi.length === 0) throw new Error('Invalid ABI')
    return minimizedAbi
  } catch (error) {
    const abi = Contract.getInterface(config.abi as ContractInterface).format(
      FormatTypes.full,
    )
    const minimizedInterface = Array.isArray(abi) ? abi : [abi]
    return minimizedInterface.filter((i) => i.includes(config.functionName))
  }
}
