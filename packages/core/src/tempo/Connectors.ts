import {
  dangerous_secp256k1 as accounts_dangerous_secp256k1,
  tempoWallet as accounts_tempoWallet,
  webAuthn as accounts_webAuthn,
} from 'accounts/wagmi'

export type Dangerous_Secp256k1Parameters = NonNullable<
  Parameters<typeof accounts_dangerous_secp256k1>[0]
>
export const dangerous_secp256k1 = accounts_dangerous_secp256k1

export type TempoWalletParameters = NonNullable<
  Parameters<typeof accounts_tempoWallet>[0]
>
export const tempoWallet = accounts_tempoWallet

export type WebAuthnParameters = NonNullable<
  Parameters<typeof accounts_webAuthn>[0]
>
export const webAuthn = accounts_webAuthn
