import { useEffect } from "react";
import { useTutorialStepStore } from "../store/store.tsx";
import { Coordinate } from "../../types/cube.ts";

const useSetTutorialStep = (
  stageNumber: string | undefined,
  setPixelPointerPosition: (state: Coordinate) => void,
  setPixelPointerRotation: (state: Coordinate) => void,
  setCubePointerPosition: (state: Coordinate) => void,
  setMoveDirection: (state: "x" | "y") => void,
  setTutorialNumber: (state: number) => void,
) => {
  const { tutorialStep } = useTutorialStepStore();

  useEffect(() => {
    if (stageNumber === "1" && tutorialStep[stageNumber] === 4) {
      setPixelPointerPosition([-0.5, 3.5, 0.3]);
      setPixelPointerRotation([0, Math.PI / 4, Math.PI]);
    } else if (stageNumber === "1" && tutorialStep[stageNumber] === 5) {
      setPixelPointerPosition([1.5, 3.5, 0.3]);
      setPixelPointerRotation([0, Math.PI / 4, Math.PI]);
    } else {
      setPixelPointerPosition([-100, 0, 0]);
    }
  }, [tutorialStep["1"]]);

  useEffect(() => {
    if (stageNumber === "2" && tutorialStep[stageNumber] === 2) {
      setPixelPointerPosition([-0.5, 7.5, 0.3]);
      setCubePointerPosition([-1, 5, 2]);
    } else if (stageNumber === "2" && tutorialStep[stageNumber] === 3) {
      setPixelPointerPosition([1.5, 7.5, 0.3]);
      setCubePointerPosition([1, 5, 2]);
    } else {
      setPixelPointerPosition([-100, 0, 0]);
      setCubePointerPosition([-100, 0, 0]);
    }
  }, [tutorialStep["2"]]);

  useEffect(() => {
    if (stageNumber === "3" && tutorialStep[stageNumber] === 2) {
      setPixelPointerPosition([2, 5, 0]);
    } else if (stageNumber === "3" && tutorialStep[stageNumber] === 3) {
      setPixelPointerPosition([2.6, 5, -0.6]);
    } else if (stageNumber === "3" && tutorialStep[stageNumber] === 4) {
      setPixelPointerPosition([5, 2.5, 0.3]);
      setPixelPointerRotation([0, 0, Math.PI / 2 + 0.4]);
      setMoveDirection("x");
    } else if (stageNumber === "3" && tutorialStep[stageNumber] === 5) {
      setPixelPointerPosition([-100, 0, 0]);
      setCubePointerPosition([2, 5, 0]);
    } else {
      setPixelPointerPosition([-100, 0, 0]);
      setCubePointerPosition([-100, 0, 0]);
    }
  }, [tutorialStep["3"]]);

  useEffect(() => {
    if (stageNumber === "1") {
      setTutorialNumber(1);
    } else if (stageNumber === "2") {
      setTutorialNumber(2);
    } else if (stageNumber === "3") {
      setTutorialNumber(3);
    } else if (stageNumber === "4") {
      setTutorialNumber(4);
    }
  }, [stageNumber]);
};

export default useSetTutorialStep;
