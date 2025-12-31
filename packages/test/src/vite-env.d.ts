/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MAINNET_FORK_URL?: string | undefined
  readonly VITE_OPTIMISM_FORK_URL?: string | undefined
  readonly VITE_WC_PROJECT_ID?: string | undefined

  readonly VITE_TEMPO_HTTP_LOG?: boolean | undefined
  readonly VITE_TEMPO_LOG?:
    | true
    | 'debug'
    | 'error'
    | 'trace'
    | 'warn'
    | 'info'
    | undefined
  readonly VITE_TEMPO_TAG?: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
