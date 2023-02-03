/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), svgrPlugin(), VitePluginHtmlEnv()],
    test: {
        environment: 'happy-dom',
        coverage: {
            provider: 'istanbul',
            reporter: ['html', 'lcov', 'text'],
        },
    },
});
