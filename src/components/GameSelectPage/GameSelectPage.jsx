import { useState, useEffect } from "react";

import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";
import GameStageHeader from "../Header/GameStageHeader";

import { useAnswerStore } from "../../store/store";
import usePuzzlesStore from "../../store/puzzle";
import usePuzzlesIndexStore from "../../store/solve";

import Unsolved from "../../assets/puzzle/unsolved.png";
import Wallpaper from "../../assets/wallpaper.png";
import Back from "../../assets/icon/back.png";
import Next from "../../assets/icon/next.png";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

const Icon = styled.img`
  width: 60px;
  margin: 0px 10px;
`;

const StageBackgroundImg = styled.img`
  position: absolute;
  width: 100vw;
  z-index: -10;
  opacity: 40%;
`;

const Puzzles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  height: 100vh;
`;

const Puzzle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
`;

const PuzzleImg = styled.img`
  width: 300px;
  border-radius: 10px;
`;

const PuzzleLabel = styled.div`
  font-size: 64px;
`;

function GameSelectPage() {
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const { puzzles } = usePuzzlesStore();
  const { setIsComplete } = useAnswerStore();
  const { puzzlesIndex, setPuzzlesIndex } = usePuzzlesIndexStore();
  const [allPuzzles, setAllPuzzles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    setCurrentIndex(puzzlesIndex[difficulty]);
  }, []);

  useEffect(() => {
    setIsComplete(false);
  }, []);

  useEffect(() => {
    setAllPuzzles(Object.entries(puzzles[difficulty]));
  }, []);

  const handleIndexIncrease = () => {
    if (allPuzzles.length > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleIndexDecrease = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Stage>
      <GameStageHeader type="select" difficulty={difficulty} />
      <StageBackgroundImg src={Wallpaper} alt="wallpaper" />

      <Puzzles>
        <Icon src={Back} onClick={handleIndexDecrease} />
        {[-2, -1, 0, 1, 2].map((idx) => {
          const currentPuzzle = puzzles[difficulty][currentIndex + idx];

          return currentPuzzle ? (
            <Puzzle key={currentPuzzle.title}>
              <PuzzleImg
                src={Unsolved}
                alt="UnsolvedPuzzle"
                onClick={() => {
                  puzzlesIndex[difficulty] = currentIndex + idx;
                  setPuzzlesIndex(puzzlesIndex);
                  navigate(`/puzzles/${difficulty}/${currentIndex + idx}`);
                }}
              />
              <PuzzleLabel>{currentPuzzle.title}</PuzzleLabel>
            </Puzzle>
          ) : (
            <Puzzle />
          );
        })}
        <Icon src={Next} onClick={handleIndexIncrease} />
      </Puzzles>
    </Stage>
  );
}

export default GameSelectPage;
