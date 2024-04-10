import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import GameStageHeader from "../shared/Header/GameStageHeader";

import usePuzzlesStore from "../../store/puzzle";
import useSolvedPuzzlesStore from "../../store/solvedPuzzles";

import Duck from "../../assets/puzzle/duck.png";
import Custom from "../../assets/puzzle/custom.png";
import Donut from "../../assets/puzzle/donut.png";
import Plus from "../../assets/icon/icon-plus.png";
import Dumbbell from "../../assets/puzzle/dumbbell.png";
import Apple from "../../assets/puzzle/apple.png";
import useFetchPuzzles from "../../apis/useFetchPuzzles";

const Icon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 60px;
  margin: 0px 10px;
  border-radius: 10px;
  box-shadow: 2px 4px 8px;
  transition: transform 0.3s ease-in-out;
  z-index: 30;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    color: #007302;
  }
`;

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

const Difficulty = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Difficulties = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  height: 100vh;
`;

const DifficultyImg = styled.img`
  width: 300px;
  border-radius: 10px;
  box-shadow: 2px 4px 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  &:active {
    color: #007302;
  }
`;

const DifficultyLabel = styled.div`
  font-size: 64px;
  font-weight: 900;
`;

function Main() {
  const navigate = useNavigate();
  const { puzzles } = usePuzzlesStore();
  const { solvedPuzzles } = useSolvedPuzzlesStore();

  useFetchPuzzles();

  const difficultyImg = {
    tutorial: Donut,
    easy: Apple,
    normal: Dumbbell,
    hard: Duck,
    custom: Custom,
  };

  return (
    <Stage>
      <GameStageHeader type="main" />

      <Difficulties>
        {["tutorial", "easy", "normal", "hard", "custom"].map((difficulty) => (
          <Difficulty key={difficulty}>
            {difficulty === "custom" && (
              <Icon src={Plus} onClick={() => navigate("/puzzle/making")} />
            )}
            <DifficultyImg
              src={difficultyImg[difficulty]}
              alt={`${difficulty}Img`}
              onClick={() => navigate(`/puzzles/${difficulty}`)}
              id={`${difficulty}Img`}
            />
            <DifficultyLabel>{difficulty}</DifficultyLabel>
            <DifficultyLabel>
              {`${Object.keys(solvedPuzzles[difficulty]).length} / ${Object.entries(puzzles[difficulty]).length}`}
            </DifficultyLabel>
          </Difficulty>
        ))}
      </Difficulties>
    </Stage>
  );
}

export default Main;
