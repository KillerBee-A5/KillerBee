interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly FRONTEND_DOMAIN: string;
  readonly CAESAR_SHIFT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
