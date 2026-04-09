/** biome-ignore-all lint/performance/noReExportAll: entrypoint */
import {
  dangerous_secp256k1 as accounts_dangerous_secp256k1,
  tempoWallet as accounts_tempoWallet,
  webAuthn as accounts_webAuthn,
} from 'accounts/wagmi'

////////////////////////////////////////////////////////////////////////////////
// Tempo
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export * as Actions from '../tempo/actions/index.js'

/** @deprecated use `tempoWallet.Options` instead */
export type TempoWalletParameters = accounts_tempoWallet.Options
export const tempoWallet = accounts_tempoWallet

/**
 * @deprecated Use `dangerous_secp256k1` from `accounts/wagmi` instead.
 *
 * ```bash
 * npm i accounts
 * ```
 *
 * ```ts
 * import { dangerous_secp256k1 } from 'accounts/wagmi'
 * ```
 */
export const dangerous_secp256k1 = accounts_dangerous_secp256k1
/** @deprecated Use `dangerous_secp256k1.Options` instead. */
export type Dangerous_Secp256k1Parameters = accounts_dangerous_secp256k1.Options

/**
 * @deprecated Use `webAuthn` from `accounts/wagmi` instead.
 *
 * ```bash
 * npm i accounts
 * ```
 *
 * ```ts
 * import { webAuthn } from 'accounts/wagmi'
 * ```
 *
 * Docs: https://docs.tempo.xyz/accounts/wagmi/webAuthn
 */
export const webAuthn = accounts_webAuthn
/** @deprecated Use `webAuthn.Options` instead. */
export type WebAuthnParameters = accounts_webAuthn.Options
