import { create } from "zustand";

interface PuzzlesIndexState {
  puzzlesIndex: Record<string, number>;
  setPuzzlesIndex: (puzzlesIndex: Record<string, number>) => void;
}

const usePuzzlesIndexStore = create<PuzzlesIndexState>()((set) => ({
  puzzlesIndex: { tutorial: 1, easy: 1, normal: 1, hard: 1, custom: 1 },
  setPuzzlesIndex: (puzzlesIndex) => set({ puzzlesIndex }),
}));

export default usePuzzlesIndexStore;
