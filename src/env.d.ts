/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_DROPBOX_ACCESS_TOKEN: string
  readonly VITE_LOG_LEVEL: string | number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

