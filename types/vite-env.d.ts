interface ImportMetaEnv {
  readonly VITE_FETCH_PUZZLE_API: string;
  readonly VITE_SAVE_PUZZLE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
