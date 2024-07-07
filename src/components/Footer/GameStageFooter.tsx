import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import Out from "../../assets/icon/icon-out.png";
import {
  useGameTimeStore,
  useLanguageStore,
  useUserNameStore,
} from "../../store/store.tsx";
import { DifficultyLevel } from "../../../types/puzzle.ts";
import saveRank from "../../utils/saveRank.ts";
import breakpoints from "../../styles/media.tsx";

const Footer = styled.footer`
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  z-index: 20;

  img {
    width: 80px;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;

    @media screen and (max-width: ${breakpoints.md}) {
      width: 40px;
      border-radius: 10px;
      box-shadow: 2px 4px 8px;
    }
  }

  .user-name {
    font-size: 50px;
    font-weight: 900;
    padding: 2px 0px;
    text-align: center;
    width: fit-content;
    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;
    margin-right: 2px;

    @media screen and (max-width: ${breakpoints.md}) {
      font-size: 20px;
      font-weight: 700;
      border-radius: 10px;
    }
  }

  .next {
    font-size: 60px;
    font-weight: 900;
    padding: 2px 2px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;

    @media screen and (max-width: ${breakpoints.md}) {
      font-size: 20px;
      font-weight: 700;
      border-radius: 10px;
    }
  }
`;

interface GameStageFooterProps {
  difficulty: DifficultyLevel;
  currentIndex: number;
  puzzleLength: number;
}

function GameStageFooter({
  difficulty,
  currentIndex,
  puzzleLength,
}: GameStageFooterProps) {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { language } = useLanguageStore();
  const { userName, setUserName } = useUserNameStore();
  const { gameTime } = useGameTimeStore();
  const { stageNumber = "1" } = useParams<{
    stageNumber: string;
  }>();

  return (
    <Footer>
      <img
        src={Out}
        alt="out"
        onClick={() => navigate(`/puzzles/${difficulty}`)}
      />
      <form>
        <input
          className="user-name"
          placeholder={
            language === "English" ? "Enter User" : "이름을 입력하세요"
          }
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        {!isSubmitted && (
          <button
            className="next"
            onClick={() => {
              saveRank(difficulty, stageNumber, gameTime, userName);
              setIsSubmitted(true);
              setUserName("default name");
            }}
          >
            {language === "English" ? "Save" : "저장"}
          </button>
        )}
      </form>

      {currentIndex < puzzleLength && (
        <div
          className="next"
          onClick={() =>
            navigate(`/puzzles/${difficulty}/${Number(currentIndex) + 1}`)
          }
        >
          {language === "English" ? "Next" : "다음"}
        </div>
      )}
    </Footer>
  );
}

export default GameStageFooter;
