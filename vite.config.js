import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [vue()],
	server: {
		open: true, // 运行时自动在浏览器打开
		port: 8800,
		proxy: {
			'/api': {
				target: 'http://localhost:5500',
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
