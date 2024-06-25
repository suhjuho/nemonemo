import axios from "axios";
import { DifficultyLevel } from "../../types/puzzle.ts";

function saveRank(
  difficulty: DifficultyLevel,
  stageNumber: string,
  time: number,
) {
  async function saveScore() {
    try {
      await axios.post(`${import.meta.env.VITE_SAVE_PUZZLE_API}`, {
        score: { difficulty, stageNumber, time },
      });
    } catch (error) {
      console.error(error);
    }
  }

  saveScore();
}

export default saveRank;
