import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/led-gala-2k25",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
