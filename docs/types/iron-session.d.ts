import type { SiweMessage } from 'siwe'

declare module 'iron-session' {
  interface IronSessionData {
    siwe?: SiweMessage
    nonce?: string
  }
}
