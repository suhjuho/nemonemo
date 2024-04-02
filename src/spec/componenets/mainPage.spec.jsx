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

    expect(await screen.findByText("Tutorial")).toBeInTheDocument();
    expect(await screen.findByText("Easy")).toBeInTheDocument();
    expect(await screen.findByText("Normal")).toBeInTheDocument();
    expect(await screen.findByText("Hard")).toBeInTheDocument();
    expect(await screen.findByText("Custom")).toBeInTheDocument();

    await waitFor(
      () => {
        const { puzzles } = usePuzzlesStore.getState();
        expect(Object.entries(puzzles.tutorial).length).toBeGreaterThan(0);
        expect(Object.entries(puzzles.easy).length).toBeGreaterThan(0);
        expect(Object.entries(puzzles.normal).length).toBeGreaterThan(0);
        expect(Object.entries(puzzles.hard).length).toBeGreaterThan(0);
        expect(Object.entries(puzzles.custom).length).toBeGreaterThan(0);
      },
      { timeout: 1000 },
    );
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
      { timeout: 1000 },
    );
  });
});
