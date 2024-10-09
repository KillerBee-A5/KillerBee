interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_HOST: string;
  readonly VITE_CAESAR_SHIFT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
