import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SolvedPuzzlesData } from "../../types/puzzle.ts";

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
