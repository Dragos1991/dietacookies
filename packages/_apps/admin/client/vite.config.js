import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    root: "./sources/src",
    build: {
        emptyOutDir: true,
        outDir: "../../dist",
    },
    plugins: [react()],
});
