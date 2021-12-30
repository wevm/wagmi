import { Signature } from 'ethers'
import { BytesLike, verifyMessage } from 'ethers/lib/utils'

import { Message } from '../types'
import { normalizeMessage } from './normalizeMessage'

export const verifyNormalizedMessage = (
  message: Message,
  signature: Signature | BytesLike,
) => {
  return verifyMessage(normalizeMessage(message), signature)
}
