import { useState } from "react";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import GameStageHeader from "../Header/GameStageHeader";

import usePuzzlesStore from "../../store/puzzle";

import Fox from "../../assets/puzzle/fox.png";
import Shark from "../../assets/puzzle/shark.png";
import Duck from "../../assets/puzzle/duck.png";
import Sunflower from "../../assets/puzzle/sunflower.png";
import Matchstick from "../../assets/puzzle/matchstick.png";
import Cookie from "../../assets/puzzle/cookie.png";
import Donut from "../../assets/puzzle/donut.png";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

const Difficulty = styled.div`
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
`;

const DifficultyLabel = styled.div`
  font-size: 64px;
`;

function Main() {
  const navigate = useNavigate();
  const { puzzles } = usePuzzlesStore();

  return (
    <Stage>
      <GameStageHeader type="main" />

      <Difficulties>
        <Difficulty>
          <DifficultyImg
            src={Donut}
            alt="donut"
            onClick={() => navigate("/puzzles/tutorial")}
          />
          <DifficultyLabel>Tutorial</DifficultyLabel>
          <DifficultyLabel>
            {`0 / ${Object.entries(puzzles.tutorial).length}`}
          </DifficultyLabel>
        </Difficulty>

        <Difficulty>
          <DifficultyImg
            src={Sunflower}
            alt="sunflower"
            onClick={() => navigate("/puzzles/easy")}
          />
          <DifficultyLabel>Easy </DifficultyLabel>
          <DifficultyLabel>
            {`0 / ${Object.entries(puzzles.easy).length}`}
          </DifficultyLabel>
        </Difficulty>

        <Difficulty>
          <DifficultyImg
            src={Duck}
            alt="duck"
            onClick={() => navigate("/puzzles/normal")}
          />
          <DifficultyLabel>Normal</DifficultyLabel>
          <DifficultyLabel>
            {`0 / ${Object.entries(puzzles.normal).length}`}
          </DifficultyLabel>
        </Difficulty>

        <Difficulty>
          <DifficultyImg
            src={Fox}
            alt="fox"
            onClick={() => navigate("/puzzles/hard")}
          />
          <DifficultyLabel>Hard</DifficultyLabel>
          <DifficultyLabel>
            {`0 / ${Object.entries(puzzles.hard).length}`}
          </DifficultyLabel>
        </Difficulty>
      </Difficulties>
    </Stage>
  );
}

export default Main;
