import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import usePuzzleMakingStore from "../../store/making.tsx";
import { useMarkingNumbersStore } from "../../store/store.tsx";
import getMarkingNumbers from "../../utils/getMarkingNumbers.ts";

const Footer = styled.footer`
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  z-index: 20;

  .next {
    font-size: 60px;
    font-weight: 900;
    padding: 0px 10px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;
  }

  .title-input {
    font-size: 60px;
    padding: 0px 10px;
    border: 3px solid white;
    border-radius: 20px;
    box-shadow: 2px 4px 8px;
    width: 300px;
    height: 90px;
  }

  .end {
    font-size: 60px;
    font-weight: 900;
    padding: 0px 10px;
    text-align: center;
    background-color: rgba(0, 0, 0);
    color: white;
    border: 3px solid white;
    border-radius: 20px;
    margin: 10px 0px;
  }
`;

function CustomPuzzleFooter({ customCubesState }) {
  const {
    puzzleMaking,
    hasAnswers,
    hasColors,
    hasNumbers,
    setPuzzleMaking,
    getAnswers,
    getColors,
    getNumbers,
  } = usePuzzleMakingStore();
  const { setMarkingNumbers } = useMarkingNumbersStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAnswers(false);
    getColors(false);
    getNumbers(false);
  }, []);

  const handleCustomPuzzleAnswer = () => {
    const customCubesStateList = Object.entries(customCubesState);
    const answers = {};
    const colors = {};

    customCubesStateList.forEach((position) => {
      if (!position[1]) {
        answers[position[0]] = true;
        colors[position[0]] = "#ffffff";
      }
    });

    puzzleMaking.answers = answers;
    puzzleMaking.colors = colors;

    setPuzzleMaking(puzzleMaking);
    getAnswers(true);

    const numbers = getMarkingNumbers(
      puzzleMaking.answers,
      puzzleMaking.showingNumbers,
      puzzleMaking.size,
    );

    setMarkingNumbers(numbers);
  };

  const handleCustomPuzzleColor = () => {
    getColors(true);
  };

  const handleCustomPuzzleNumber = () => {
    getNumbers(true);
  };

  const handleSubmitCustomPuzzle = () => {
    async function saveCustomPuzzle() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SAVE_PUZZLE_API}`,
          { puzzle: puzzleMaking },
        );

        console.log(response);
        if (response.data.result === "ok") {
          navigate("/puzzles/custom");
        }
      } catch (error) {
        console.error(error);
      }
    }

    saveCustomPuzzle();
  };

  return (
    <Footer>
      {!hasAnswers && (
        <div className="next" onClick={handleCustomPuzzleAnswer}>
          큐브 선택
        </div>
      )}
      {hasAnswers && !hasColors && (
        <div className="next" onClick={handleCustomPuzzleColor}>
          색상 선택
        </div>
      )}
      {hasAnswers && hasColors && !hasNumbers && (
        <div className="next" onClick={handleCustomPuzzleNumber}>
          숫자 마킹
        </div>
      )}
      {hasNumbers && (
        <>
          <div className="next">퍼즐 이름</div>
          <input
            className="title-input"
            type="text"
            minLength={1}
            maxLength={8}
            onChange={(event) => {
              puzzleMaking.title = event.target.value;

              setPuzzleMaking(puzzleMaking);
            }}
          />
          <div className="end" onClick={handleSubmitCustomPuzzle}>
            제출
          </div>
        </>
      )}
    </Footer>
  );
}

export default CustomPuzzleFooter;
