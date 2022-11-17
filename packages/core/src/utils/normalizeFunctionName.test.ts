import type { AbiParameter } from 'abitype'
import { BigNumber, Contract } from 'ethers'
import { toUtf8Bytes } from 'ethers/lib/utils.js'
import { describe, expect, it } from 'vitest'

import { wagmiContractConfig } from '../../test'
import { isArgOfType, normalizeFunctionName } from './normalizeFunctionName'

describe('normalizeFunctionName', () => {
  it('returns basic function', async () => {
    const contract = new Contract(
      wagmiContractConfig.address,
      wagmiContractConfig.abi,
    )
    const functionName = 'balanceOf'
    expect(
      normalizeFunctionName({
        contract,
        functionName,
      }),
    ).toBe(functionName)
  })

  it('returns overloaded function with different argument lengths', async () => {
    const contract = new Contract(
      wagmiContractConfig.address,
      wagmiContractConfig.abi,
    )
    const functionName = 'safeTransferFrom'
    expect(
      normalizeFunctionName({
        contract,
        functionName,
        args: [
          '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          BigNumber.from(0),
        ],
      }),
    ).toBe(`${functionName}(address,address,uint256)`)
  })

  it('returns overloaded function with different argument types', () => {
    const contract = new Contract(
      '0x0000000000000000000000000000000000000000',
      [
        {
          inputs: [],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ name: 'tokenId', type: 'uint256' }],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ name: 'tokenId', type: 'string' }],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    )
    const functionName = 'mint'
    expect(normalizeFunctionName({ contract, functionName })).toBe(
      `${functionName}()`,
    )
    expect(
      normalizeFunctionName({
        contract,
        functionName,
        args: [BigNumber.from(0)],
      }),
    ).toBe(`${functionName}(uint256)`)
    expect(
      normalizeFunctionName({
        contract,
        functionName,
        args: ['foo'],
      }),
    ).toBe(`${functionName}(string)`)
  })

  it('tuple', () => {
    const contract = new Contract(
      '0x0000000000000000000000000000000000000000',
      [
        {
          inputs: [
            { name: 'foo', type: 'uint256' },
            {
              name: 'bar',
              type: 'tuple',
              components: [
                { name: 'a', type: 'string' },
                {
                  name: 'b',
                  type: 'tuple',
                  components: [
                    { name: 'merp', type: 'string' },
                    { name: 'meep', type: 'string' },
                  ],
                },
                { name: 'c', type: 'uint256' },
              ],
            },
          ],
          name: 'foo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { name: 'foo', type: 'uint256' },
            {
              name: 'bar',
              type: 'tuple',
              components: [
                { name: 'a', type: 'string' },
                {
                  name: 'b',
                  type: 'tuple',
                  components: [
                    { name: 'merp', type: 'string' },
                    { name: 'meep', type: 'string' },
                  ],
                },
                { name: 'c', type: 'address' },
              ],
            },
          ],
          name: 'foo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    )
    const functionName = 'foo'
    expect(
      normalizeFunctionName({
        contract,
        functionName,
        args: [
          BigNumber.from(0),
          {
            a: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            b: { merp: 'test', meep: 'test' },
            c: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          },
        ],
      }),
    ).toBe(`${functionName}(uint256,(string,(string,string),address))`)
  })
})

describe.each([
  // array
  { arg: ['foo'], abiParameter: { type: 'string[]' }, expected: true },
  { arg: ['foo'], abiParameter: { type: 'string[1]' }, expected: true },
  { arg: [['foo']], abiParameter: { type: 'string[][]' }, expected: true },
  { arg: [['foo']], abiParameter: { type: 'string[][1]' }, expected: true },
  {
    arg: [BigNumber.from(1)],
    abiParameter: { type: 'uint256[]' },
    expected: true,
  },
  {
    arg: [{ foo: BigNumber.from(1), bar: [{ baz: BigNumber.from(1) }] }],
    abiParameter: {
      type: 'tuple[]',
      components: [
        { name: 'foo', type: 'uint256' },
        {
          name: 'bar',
          type: 'tuple[]',
          components: [{ name: 'baz', type: 'uint256' }],
        },
      ],
    },
    expected: true,
  },
  { arg: ['foo'], abiParameter: { type: 'string[test]' }, expected: false },
  { arg: [1], abiParameter: { type: 'uint69[]' }, expected: false },
  // address
  {
    arg: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    abiParameter: { type: 'address' },
    expected: true,
  },
  {
    arg: 'A0Cf798816D4b9b9866b5330EEa46a18382f251e',
    abiParameter: { type: 'address' },
    expected: true,
  },
  { arg: 'test', abiParameter: { type: 'address' }, expected: false },
  // bool
  { arg: true, abiParameter: { type: 'bool' }, expected: true },
  { arg: false, abiParameter: { type: 'bool' }, expected: true },
  { arg: 'true', abiParameter: { type: 'bool' }, expected: false },
  // bytes
  { arg: 'foo', abiParameter: { type: 'bytes' }, expected: true },
  { arg: 'foo', abiParameter: { type: 'bytes32' }, expected: true },
  { arg: toUtf8Bytes('foo'), abiParameter: { type: 'bytes' }, expected: true },
  { arg: 1, abiParameter: { type: 'bytes32' }, expected: false },
  // function
  { arg: 'foo', abiParameter: { type: 'function' }, expected: true },
  { arg: 1, abiParameter: { type: 'function' }, expected: false },
  // int
  { arg: 1, abiParameter: { type: 'int' }, expected: true },
  { arg: 1n, abiParameter: { type: 'int' }, expected: true },
  { arg: BigNumber.from(1), abiParameter: { type: 'int' }, expected: true },
  { arg: 1, abiParameter: { type: 'uint' }, expected: true },
  { arg: 1n, abiParameter: { type: 'uint' }, expected: true },
  { arg: BigNumber.from(1), abiParameter: { type: 'uint' }, expected: true },
  { arg: 1, abiParameter: { type: 'int256' }, expected: true },
  { arg: 1, abiParameter: { type: 'uint256' }, expected: true },
  { arg: 1, abiParameter: { type: 'int69' }, expected: false },
  { arg: 1, abiParameter: { type: 'uint69' }, expected: false },
  // string
  { arg: 'foo', abiParameter: { type: 'string' }, expected: true },
  { arg: 1, abiParameter: { type: 'string' }, expected: false },
  // tuple
  {
    arg: { bar: 1, baz: 'test' },
    abiParameter: {
      name: 'foo',
      type: 'tuple',
      components: [
        { name: 'bar', type: 'uint256' },
        { name: 'baz', type: 'string' },
      ],
    },
    expected: true,
  },
  {
    arg: [1, 'test'],
    abiParameter: {
      name: 'foo',
      type: 'tuple',
      components: [
        { name: 'bar', type: 'uint256' },
        { name: 'baz', type: 'string' },
      ],
    },
    expected: true,
  },
  {
    arg: { bar: ['test'] },
    abiParameter: {
      name: 'foo',
      type: 'tuple',
      components: [
        {
          name: 'bar',
          type: 'tuple',
          components: [{ name: 'baz', type: 'string' }],
        },
      ],
    },
    expected: true,
  },
  {
    arg: {},
    abiParameter: {
      name: 'foo',
      type: 'tuple',
      components: [
        { name: 'bar', type: 'uint256' },
        { name: 'baz', type: 'uint256' },
      ],
    },
    expected: false,
  },
] as { arg: unknown; abiParameter: AbiParameter; expected: boolean }[])(
  'isArgOfType($arg, $abiParameter)',
  ({ arg, abiParameter, expected }) => {
    it(`returns ${expected}`, () => {
      expect(isArgOfType(arg, abiParameter)).toEqual(expected)
    })
  },
)
