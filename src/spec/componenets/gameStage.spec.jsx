import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as ReactRouter from "react-router-dom";
import GameStage from "../../components/GameStage/GameStage";
import TutorialGameStage from "../../components/GameStage/TutorialGameStage";
import usePuzzlesStore from "../../store/puzzle";

import puzzleMock from "../puzzleMock.json";

const initialState = usePuzzlesStore.getState();

test("enter the game stage", () => {
  initialState.puzzles.easy = puzzleMock.easy;
  usePuzzlesStore.setState(initialState);

  render(
    <MemoryRouter initialEntries={["/puzzles/easy/1"]}>
      <Routes>
        <Route
          path="/puzzles/:difficulty/:stageNumber"
          element={<GameStage />}
        />
      </Routes>
    </MemoryRouter>,
  );
});

test("enter the game stage", () => {
  initialState.puzzles.tutorial = puzzleMock.easy;
  usePuzzlesStore.setState(initialState);

  render(
    <MemoryRouter initialEntries={["/puzzles/tutorial/1"]}>
      <Routes>
        <Route
          path="/puzzles/tutorial/:stageNumber"
          element={<TutorialGameStage />}
        />
      </Routes>
    </MemoryRouter>,
  );
});
