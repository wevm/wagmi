interface ImportMetaEnv {
  readonly RPC_PORT: string
  readonly VITE_HTTP_LOG: 'true' | 'false'
  readonly VITE_NODE_ENV: 'localnet' | 'testnet' | 'devnet'
  readonly VITE_NODE_LOG:
    | 'trace'
    | 'debug'
    | 'info'
    | 'warn'
    | 'error'
    | boolean
    | undefined
  readonly VITE_NODE_TAG: string
  readonly VITE_RPC_CREDENTIALS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
