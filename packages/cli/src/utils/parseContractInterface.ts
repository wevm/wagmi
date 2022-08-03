import {
  ContractEvent,
  ContractFunction,
  ContractInterface,
  Item,
  StateMutability,
} from '../types'

type ParsedItem = Omit<Item, 'internalType' | 'type'> & {
  type: EvmType
}

export function parseContractInterface(contractInterface: ContractInterface) {
  let fallback:
    | Extract<ContractFunction<ParsedItem>, { type: 'fallback' }>
    | undefined
  const functions: Extract<
    ContractFunction<ParsedItem>,
    { type: 'function' | 'receive' }
  >[] = []
  const constructor: Extract<
    ContractFunction<ParsedItem>,
    { type: 'constructor' }
  >[] = []
  const events: ContractEvent<ParsedItem>[] = []

  const structs: StructType[] = []
  function registerStruct(newStruct: StructType) {
    // ignore registration if structName not present
    if (newStruct.structName === undefined) return
    // if struct array (recursive) then keep going deep until we reach the struct tuple
    while (newStruct.type === 'array') {
      newStruct = newStruct.itemType as StructType
    }
    // only register if not already registered
    const newStructName = newStruct.structName?.toString()
    if (!structs.find((s) => s.structName?.toString() === newStructName)) {
      structs.push(newStruct)
    }
  }

  for (const piece of contractInterface) {
    switch (piece.type) {
      case 'fallback': {
        if (fallback)
          throw new Error(
            `Fallback function can't be defined more than once! ${JSON.stringify(
              piece,
            )} Previously defined: ${JSON.stringify(fallback)}`,
          )
        fallback = {
          type: 'fallback',
          stateMutability: findStateMutability(piece),
        }
        continue
      }
      case 'constructor': {
        constructor.push({
          type: 'constructor',
          inputs: piece.inputs.map((x) => ({
            name: x.name,
            type: parseItemType(x, registerStruct),
          })),
          stateMutability: findStateMutability(piece),
        })
        continue
      }
      case 'function': {
        functions.push({
          type: 'function',
          name: piece.name,
          inputs: piece.inputs.map((x) => ({
            name: x.name,
            type: parseItemType(x, registerStruct),
          })),
          outputs:
            piece.outputs?.length > 0
              ? piece.outputs.map((x) => ({
                  name: x.name,
                  type: parseItemType(x, registerStruct),
                }))
              : // : [{ name: '', type: { type: 'void' } }],
                [],
          stateMutability: findStateMutability(piece),
        })
        continue
      }
      case 'event': {
        events.push({
          type: 'event',
          name: piece.name,
          anonymous: piece.anonymous,
          inputs: piece.inputs.map((x) => ({
            isIndexed: x.indexed,
            name: x.name ?? '',
            type: parseItemType(x, registerStruct),
          })),
        })
        continue
      }
    }
  }

  return {
    fallback,
    constructor: constructor,
    functions: groupBy(functions, (x) => x.name),
    events: groupBy(events, (x) => x.name),
    structs: groupBy(
      structs,
      (x) => (x.structName && x.structName.toString()) ?? '',
    ),
  }
}

function findStateMutability(
  contractFunction: ContractFunction,
): StateMutability {
  if (contractFunction.stateMutability) return contractFunction.stateMutability
  if (contractFunction.constant) return 'view'
  return contractFunction.payable ? 'payable' : 'nonpayable'
}

const isStructType = (evmType: EvmType): evmType is StructType =>
  evmType.type === 'array' || evmType.type === 'tuple'

function parseItemType(
  item: Item,
  registerStruct: (struct: StructType) => void,
): EvmType {
  const components =
    item.components &&
    item.components.map((component) => ({
      name: component.name,
      type: parseItemType(component, registerStruct),
    }))

  const parsed = parseEvmType(item.type, components, item.internalType)
  if (isStructType(parsed)) {
    if (
      'size' in parsed &&
      (parsed.size ?? 0) > 1 &&
      isStructType(parsed.itemType) &&
      parsed.structName
    )
      // We unwrap constant size struct arrays like `Item[4]` into `Item`.
      registerStruct({
        ...parsed.itemType,
        structName: parsed.structName.merge({
          identifier: parsed.structName.identifier.replace(
            new RegExp(`\\[${parsed.size}\\]$`),
            '',
          ),
        }),
      })
    else registerStruct(parsed)
  }

  return parsed
}

// TODO: Check
// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
const upperFirst = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export function normalizeName(rawName = ''): string {
  const transformations: ((s: string) => string)[] = [
    (s) => s.replace(/\s+/g, '-'), // spaces to - so later we can automatically convert them
    (s) => s.replace(/\./g, '-'), // replace "."
    (s) => s.replace(/-[a-z]/g, (match) => match.substr(-1).toUpperCase()), // delete '-' and capitalize the letter after them
    (s) => s.replace(/-/g, ''), // delete any '-' left
    (s) => s.replace(/^\d+/, ''), // removes leading digits
    (s) => upperFirst(s),
  ]

  const finalName = transformations.reduce((s, t) => t(s), rawName)
  if (finalName === '')
    throw new Error(`Can't guess class name, please rename file: ${rawName}`)

  return finalName
}

// represent all possible EvmTypes using TypeScript's discriminating union
export type EvmType =
  | BooleanType
  | IntegerType
  | UnsignedIntegerType
  | StringType
  | BytesType
  | DynamicBytesType
  | AddressType
  | ArrayType
  | TupleType
  | UnknownType

/**
 * Like EvmType but with void
 */
export type EvmOutputType = EvmType | VoidType

export type StructType = ArrayType | TupleType

export type BooleanType = { type: 'boolean'; originalType: string }
export type IntegerType = {
  type: 'integer'
  bits: number
  originalType: string
}
export type UnsignedIntegerType = {
  type: 'uinteger'
  bits: number
  originalType: string
}
export type StringType = { type: 'string'; originalType: string }
export type BytesType = { type: 'bytes'; size: number; originalType: string }
export type DynamicBytesType = { type: 'dynamic-bytes'; originalType: string }
export type AddressType = { type: 'address'; originalType: string }
export type ArrayType = {
  type: 'array'
  itemType: EvmType
  size?: number
  originalType: string
  structName?: StructName
}
export type TupleType = {
  type: 'tuple'
  components: EvmSymbol[]
  originalType: string
  structName?: StructName
}

// used only for output types
export type VoidType = { type: 'void' }

// used when type cannot be detected
export type UnknownType = { type: 'unknown'; originalType: string }

export class StructName {
  public readonly identifier: string
  public readonly namespace?: string

  constructor(_identifier?: string, _namespace?: string) {
    this.identifier = normalizeName(_identifier)
    if (_namespace) this.namespace = normalizeName(_namespace)
  }

  toString() {
    if (this.namespace) {
      return `${this.namespace}.${this.identifier}`
    }
    return this.identifier
  }

  merge(other: Partial<StructName>) {
    return new StructName(
      other.identifier || this.identifier,
      other.namespace || this.namespace,
    )
  }
}

export type EvmSymbol = {
  type: EvmType
  name: string
}

const isUIntTypeRegex = /^uint([0-9]*)$/
const isIntTypeRegex = /^int([0-9]*)$/
const isBytesTypeRegex = /^bytes([0-9]+)$/

export function parseEvmType(
  rawType: string,
  components?: EvmSymbol[],
  internalType?: string,
): EvmType {
  const lastChar = rawType[rawType.length - 1]

  // first we parse array type
  if (lastChar === ']') {
    let finishArrayTypeIndex = rawType.length - 2
    while (rawType[finishArrayTypeIndex] !== '[') {
      finishArrayTypeIndex--
    }

    const arraySizeRaw = rawType.slice(
      finishArrayTypeIndex + 1,
      rawType.length - 1,
    )
    const arraySize = arraySizeRaw !== '' ? parseInt(arraySizeRaw) : undefined

    const restOfTheType = rawType.slice(0, finishArrayTypeIndex)

    const result: ArrayType = {
      type: 'array',
      itemType: parseEvmType(restOfTheType, components, internalType),
      originalType: rawType,
    }
    if (arraySize) result.size = arraySize
    const structName = extractStructNameIfAvailable(internalType)
    if (structName) result.structName = structName

    return result
  }

  // otherwise this has to be primitive type

  // deal with simple to parse types
  switch (rawType) {
    case 'bool':
      return { type: 'boolean', originalType: rawType }
    case 'address':
      return { type: 'address', originalType: rawType }
    case 'string':
      return { type: 'string', originalType: rawType }
    case 'byte':
      return { type: 'bytes', size: 1, originalType: rawType }
    case 'bytes':
      return { type: 'dynamic-bytes', originalType: rawType }
    case 'tuple': {
      if (!components) throw new Error('Tuple specified without components!')
      const result: TupleType = {
        type: 'tuple',
        components,
        originalType: rawType,
      }
      const structName = extractStructNameIfAvailable(internalType)
      if (structName) result.structName = structName
      return result
    }
  }

  if (isUIntTypeRegex.test(rawType)) {
    const match = isUIntTypeRegex.exec(rawType)
    return {
      type: 'uinteger',
      bits: parseInt(match![1] || '256'),
      originalType: rawType,
    }
  }

  if (isIntTypeRegex.test(rawType)) {
    const match = isIntTypeRegex.exec(rawType)
    return {
      type: 'integer',
      bits: parseInt(match![1] || '256'),
      originalType: rawType,
    }
  }

  if (isBytesTypeRegex.test(rawType)) {
    const match = isBytesTypeRegex.exec(rawType)
    return {
      type: 'bytes',
      size: parseInt(match![1] || '1'),
      originalType: rawType,
    }
  }

  if (internalType?.startsWith('enum')) {
    return parseEvmType('uint8') // this is a best effort approach. Sometimes enums can be uint16 too. Read more: https://github.com/ethereum-ts/TypeChain/pull/281#discussion_r513303099
  }

  if (internalType?.startsWith('contract')) {
    return { type: 'address', originalType: rawType }
  }

  return { type: 'unknown', originalType: rawType }
}

/** @internal */
export function extractStructNameIfAvailable(
  internalType: string | undefined,
): StructName | undefined {
  if (internalType?.startsWith('struct ')) {
    // get rid of "struct " in the beginning
    let nameStr = internalType.slice(7)

    // get rid of all array signs at the end
    const arrayMarker = nameStr.match(/((?:\[\d*\])+)$/)?.[1]
    if (arrayMarker) {
      nameStr = nameStr.slice(0, nameStr.length - arrayMarker.length)
    }

    if (nameStr.indexOf('.') !== -1) {
      const [namespace, identifier] = nameStr.split('.')
      return new StructName(identifier, namespace)
    }

    return new StructName(nameStr)
  }
}

function groupBy<T = any>(arr: T[], criteria: (x: T) => string) {
  return arr.reduce(function (obj: Record<string, T[]>, item: T) {
    // Check if the criteria is a function to run on the item or a property of it
    const key = typeof criteria === 'function' ? criteria(item) : item[criteria]

    // If the key doesn't exist yet, create it
    if (!(key in obj)) obj[key] = []

    // Push the value to the object
    obj[key]?.push(item)

    // Return the object to the next item in the loop
    return obj
  }, {})
}
