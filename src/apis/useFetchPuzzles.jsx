import axios from "axios";
import { useEffect } from "react";
import usePuzzlesStore from "../store/puzzle";

const useFetchPuzzles = () => {
  const { puzzles, setPuzzles } = usePuzzlesStore();

  useEffect(() => {
    async function fetchPuzzles() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_FETCH_PUZZLE_API}`,
        );

        const {
          customPuzzle,
          tutorialPuzzle,
          easyPuzzle,
          normalPuzzle,
          hardPuzzle,
        } = response.data;

        puzzles.custom = customPuzzle.custom;
        puzzles.tutorial = tutorialPuzzle.tutorial;
        puzzles.easy = easyPuzzle.easy;
        puzzles.normal = normalPuzzle.normal;
        puzzles.hard = hardPuzzle.hard;

        setPuzzles(puzzles);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPuzzles();
  }, []);
};

export default useFetchPuzzles;
