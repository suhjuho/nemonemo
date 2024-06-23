import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PuzzlesData } from "../../types/puzzle.ts";

const usePuzzlesStore = create(
  persist(
    (set) => ({
      puzzles: {
        tutorial: {},
        easy: {},
        normal: {},
        hard: {},
        custom: {},
      },
      setPuzzles: (puzzles: PuzzlesData) => set({ puzzles }),
    }),
    { name: "puzzles" },
  ),
);

export default usePuzzlesStore;
