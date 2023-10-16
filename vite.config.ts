/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	envDir: '.env',
	test: {
		globals: true,
		environment: 'jsdom',
		reporters: ['default', 'html']
	},
	build: {
		outDir: 'dist',
		cssMinify: true,
		cssCodeSplit: false,
		chunkSizeWarningLimit: 1024,
		copyPublicDir: true,
		minify: 'esbuild'
	},
	server: {
		port: 4444
	},
	preview: {
		port: 4000
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			plugins: [['@swc/plugin-emotion', {}]]
		})
	]
});
