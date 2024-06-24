import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SolvedPuzzlesData } from "../../types/puzzle.ts";

interface State {
  solvedPuzzles: SolvedPuzzlesData;
  setSolvedPuzzles: (solvedPuzzles: SolvedPuzzlesData) => void;
}

const useSolvedPuzzlesStore = create<State>()(
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
