import { useNavigate } from "react-router-dom";
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

import breakpoints from "../../styles/media";
import { useLanguageStore } from "../../store/store";

const Icon = styled.img`
  position: absolute;
  top: 5%;
  right: 5%;
  width: 20%;
  max-width: 60px;
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

const Difficulties = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
  margin: 0px 10px;
`;

const Difficulty = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
`;

const DifficultyImg = styled.img`
  width: 100%;
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
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 900;

  @media screen and (min-width: ${breakpoints.md}) {
    font-size: 42px;
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    font-size: 48px;
  }

  @media screen and (min-width: ${breakpoints.xl}) {
    font-size: 52px;
  }
`;

function Main() {
  const navigate = useNavigate();
  const { puzzles } = usePuzzlesStore();
  const { solvedPuzzles } = useSolvedPuzzlesStore();
  const { language } = useLanguageStore();

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
        {[
          ["tutorial", "튜토리얼"],
          ["easy", "쉬움"],
          ["normal", "보통"],
          ["hard", "어려움"],
          ["custom", "커스텀"],
        ].map((difficulties) => {
          const difficulty = difficulties[0];
          return (
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
              <DifficultyLabel>
                {language === "English" ? difficulty : difficulties[1]}
              </DifficultyLabel>
              <DifficultyLabel>
                {`${Object.keys(solvedPuzzles[difficulty]).length} / ${Object.entries(puzzles[difficulty]).length}`}
              </DifficultyLabel>
            </Difficulty>
          );
        })}
      </Difficulties>
    </Stage>
  );
}

export default Main;
