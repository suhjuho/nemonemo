import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useTutorialStepStore } from "../../store/store.tsx";
import breakpoints from "../../styles/media.tsx";

interface ModalPropsType {
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  hasButton?: boolean;
}

interface ContentPropsType {
  fontSize?: string;
}

interface TutorialModalProps {
  currentStep: number;
  content: string;
  isEnd?: boolean;
  ModalProps: ModalPropsType;
  ContentProps?: ContentPropsType;
  hasButton?: boolean;
}

const Modal = styled.div<ModalPropsType>`
  position: absolute;
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.hasButton ? "space-around" : "center")};
  align-items: center;
  border: 3px solid white;
  padding: 20px 5vw;
  background-color: rgba(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0px 0px 8px black;
  top: ${(props) => props.top || "10px"};
  left: ${(props) => props.left || "0px"};
  width: ${(props) => props.width || "50vw"};
  height: ${(props) => props.height || "20vh"};

  @media screen and (max-width: ${breakpoints.md}) {
    top: ${(props) => props.top || "10px"};
    left: ${(props) => props.left || "0px"};
    width: ${(props) => props.width || "30vw"};
    height: ${(props) => props.height || "10vh"};
  }
`;

const Content = styled.div<ContentPropsType>`
  font-size: ${(props) => props.fontSize || "32px"};
  font-weight: 700;
  white-space: pre-line;
  text-align: start;

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 16px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.button<{ buttoncolor?: string }>`
  border-radius: 10px;
  width: 80px;
  height: 50px;
  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => props.buttoncolor || "#ffffff"};

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 12px;
    width: 40px;
    height: 25px;
  }
`;

function TutorialModal({
  currentStep,
  content,
  isEnd,
  ModalProps,
  ContentProps,
  hasButton,
}: TutorialModalProps) {
  const { tutorialStep, nextTutorialStep } = useTutorialStepStore();
  const { stageNumber } = useParams<{ stageNumber: string }>();
  const ButtonColors: Record<string, string> = {
    1: "rgba(228, 180, 180, 0.5)",
    2: "rgba(181, 228, 180, 0.5);",
    3: "rgba(89, 88, 86, 0.5);",
    4: "rgba(206, 161, 49, 0.5);",
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (stageNumber) {
      tutorialStep[stageNumber] = isEnd ? 0 : tutorialStep[stageNumber] + 1;
    }

    nextTutorialStep(tutorialStep);
  };

  const handleSkip = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (stageNumber) {
      tutorialStep[stageNumber] = 0;
    }

    nextTutorialStep(tutorialStep);
  };

  return (
    <Modal {...ModalProps} hasButton={hasButton}>
      <Content {...ContentProps}>{content}</Content>
      {hasButton && (
        <Buttons className="buttons">
          {currentStep === 1 && (
            <Button
              onClick={handleSkip}
              buttoncolor={stageNumber ? ButtonColors[stageNumber] : ""}
            >
              스킵
            </Button>
          )}
          <Button
            onClick={handleClick}
            buttoncolor={stageNumber ? ButtonColors[stageNumber] : ""}
          >
            다음
          </Button>
        </Buttons>
      )}
    </Modal>
  );
}

export default TutorialModal;
