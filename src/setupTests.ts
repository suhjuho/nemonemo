import "@testing-library/jest-dom";

import { vi } from "vitest";

/* @ts-expect-error */
HTMLCanvasElement.prototype.getContext = () => ({
  fillStyle: "",
  fillRect: vi.fn(),
});
