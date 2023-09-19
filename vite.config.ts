import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: 'dist',
		cssMinify: true,
		cssCodeSplit: true,
		copyPublicDir: true
	},
	server: { port: 9999, open: true, host: true },
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
	css: {
		devSourcemap: true
	},
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			plugins: [
				['@swc/plugin-styled-components', {}],
				['@swc/plugin-emotion', {}]
			]
		})
	]
});
