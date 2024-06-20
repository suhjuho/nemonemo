import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useCubeStatesStore,
  useLayerStore,
  useTutorialStepStore,
} from "../../store/store.tsx";
import breakpoints from "../../styles/media.tsx";

import TutorialModal from "./TutorialModal.tsx";

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.1);
`;

function TutorialScene() {
  const { stageNumber } = useParams();
  const { tutorialStep, nextTutorialStep } = useTutorialStepStore();
  const { cubeStates } = useCubeStatesStore();
  const { currentLayer } = useLayerStore();
  const [showTip, setShowTip] = useState(false);
  const mediaQueryList = window.matchMedia(`(max-width: ${breakpoints.md})`);

  useEffect(() => {
    tutorialStep[stageNumber] = 1;
    nextTutorialStep(tutorialStep);
  }, []);

  useEffect(() => {
    if (
      stageNumber === "1" &&
      tutorialStep[stageNumber] === 4 &&
      cubeStates["-100"].isClicked
    ) {
      tutorialStep[stageNumber] += 1;
      nextTutorialStep(tutorialStep);
    }
  }, [cubeStates["-100"]]);

  useEffect(() => {
    if (
      stageNumber === "1" &&
      tutorialStep[stageNumber] === 5 &&
      cubeStates["100"].isRemoved
    ) {
      tutorialStep[stageNumber] += 1;
      nextTutorialStep(tutorialStep);
    }
  }, [cubeStates["100"]]);

  useEffect(() => {
    if (stageNumber === "2" && tutorialStep[stageNumber] === 2) {
      if (
        cubeStates["-1-40"].isClicked &&
        cubeStates["-1-20"].isClicked &&
        cubeStates["-100"].isClicked &&
        cubeStates["-120"].isClicked &&
        cubeStates["-140"].isClicked
      ) {
        tutorialStep[stageNumber] += 1;
        nextTutorialStep(tutorialStep);
      }
    }
  }, [
    cubeStates["-1-40"],
    cubeStates["-1-20"],
    cubeStates["-100"],
    cubeStates["-120"],
    cubeStates["-140"],
  ]);

  useEffect(() => {
    if (stageNumber === "2" && tutorialStep[stageNumber] === 3) {
      if (
        cubeStates["1-40"].isRemoved &&
        cubeStates["1-20"].isRemoved &&
        cubeStates["100"].isRemoved &&
        cubeStates["120"].isRemoved &&
        cubeStates["140"].isRemoved
      ) {
        tutorialStep[stageNumber] += 1;
        nextTutorialStep(tutorialStep);
      }
    }
  }, [
    cubeStates["1-40"],
    cubeStates["1-20"],
    cubeStates["100"],
    cubeStates["120"],
    cubeStates["140"],
  ]);

  useEffect(() => {
    if (stageNumber === "3" && tutorialStep[stageNumber] === 5) {
      if (
        cubeStates["2-20"].isClicked &&
        cubeStates["200"].isRemoved &&
        cubeStates["220"].isClicked
      ) {
        tutorialStep[stageNumber] += 1;
        nextTutorialStep(tutorialStep);
        setShowTip(false);
      }

      if (cubeStates["2-20"].isRemoved || cubeStates["220"].isRemoved) {
        setShowTip(true);
      }
    }
  }, [cubeStates["2-20"], cubeStates["200"], cubeStates["220"]]);

  useEffect(() => {
    if (stageNumber === "3" && tutorialStep[stageNumber] === 6) {
      if (
        cubeStates["200"].isRemoved &&
        cubeStates["000"].isRemoved &&
        cubeStates["-200"].isRemoved
      ) {
        tutorialStep[stageNumber] += 1;
        nextTutorialStep(tutorialStep);
      }
    }
  }, [cubeStates["200"], cubeStates["000"], cubeStates["-200"]]);

  useEffect(() => {
    if (stageNumber === "4" && tutorialStep[stageNumber] === 2) {
      setShowTip(true);
    }
  }, [currentLayer]);

  useEffect(() => {
    if (stageNumber === "4" && tutorialStep[stageNumber] === 3) {
      if (cubeStates["010"].isRemoved && cubeStates["0-10"].isRemoved) {
        tutorialStep[stageNumber] += 1;
        nextTutorialStep(tutorialStep);
        setShowTip(true);
      }
    }
  }, [cubeStates["010"], cubeStates["0-10"]]);

  return (
    <>
      {stageNumber === "1" && (
        <>
          {tutorialStep[stageNumber] === 1 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="환영합니다! 튜토리얼을 진행하시겠습니까?"
                ModalProps={
                  mediaQueryList.matches
                    ? {
                        top: "40vh",
                        left: "30vw",
                        width: "30vw",
                      }
                    : { top: "35vh", left: "27vw", width: "36vw" }
                }
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 2 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`큐브에 적힌 숫자는 퍼즐을 푸는 힌트입니다!\n 힌트를 통해 퍼즐 속에 숨겨진 조각을 찾을 수 있습니다`}
                ModalProps={{ left: "25vw", width: "40vw", height: "20vh" }}
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 3 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="숫자는 해당 라인에서 칠해야 할 큐브의 총 개수를 알려줍니다"
                ModalProps={{ left: "25vw", width: "40vw", height: "15vh" }}
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 4 && (
            <>
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="화살표 방향으로는 총 1개의 큐브를 칠해야 합니다. 클릭을 하여 큐브에 색을 칠해보세요!"
                ModalProps={{ left: "15vw", width: "60vw", height: "10vh" }}
              />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="큐브를 클릭을 하면 색을 칠할 수 있어요!"
                ModalProps={{
                  top: "calc(50vh - 127px)",
                  left: "200px",
                  width: "18vw",
                  height: "5vh",
                }}
                ContentProps={{ fontSize: "24px" }}
              />
            </>
          )}
          {tutorialStep[stageNumber] === 5 && (
            <>
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="화살표 방향으로는 칠해야 할 큐브가 없습니다! 큐브를 우클릭을 하여 제거해보세요!"
                ModalProps={{ left: "15vw", width: "60vw", height: "10vh" }}
              />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="큐브를 우클릭을 하면 제거할 수 있어요!"
                ModalProps={{
                  top: "calc(50vh - 44px)",
                  left: "200px",
                  width: "18vw",
                  height: "5vh",
                }}
                ContentProps={{ fontSize: "24px" }}
              />
            </>
          )}
          {tutorialStep[stageNumber] === 6 && (
            <TutorialModal
              currentStep={tutorialStep[stageNumber]}
              content="축하해요! 퍼즐을 풀었습니다! 다음 스테이지로 이동해 주세요"
              ModalProps={{
                top: "78vh",
                left: "20vw",
                width: "50vw",
                height: "5vh",
              }}
              isEnd
            />
          )}
        </>
      )}
      {stageNumber === "2" && (
        <>
          {tutorialStep[stageNumber] === 1 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="환영합니다! 튜토리얼을 진행하시겠습니까?"
                ModalProps={
                  mediaQueryList.matches
                    ? {
                        top: "40vh",
                        left: "30vw",
                        width: "30vw",
                      }
                    : { top: "35vh", left: "27vw", width: "36vw" }
                }
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 2 && (
            <>
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`숫자를 통해 해당 라인에서 칠해야 할 큐브의 개수를 알 수 있습니다.\n클릭을 하여 큐브에 색을 칠해보세요!`}
                ModalProps={{ left: "15vw", width: "60vw", height: "10vh" }}
              />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`클릭 후 드래그를 하면\n여러 개의 큐브를 한번에 색칠할 수 있어요!`}
                ModalProps={
                  mediaQueryList.matches
                    ? {
                        top: "20vh",
                        left: "15vw",
                        width: "30vw",
                      }
                    : {
                        top: "25vh",
                        left: "15vw",
                        width: "20vw",
                        height: "5vh",
                      }
                }
                ContentProps={{ fontSize: "24px" }}
              />
            </>
          )}
          {tutorialStep[stageNumber] === 3 && (
            <>
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`해당 라인에서 칠해야 할 큐브가 없습니다.\n우클릭으로 큐브를 제거해보세요!`}
                ModalProps={{ left: "30vw", width: "40vw", height: "10vh" }}
              />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`우클릭 후 드래그를 하면\n여러 개의 큐브를한번에 지울 수 있어요!`}
                ModalProps={
                  mediaQueryList.matches
                    ? {
                        top: "20vh",
                        left: "55vw",
                        width: "30vw",
                      }
                    : {
                        top: "25vh",
                        left: "60vw",
                        width: "20vw",
                        height: "5vh",
                      }
                }
                ContentProps={{ fontSize: "24px" }}
              />
            </>
          )}
          {tutorialStep[stageNumber] === 4 && (
            <TutorialModal
              currentStep={tutorialStep[stageNumber]}
              content="축하해요! 퍼즐을 풀었습니다! 다음 스테이지로 이동해 주세요"
              ModalProps={{
                top: "78vh",
                left: "20vw",
                width: "50vw",
                height: "5vh",
              }}
              isEnd
            />
          )}
        </>
      )}
      {stageNumber === "3" && (
        <>
          {tutorialStep[stageNumber] === 1 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="환영합니다! 튜토리얼을 진행하시겠습니까?"
                ModalProps={
                  mediaQueryList.matches
                    ? {
                        top: "40vh",
                        left: "30vw",
                        width: "30vw",
                      }
                    : { top: "35vh", left: "27vw", width: "36vw" }
                }
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 2 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="큐브에 적힌 가운데 숫자는 해당 라인에서 칠해야 할 큐브의 총 개수입니다."
                ModalProps={{ left: "15vw", width: "60vw", height: "10vh" }}
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 3 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`우측 상단에 있는 숫자는 색칠된 큐브들 사이의 빈틈 개수입니다.\n 빈틈의 크기는 하나 이상입니다.`}
                ModalProps={{ left: "20vw", width: "50vw", height: "12vh" }}
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 4 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`우측 상단에 숫자가 없는 경우는 색칠된 큐브들 사이의 빈틈이 없다는 뜻입니다.\n즉 큐브들은 한줄로 연속되어 칠해집니다. `}
                ModalProps={{ left: "15vw", width: "60vw", height: "12vh" }}
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 5 && (
            <>
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`화살표 방향으로는 총 2개의 큐브를 칠해야 하고 중간에 빈틈이 하나 있습니다.\n조건에 맞춰 해당라인을 완성해보세요!`}
                ModalProps={{ left: "20vw", width: "50vw", height: "12vh" }}
              />
              {showTip && (
                <TutorialModal
                  currentStep={tutorialStep[stageNumber]}
                  content="(팁) C 단축키로 클릭 기능을 변경하면 실수로 삭제한 큐브를 생성할 수 있습니다!"
                  ModalProps={
                    mediaQueryList.matches
                      ? {
                          top: "65vh",
                          left: "55vw",
                          width: "30vw",
                        }
                      : {
                          top: "60vh",
                          left: "65vw",
                          width: "20vw",
                          height: "5vh",
                        }
                  }
                  ContentProps={{ fontSize: "24px" }}
                />
              )}
            </>
          )}
          {tutorialStep[stageNumber] === 6 && (
            <>
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="같은 방식으로 남은 퍼즐을 완성해보세요!"
                ModalProps={{
                  top: "5vh",
                  left: "20vw",
                  width: "50vw",
                  height: "10vh",
                }}
              />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="(팁) 배경을 클릭하고 드래그하면 퍼즐을 회전할 수 있어요!"
                ModalProps={
                  mediaQueryList.matches
                    ? {
                        top: "22vh",
                        left: "55vw",
                        width: "30vw",
                      }
                    : {
                        top: "25vh",
                        left: "70vw",
                        width: "15vw",
                        height: "85px",
                      }
                }
                ContentProps={{ fontSize: "24px" }}
              />
            </>
          )}
          {tutorialStep[stageNumber] === 7 && (
            <TutorialModal
              currentStep={tutorialStep[stageNumber]}
              content="축하해요! 퍼즐을 풀었습니다! 다음 스테이지로 이동해 주세요"
              ModalProps={{
                top: "78vh",
                left: "20vw",
                width: "50vw",
                height: "5vh",
              }}
              isEnd
            />
          )}
        </>
      )}
      {stageNumber === "4" && (
        <>
          {tutorialStep[stageNumber] === 1 && (
            <>
              <ModalBackground />
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content="벌써 4번째 스테이지군요! 튜토리얼을 진행하시겠습니까?"
                ModalProps={
                  mediaQueryList.matches
                    ? {
                        top: "40vh",
                        left: "30vw",
                        width: "30vw",
                      }
                    : { top: "35vh", left: "27vw", width: "36vw" }
                }
                hasButton
              />
            </>
          )}
          {tutorialStep[stageNumber] === 2 && (
            <>
              <TutorialModal
                currentStep={tutorialStep[stageNumber]}
                content={`레이어를 이동하면 퍼즐 속에 있는 큐브를 클릭할 수 있습니다.\nQ,W 단축키를 이용하여 레이어 이동을 해보세요`}
                ModalProps={{ left: "20vw", width: "50vw", height: "12vh" }}
                hasButton
              />
              {!showTip && (
                <TutorialModal
                  currentStep={tutorialStep[stageNumber]}
                  content={`Q버튼은 레이어 안쪽으로,\nW 버튼은 레이어 바깥쪽으로\n 이동할 수 있어요!`}
                  ModalProps={
                    mediaQueryList.matches
                      ? {
                          top: "70vh",
                          left: "10px",
                          width: "30vw",
                        }
                      : {
                          top: "calc(50vh + 45px)",
                          left: "120px",
                          width: "15vw",
                          height: "100px",
                        }
                  }
                  ContentProps={{ fontSize: "24px" }}
                />
              )}
              {showTip && (
                <TutorialModal
                  currentStep={tutorialStep[stageNumber]}
                  content="(팁) 퍼즐을 회전하여 이동할 레이어를 변경할 수 있어요!"
                  ModalProps={
                    mediaQueryList.matches
                      ? {
                          top: "70vh",
                          left: "55vw",
                          width: "30vw",
                        }
                      : {
                          top: "calc(50vh + 45px)",
                          left: "70vw",
                          width: "15vw",
                          height: "100px",
                        }
                  }
                  ContentProps={{ fontSize: "24px" }}
                />
              )}
            </>
          )}
          {tutorialStep[stageNumber] === 3 && (
            <TutorialModal
              currentStep={tutorialStep[stageNumber]}
              content="스스로 퍼즐을 완성해보세요!"
              ModalProps={{ left: "20vw", width: "50vw", height: "10vh" }}
            />
          )}
          {tutorialStep[stageNumber] === 4 && (
            <TutorialModal
              currentStep={tutorialStep[stageNumber]}
              content="축하해요! 퍼즐을 풀었습니다!"
              ModalProps={{
                top: "78vh",
                left: "20vw",
                width: "50vw",
                height: "5vh",
              }}
              isEnd
            />
          )}
        </>
      )}
    </>
  );
}

export default TutorialScene;
