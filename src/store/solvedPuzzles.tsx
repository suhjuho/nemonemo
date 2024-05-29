import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SolvedPuzzlesData {
  custom: Record<string, boolean>;
  tutorial: Record<string, boolean>;
  easy: Record<string, boolean>;
  normal: Record<string, boolean>;
  hard: Record<string, boolean>;
}

const useSolvedPuzzlesStore = create(
  persist(
    (set) => ({
      solvedPuzzles: {
        tutorial: {},
        easy: {},
        normal: {},
        hard: {},
        custom: {},
      },
      setSolvedPuzzles: (solvedPuzzles: SolvedPuzzlesData) =>
        set({ solvedPuzzles }),
    }),
    {
      name: "solved-puzzles",
    },
  ),
);

export default useSolvedPuzzlesStore;
