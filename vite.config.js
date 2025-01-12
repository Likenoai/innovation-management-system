import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// 定义常量
const LOCAL_URL = 'http://localhost:8080';
const MOCK_URL = 'http://127.0.0.1:4523/m1/5414981-0-default';
const LLS_URL = 'http://192.168.1.36:8080';
const SERVER_URL = 'http://192.168.177.23:80';
// /web/java11/scgl-server-0.0.1-SNAPSHOT.jar
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
			'/scgl': {
				target: SERVER_URL, // 使用常量
				// rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
