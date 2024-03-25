import { useEffect, useState } from "react";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import GameStageHeader from "../Header/GameStageHeader";

import usePuzzlesStore from "../../store/puzzle";
import useSolvedPuzzlesStore from "../../store/solvedPuzzles";

import Fox from "../../assets/puzzle/fox.png";
import Shark from "../../assets/puzzle/shark.png";
import Duck from "../../assets/puzzle/duck.png";
import Sunflower from "../../assets/puzzle/sunflower.png";
import Matchstick from "../../assets/puzzle/matchstick.png";
import Cookie from "../../assets/puzzle/cookie.png";
import Custom from "../../assets/puzzle/custom.png";
import Donut from "../../assets/puzzle/donut.png";
import Plus from "../../assets/icon/icon-plus.png";

const Icon = styled.img`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  margin: 0px 10px;
  border-radius: 10px;
  box-shadow: 2px 4px 8px;
  transition: transform 0.3s ease-in-out;

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
  const { puzzles, setPuzzles } = usePuzzlesStore();
  const { solvedPuzzles } = useSolvedPuzzlesStore();

  useEffect(() => {
    async function fetchCustomPuzzles() {
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

    fetchCustomPuzzles();
  }, []);

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
            {`${Object.keys(solvedPuzzles.tutorial).length} / ${Object.entries(puzzles.tutorial).length}`}
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
            {`${Object.keys(solvedPuzzles.easy).length}  / ${Object.entries(puzzles.easy).length}`}
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
            {`${Object.keys(solvedPuzzles.normal).length} / ${Object.entries(puzzles.normal).length}`}
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
            {`${Object.keys(solvedPuzzles.hard).length} / ${Object.entries(puzzles.hard).length}`}
          </DifficultyLabel>
        </Difficulty>

        <Difficulty>
          <DifficultyImg
            src={Custom}
            alt="custom"
            onClick={() => navigate("/puzzles/custom")}
          />
          <DifficultyLabel>Custom</DifficultyLabel>
          <DifficultyLabel>
            {`${Object.keys(solvedPuzzles.custom).length} / ${Object.entries(puzzles.custom).length}`}
          </DifficultyLabel>
        </Difficulty>
      </Difficulties>
      <Icon src={Plus} onClick={() => navigate("/puzzle/making")} />
    </Stage>
  );
}

export default Main;
