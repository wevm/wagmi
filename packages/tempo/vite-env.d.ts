interface ImportMetaEnv {
  readonly RPC_PORT: string
  readonly VITE_NODE_LOG:
    | 'trace'
    | 'debug'
    | 'info'
    | 'warn'
    | 'error'
    | boolean
    | undefined
  readonly VITE_NODE_TAG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
