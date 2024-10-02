interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly FRONTEND_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
