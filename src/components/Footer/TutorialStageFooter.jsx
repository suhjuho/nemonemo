import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Out from "../../assets/icon/icon-out.png";
import { useTutorialStepStore } from "../../store/store";

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
  }
`;

const NextButton = styled.div`
  font-size: 60px;
  font-weight: 900;
  padding: 0px 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  border: 3px solid white;
  border-radius: 20px;
  box-shadow: 2px 4px 8px;

  ${(props) =>
    props.highlight === "true" &&
    `
    box-shadow: 0px 0px 30px white;
  `}
`;

function GameStageFooter({ difficulty, currentIndex, puzzleLength }) {
  const navigate = useNavigate();
  const { stageNumber } = useParams();
  const { tutorialStep } = useTutorialStepStore();

  return (
    <Footer>
      <img
        src={Out}
        alt="out"
        onClick={() => navigate(`/puzzles/${difficulty}`)}
      />
      {currentIndex < puzzleLength && (
        <NextButton
          onClick={() =>
            navigate(`/puzzles/${difficulty}/${Number(currentIndex) + 1}`)
          }
          highlight="true"
        >
          Next
        </NextButton>
      )}
    </Footer>
  );
}

export default GameStageFooter;
