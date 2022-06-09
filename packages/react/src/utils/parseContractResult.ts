import { Contract, ContractInterface } from 'ethers/lib/ethers'
import { FunctionFragment, Result } from 'ethers/lib/utils'

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
    const { fragments } = Contract.getInterface(contractInterface)
    const functionFragment = FunctionFragment.from(
      fragments.find((fragment) => fragment.name === functionName) || {},
    )
    return getFunctionData({
      data,
      outputs: functionFragment.outputs,
    })
  }
  return data
}

function getFunctionData({
  data,
  outputs,
  isTuple = outputs?.[0]?.type === 'tuple[]',
}: {
  data: Result
  outputs: FunctionFragment['outputs']
  isTuple?: boolean
}): Result {
  if (outputs?.[0]?.type === 'tuple[]') {
    // If all the tuple items are already in sync with the ethers Result,
    // return the data.
    if (data.some((data) => !isPlainArray(data))) {
      return data
    }

    // Otherwise, traverse and parse the data to an ethers Result
    return getFunctionData({
      data,
      outputs: outputs?.[0].components,
      isTuple: true,
    })
  }

  const data_ =
    isPlainArray(data) && !data.some((data) => !Array.isArray(data))
      ? data
      : [data]
  const result = data_.map((data) => {
    let dataObject
    if (
      outputs?.[0]?.baseType === 'array' &&
      outputs?.[0]?.type !== 'tuple[]' &&
      outputs?.[0]?.name
    ) {
      dataObject = { [outputs?.[0]?.name]: [...data] }
    } else {
      dataObject = outputs?.reduce(
        (dataObject, output, i) =>
          output.name
            ? {
                ...dataObject,
                [output.name]:
                  output.type === 'tuple[]'
                    ? getFunctionData({
                        data: data[i],
                        outputs: output.components,
                        isTuple: true,
                      })
                    : data[i],
              }
            : dataObject,
        {},
      )
    }

    return Object.assign(data, dataObject)
  })

  if (!isTuple) return result[0]
  return result
}
