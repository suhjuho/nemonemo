import { describe, it, expect, beforeEach } from "vitest";
import { waitFor, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainPage from "../../components/MainPage/MainPage";
import usePuzzlesStore from "../../store/puzzle";

describe("render Main Page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
  });

  it("puzzle categories should be rendered", async () => {
    expect(await screen.findByText("NEMO NEMO")).toBeInTheDocument();

    expect(await screen.findByText("tutorial")).toBeInTheDocument();
    expect(await screen.findByText("easy")).toBeInTheDocument();
    expect(await screen.findByText("normal")).toBeInTheDocument();
    expect(await screen.findByText("hard")).toBeInTheDocument();
    expect(await screen.findByText("custom")).toBeInTheDocument();
  });

  it("puzzles store should be fetched from database on rendering", async () => {
    await waitFor(
      () => {
        const { puzzles } = usePuzzlesStore.getState();

        expect(Object.entries(puzzles.tutorial).length).toBeGreaterThan(0);
        expect(Object.entries(puzzles.easy).length).toBeGreaterThan(0);
        expect(Object.entries(puzzles.normal).length).toBeGreaterThan(0);
        expect(Object.entries(puzzles.hard).length).toBeGreaterThan(0);
        expect(Object.entries(puzzles.custom).length).toBeGreaterThan(0);
      },
      { timeout: 5000 },
    );
  });
});
