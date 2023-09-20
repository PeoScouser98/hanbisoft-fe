import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	envDir: 'env',
	build: {
		outDir: 'dist',
		cssMinify: true,
		cssCodeSplit: true,
		chunkSizeWarningLimit: 1024,
		copyPublicDir: true,
		minify: 'esbuild'
	},
	server: {
		port: 8008
	},
	preview: {
		port: 9000
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
