import "@testing-library/jest-dom";

import { vi } from "vitest";

/* @ts-ignore */
HTMLCanvasElement.prototype.getContext = () => ({
  fillStyle: "",
  fillRect: vi.fn(),
});
