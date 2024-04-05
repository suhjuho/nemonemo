import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text"],
    },
    setupFiles: "./src/setupTests.js",
    testMatch: ["./src/spec/*.spec.jsx"],
  },
});
