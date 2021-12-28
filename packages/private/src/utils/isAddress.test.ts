import { isAddress } from './isAddress'

describe.each`
  value                                           | expected
  ${'0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'} | ${'0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'}
  ${'awkweb.eth'}                                 | ${false}
`('isAddress($value)', ({ value, expected }) => {
  it(`returns ${expected}`, () => {
    expect(isAddress(value)).toEqual(expected)
  })
})
