////////////////////////////////////////////////////////////////////////////////
// Tempo
////////////////////////////////////////////////////////////////////////////////

/** biome-ignore-all lint/performance/noReExportAll: entrypoint */
// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  Actions,
  type Dangerous_Secp256k1Parameters,
  dangerous_secp256k1,
  KeyManager,
  type WebAuthnParameters,
  webAuthn,
} from '@wagmi/core/tempo'

// Export Hooks
export * as Hooks from '../tempo/hooks/index.js'
