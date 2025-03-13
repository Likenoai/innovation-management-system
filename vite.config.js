import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// 定义常量
const LOCAL_URL = 'http://localhost:9999';
const MOCK_URL = 'http://127.0.0.1:4523/m1/5414981-0-default';
const TEST_LOCAL_URL = 'http://192.168.177.23:9999';
const TEST_BUILD_URL = 'http://192.168.177.23:8001';
const SERVER_LOCAL_URL = 'http://192.168.177.23:9999';
const SERVER_BUILD_URL = 'http://192.168.177.23:80';

// 提取公共配置
const commonConfig = {
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [vue(), vueJsx()],
};

export default defineConfig(({ command }) => {
	console.log(command);
	return {
		...commonConfig,
		server: {
			open: true, // 运行时自动在浏览器打开
			port: 8800,
			proxy: {
				'/api': {
					target:
						command === 'serve'
							? SERVER_LOCAL_URL
							: SERVER_BUILD_URL,
					target:
						command === 'serve' ? TEST_LOCAL_URL : TEST_BUILD_URL,
					// target: LOCAL_URL,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
