/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAINNET_FORK_URL?: string | undefined
  readonly VITE_OPTIMISM_FORK_URL?: string | undefined
  readonly VITE_WC_PROJECT_ID?: string | undefined
  readonly VITE_NODE_LOG?: string | undefined
  readonly VITE_NODE_TAG?: string | undefined
  readonly RPC_PORT?: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
