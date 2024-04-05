import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import * as ReactRouter from "react-router-dom";
import GameSelectPage from "../../components/GameSelectPage/GameSelectPage";
import usePuzzlesStore from "../../store/puzzle";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
}));

describe("render Main Page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/puzzles/easy"]}>
        <Routes>
          <Route path="/puzzles/:difficulty" element={<GameSelectPage />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  it("render game select page", async () => {
    expect(await screen.findByText("easy")).toBeInTheDocument();
    expect(await screen.findByText("Play")).toBeInTheDocument();
  });

  it("puzzles store should be fetched from database on rendering", async () => {
    await waitFor(
      () => {
        const { puzzles } = usePuzzlesStore.getState();

        expect(Object.entries(puzzles.easy).length).toBeGreaterThan(0);
      },
      { timeout: 5000 },
    );
  });
});
