import { create } from "zustand";
import { PuzzlesIndexState } from "../../types/puzzle.ts";

const usePuzzlesIndexStore = create<PuzzlesIndexState>()((set) => ({
  puzzlesIndex: { tutorial: 1, easy: 1, normal: 1, hard: 1, custom: 1 },
  setPuzzlesIndex: (puzzlesIndex) => set({ puzzlesIndex }),
}));

export default usePuzzlesIndexStore;
