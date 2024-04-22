import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    outDir: "build",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Assuming your API server is running at this address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove the '/api' prefix
      },
      "/delivery": {
        target: "http://localhost:8001", // Assuming your delivery options server is running at this address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/delivery/, ""), // Remove the '/delivery' prefix
      },
    },
  },
});
