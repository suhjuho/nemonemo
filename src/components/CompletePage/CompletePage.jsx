import { useParams } from "react-router-dom";
import { usePuzzlesStore } from "../../store/store";

function CompletePage() {
  const { puzzles } = usePuzzlesStore();
  const { difficulty, stageNumber } = useParams();

  const puzzle = puzzles[difficulty][stageNumber];

  return (
    <>
      <h1>NEMO NEMO Logic 3D</h1>
      <h2>Complete Page: {puzzle.title}</h2>
    </>
  );
}

export default CompletePage;
