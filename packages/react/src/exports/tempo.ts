////////////////////////////////////////////////////////////////////////////////
// Tempo
////////////////////////////////////////////////////////////////////////////////

/** biome-ignore-all lint/performance/noReExportAll: entrypoint */
// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  Actions,
  /** @deprecated Use `dangerous_secp256k1.Options` instead. */
  type Dangerous_Secp256k1Parameters,
  dangerous_secp256k1,
  /** @deprecated use `tempoWallet.Options` instead */
  type TempoWalletParameters,
  tempoWallet,
  /** @deprecated Use `webAuthn.Options` instead. */
  type WebAuthnParameters,
  webAuthn,
} from '@wagmi/core/tempo'

// Export Hooks
export * as Hooks from '../tempo/hooks/index.js'
