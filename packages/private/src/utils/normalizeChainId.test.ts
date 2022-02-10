import { normalizeChainId } from './normalizeChainId'

describe.each`
  chainId    | expected
  ${1}       | ${1}
  ${'1'}     | ${1}
  ${'0x1'}   | ${1}
  ${'0x4'}   | ${4}
  ${42}      | ${42}
  ${'42'}    | ${42}
  ${'0x2a'}  | ${42}
  ${' 0x2a'} | ${42}
`('normalizeChainId($chainId)', ({ chainId, expected }) => {
  it(`returns ${expected}`, () => {
    expect(normalizeChainId(chainId)).toEqual(expected)
  })
})
