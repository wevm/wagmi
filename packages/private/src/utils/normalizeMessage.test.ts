import { messageLookup } from '../testing'
import { normalizeMessage } from './normalizeMessage'

describe.each`
  message                | expected
  ${messageLookup.basic} | ${'54686520717569636b2062726f776e20666f78206a756d706564206f76657220746865206c617a7920646f67732e'}
  ${messageLookup.bytes} | ${'54686520717569636b2062726f776e20666f78206a756d706564206f76657220746865206c617a7920646f67732e'}
`('normalizeMessage($message)', ({ message, expected }) => {
  it(`returns ${expected}`, () => {
    expect(normalizeMessage(message)).toEqual(expected)
  })
})
