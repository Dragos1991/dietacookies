import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
    console.log(mode);
    return {
        root: "./sources/src",
        build: {
            emptyOutDir: true,
            minify: mode === "development" ? false : true,
            outDir: "../../dist",
            commonjsOptions: {},
        },
        plugins: [react()],
    };
});
