/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAINNET_FORK_URL?: string | undefined
  readonly VITE_OPTIMISM_FORK_URL?: string | undefined
  readonly VITE_WC_PROJECT_ID?: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
