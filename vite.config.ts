import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
	server: { port: 9999 },
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			plugins: [['@swc/plugin-styled-components', {}]]
		})
	]
});
