import type { AbiParameter } from 'abitype'
import type { Contract } from 'ethers'
import { BigNumber } from 'ethers'
import { FunctionFragment, isAddress } from 'ethers/lib/utils.js'

/**
 * Get normalized function name from contract
 *
 * @param contract — Contract
 * @param functionName — Function name
 * @param args — Function arguments (used to disambiguate overloaded functions)
 *
 * @returns Normalized function name
 */
export function normalizeFunctionName({
  contract,
  functionName,
  args = [],
}: {
  contract: Contract
  functionName: string
  args?: readonly unknown[]
}) {
  // If `functionName` exists in contract, return it.
  if (functionName in contract.functions) return functionName

  // Otherwise, check if `functionName` is an overloaded function based on `args` shape.
  const argsLength = args?.length ?? 0
  const overloadFunctions = Object.keys(contract.functions)
    .filter((x) => x.startsWith(`${functionName}(`))
    .map((x) => ({ name: x, fragment: FunctionFragment.fromString(x) }))
    .filter((x) => argsLength === x.fragment.inputs.length)

  for (const overloadFunction of overloadFunctions) {
    const matched = args.every((arg, index) => {
      const abiParameter = overloadFunction.fragment.inputs[
        index
      ] as AbiParameter
      return isArgOfType(arg, abiParameter)
    })
    if (matched) return overloadFunction.name
  }

  // Wasn't able to find overload, just return function name.
  return functionName
}

export function isArgOfType(arg: unknown, abiParameter: AbiParameter): boolean {
  const argType = typeof arg
  const abiParameterType = abiParameter.type
  switch (abiParameterType) {
    case 'address':
      return isAddress(arg as string)
    case 'bool':
      return argType === 'boolean'
    case 'function':
      return argType === 'string'
    case 'string':
      return argType === 'string'
    default: {
      if (abiParameterType === 'tuple' && 'components' in abiParameter)
        return Object.values(abiParameter.components).every(
          (component, index) => {
            return isArgOfType(
              Object.values(arg as unknown[] | Record<string, unknown>)[index],
              component as AbiParameter,
            )
          },
        )

      // `(u)int<M>`: (un)signed integer type of `M` bits, `0 < M <= 256`, `M % 8 == 0`
      // https://regexr.com/6v8hp
      if (
        /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
          abiParameterType,
        )
      )
        return (
          argType === 'number' ||
          argType === 'bigint' ||
          BigNumber.isBigNumber(arg)
        )

      // `bytes<M>`: binary type of `M` bytes, `0 < M <= 32`
      // https://regexr.com/6va55
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === 'string' || arg instanceof Uint8Array

      // fixed-length (`<type>[M]`) and dynamic (`<type>[]`) arrays
      // https://regexr.com/6va6i
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return (
          Array.isArray(arg) &&
          arg.every((x: unknown) =>
            isArgOfType(x, {
              ...abiParameter,
              // Pop off `[]` or `[M]` from end of type
              type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, ''),
            } as AbiParameter),
          )
        )
      }

      return false
    }
  }
}
