import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useTutorialStepStore } from "../../store/store";

const Modal = styled.div`
  position: absolute;
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 3px solid white;
  padding: 20px;
  background-color: rgba(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0px 0px 8px black;
  top: ${(props) => props.top || "20px"};
  left: ${(props) => props.left || "0px"};
  width: ${(props) => props.width || "50vw"};
  height: ${(props) => props.height || "15vh"};
`;

const Content = styled.div`
  font-size: ${(props) => props.fontSize || "32px"};
  font-weight: 700;
  white-space: pre-line;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 10px;
  width: 80px;
  height: 50px;
  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => props.buttoncolor || "#ffffff"};
`;

function TutorialModal({
  currentStep,
  content,
  isEnd,
  ModalProps,
  ContentProps,
  hasButton,
}) {
  const { tutorialStep, nextTutorialStep } = useTutorialStepStore();
  const { stageNumber } = useParams();
  const buttoncolors = {
    1: "rgba(228, 180, 180, 0.5)",
    2: "rgba(181, 228, 180, 0.5);",
    3: "rgba(89, 88, 86, 0.5);",
    4: "rgba(206, 161, 49, 0.5);",
  };
  const handleClick = (event) => {
    event.stopPropagation();

    if (isEnd) {
      tutorialStep[stageNumber] = 0;
    } else {
      tutorialStep[stageNumber] += 1;
    }

    nextTutorialStep(tutorialStep);
  };

  const handleSkip = (event) => {
    event.stopPropagation();

    tutorialStep[stageNumber] = 0;

    nextTutorialStep(tutorialStep);
  };

  return (
    <Modal {...ModalProps}>
      <Content {...ContentProps}>{content}</Content>
      {hasButton && (
        <Buttons className="buttons">
          {currentStep === 1 && (
            <Button
              onClick={handleSkip}
              buttoncolor={buttoncolors[stageNumber]}
            >
              스킵
            </Button>
          )}
          <Button onClick={handleClick} buttoncolor={buttoncolors[stageNumber]}>
            다음
          </Button>
        </Buttons>
      )}
    </Modal>
  );
}

export default TutorialModal;
