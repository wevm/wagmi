import { hexlify, toUtf8Bytes } from 'ethers/lib/utils'

import { Message } from '../types'

export const normalizeMessage = (message: Message) => {
  if (typeof message === 'string') {
    message = toUtf8Bytes(message)
  }
  const messageHex = hexlify(message).substring(2)
  return messageHex
}
