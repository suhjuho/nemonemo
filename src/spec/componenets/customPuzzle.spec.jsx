import { beforeEach, describe, expect, it, afterEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomPuzzle from "../../components/CustomPuzzle/CustomPuzzle";

const mocks = {
  navigate: vi.fn(),
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  };
});

describe("render Header components", () => {
  beforeEach(() => {
    render(<CustomPuzzle />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("enter the making puzzle stage", () => {
    expect(screen.getByText("가로")).toBeInTheDocument();
    expect(screen.getByText("높이")).toBeInTheDocument();
    expect(screen.getByText("세로")).toBeInTheDocument();
    expect(screen.getByText("큐브 선택")).toBeInTheDocument();
  });

  it("pick color after selecting puzzle", async () => {
    const { container } = render(<CustomPuzzle />);

    const nextButton = container.querySelector(".next");

    fireEvent.click(nextButton);

    expect(screen.queryAllByText("색상 선택").length).toBeGreaterThan(1);
  });

  it("pick marking numbers after selecting color", async () => {
    const { container } = render(<CustomPuzzle />);

    const selectCubeButton = container.querySelector(".next");

    fireEvent.click(selectCubeButton);

    const selectColorButton = container.querySelector(".next");

    fireEvent.click(selectColorButton);

    expect(screen.queryAllByText("숫자 마킹").length).toBeGreaterThan(1);
  });
});
