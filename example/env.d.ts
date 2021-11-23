/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_INFURA_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
