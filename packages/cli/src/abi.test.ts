import { test } from 'vitest'

import { expectType, wagmiAbi, wnftAbi } from '../test'

import {
  Abi,
  AbiTypeToPrimitiveType,
  Address,
  ContractFunction,
  ContractFunctionArgs,
  ContractFunctionArgsToPrimitiveType,
  ContractFunctionNames,
} from './abi'

test('AbiTypeToPrimitiveType', () => {
  expectType<AbiTypeToPrimitiveType<{ type: 'address' }>>(
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  )
  expectType<AbiTypeToPrimitiveType<{ type: 'bool' }>>(true)
  expectType<AbiTypeToPrimitiveType<{ type: 'bytes' }>>('foo')
  expectType<AbiTypeToPrimitiveType<{ type: 'function' }>>(
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251eABCD',
  )
  expectType<AbiTypeToPrimitiveType<{ type: 'string' }>>('foo')
  expectType<
    AbiTypeToPrimitiveType<{
      components: [
        { internalType: 'string'; name: 'name'; type: 'string' },
        { internalType: 'string'; name: 'symbol'; type: 'string' },
        { internalType: 'string'; name: 'description'; type: 'string' },
        { internalType: 'string'; name: 'imageURI'; type: 'string' },
        { internalType: 'string'; name: 'contentURI'; type: 'string' },
        { internalType: 'uint256'; name: 'price'; type: 'uint256' },
        { internalType: 'uint256'; name: 'limit'; type: 'uint256' },
        {
          internalType: 'address'
          name: 'fundingRecipient'
          type: 'address'
        },
        { internalType: 'address'; name: 'renderer'; type: 'address' },
        { internalType: 'uint256'; name: 'nonce'; type: 'uint256' },
        { internalType: 'uint16'; name: 'fee'; type: 'uint16' },
      ]
      internalType: 'struct IWritingEditions.WritingEdition'
      name: 'edition'
      type: 'tuple'
    }>
  >({
    name: 'Test',
    symbol: '$TEST',
    description: 'Foo bar baz',
    imageURI: 'ipfs://hash',
    contentURI: 'arweave://digest',
    price: 0.1,
    limit: 100,
    fundingRecipient: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    renderer: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    nonce: 123,
    fee: 0,
  })
  expectType<AbiTypeToPrimitiveType<{ type: 'int' }>>(1)
  expectType<AbiTypeToPrimitiveType<{ type: 'fixed128x18' }>>(1)
  expectType<AbiTypeToPrimitiveType<{ type: 'fixed' }>>(1)
})

test('ContractFunction', () => {
  expectType<ContractFunctionNames<typeof wagmiAbi>>('symbol')

  expectType<ContractFunction<typeof wagmiAbi, 'tokenURI'>>({
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  })

  expectType<ContractFunctionArgs<typeof wagmiAbi, 'tokenURI', 'inputs'>>([
    {
      internalType: 'uint256',
      name: 'tokenId',
      type: 'uint256',
    },
  ])
})

test('ContractFunctionArgsToPrimitiveType', () => {
  // No args
  expectType<ContractFunctionArgsToPrimitiveType<[]>>(undefined)

  // Single arg
  expectType<
    ContractFunctionArgsToPrimitiveType<
      [
        {
          internalType: 'uint256'
          name: 'tokenId'
          type: 'uint256'
        },
      ]
    >
  >(1)

  // Multiple args
  expectType<
    ContractFunctionArgsToPrimitiveType<
      [
        {
          internalType: 'address'
          name: 'to'
          type: 'address'
        },
        {
          internalType: 'uint256'
          name: 'tokenId'
          type: 'uint256'
        },
      ]
    >
  >(['0x', 1])
})

test('readContract', () => {
  function readContract<
    TAbi extends Abi,
    TFunctionName extends ContractFunctionNames<TAbi>,
    TArgs extends ContractFunctionArgsToPrimitiveType<
      ContractFunctionArgs<TAbi, TFunctionName, 'inputs'>
    >,
    TResponse extends ContractFunctionArgsToPrimitiveType<
      ContractFunctionArgs<TAbi, TFunctionName, 'outputs'>
    >,
  >(
    _config: {
      address: Address
      contractInterface: TAbi
      functionName: TFunctionName
    } & (TArgs extends undefined ? { args?: never } : { args: TArgs }),
  ): TResponse extends undefined ? void : TResponse {
    return {} as TResponse extends undefined ? void : TResponse
  }

  expectType<string>(
    readContract({
      address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
      contractInterface: wagmiAbi,
      functionName: 'tokenURI',
      args: 123,
    }),
  )

  expectType<void>(
    readContract({
      address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
      contractInterface: wagmiAbi,
      functionName: 'approve',
      args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 123],
    }),
  )

  expectType<string>(
    readContract({
      address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
      contractInterface: wagmiAbi,
      functionName: 'symbol',
    }),
  )

  expectType<void>(
    readContract({
      address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
      contractInterface: wagmiAbi,
      functionName: 'transferFrom',
      // TODO: Multiple args
      args: [
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        '0x0000000000000000000000000000000000000000',
        123,
      ],
    }),
  )

  expectType<number>(
    readContract({
      address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
      contractInterface: wnftAbi,
      functionName: 'VERSION',
    }),
  )

  expectType<'0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'>(
    readContract({
      address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
      contractInterface: wnftAbi,
      functionName: 'create',
      args: {
        name: 'Test',
        symbol: '$TEST',
        description: 'Foo bar baz',
        imageURI: 'ipfs://hash',
        contentURI: 'arweave://digest',
        price: 0.1,
        limit: 100,
        fundingRecipient: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        renderer: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        nonce: 123,
        fee: 0,
      },
    }),
  )
})
