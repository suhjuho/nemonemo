import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as ReactRouter from "react-router-dom";
import usePuzzlesStore from "../../store/puzzle";

import GameStageHeader from "../../components/shared/Header/GameStageHeader";
import GameStageFooter from "../../components/Footer/GameStageFooter";
import TutorialStageFooter from "../../components/Footer/TutorialStageFooter";
import CustomPuzzleHeader from "../../components/CustomPuzzle/CustomPuzzleHeader";
import CustomPuzzleFooter from "../../components/CustomPuzzle/CustomPuzzleFooter";
import GameStageSideBar from "../../components/shared/SideBar/GameStageSideBar";
import TutorialStageSideBar from "../../components/shared/SideBar/TutorialStageSideBar";

const initialState = usePuzzlesStore.getState();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
}));

describe("render Section", () => {
  beforeEach(() => {
    usePuzzlesStore.setState(initialState);
  });

  it("render game stage header on playing game", async () => {
    render(
      <MemoryRouter>
        <GameStageHeader
          type="game"
          difficulty="easy"
          puzzleTitle="puzzle_title"
          puzzleSize={[2, 2, 2]}
        />
      </MemoryRouter>,
    );

    expect(await screen.findByText("2x2x2")).toBeInTheDocument();
    expect(await screen.findByText("puzzle_title")).toBeInTheDocument();
  });

  it("render game stage header on main page", async () => {
    render(
      <MemoryRouter>
        <GameStageHeader
          type="main"
          difficulty="easy"
          puzzleTitle="puzzle_title"
          puzzleSize={[2, 2, 2]}
        />
      </MemoryRouter>,
    );

    expect(await screen.findByText("NEMO NEMO")).toBeInTheDocument();
  });

  it("render game stage footer", async () => {
    render(
      <MemoryRouter>
        <GameStageFooter
          difficulty="tutorial"
          currentIndex={1}
          puzzleLength={2}
        />
      </MemoryRouter>,
    );
  });

  it("render tutorial stage footer", async () => {
    render(
      <MemoryRouter>
        <TutorialStageFooter
          difficulty="tutorial"
          currentIndex={1}
          puzzleLength={2}
        />
      </MemoryRouter>,
    );
  });

  it("render custom puzzle header", async () => {
    render(
      <MemoryRouter>
        <CustomPuzzleHeader />
      </MemoryRouter>,
    );

    expect(await screen.findByText("가로")).toBeInTheDocument();
    expect(await screen.findByText("높이")).toBeInTheDocument();
    expect(await screen.findByText("세로")).toBeInTheDocument();
  });

  it("render custom puzzle footer", async () => {
    render(
      <MemoryRouter>
        <CustomPuzzleFooter />
      </MemoryRouter>,
    );

    expect(await screen.findByText("큐브 선택")).toBeInTheDocument();
  });

  it("render game sidebar", async () => {
    render(
      <MemoryRouter>
        <GameStageSideBar />
      </MemoryRouter>,
    );

    expect(await screen.findByText("표시")).toBeInTheDocument();
    expect(await screen.findByText("제거")).toBeInTheDocument();
  });

  it("render tutorial sidebar", async () => {
    render(
      <MemoryRouter>
        <TutorialStageSideBar />
      </MemoryRouter>,
    );

    expect(await screen.findByText("표시")).toBeInTheDocument();
    expect(await screen.findByText("제거")).toBeInTheDocument();
  });
});
