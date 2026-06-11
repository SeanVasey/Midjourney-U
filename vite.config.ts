import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // "/" for Vercel; GitHub Pages sets "/<repo>/" via VITE_BASE_PATH in deploy-pages.yml
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react()],
});
