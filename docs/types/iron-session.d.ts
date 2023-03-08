import type { SiweMessage as SSXSiweMessage } from '@spruceid/ssx'
import type { SiweMessage } from 'siwe'

declare module 'iron-session' {
  interface IronSessionData {
    siwe?: SiweMessage | SSXSiweMessage
    nonce?: string
    address?: string
    signature?: string
  }
}
