import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// 定义常量
const LOCAL_URL = 'http://localhost:9999';
const MOCK_URL = 'http://127.0.0.1:4523/m1/5414981-0-default';
const LLS_URL = 'http://192.168.1.36:8080';
const SERVER_URL = 'http://192.168.177.23:9999';
const SERVER_URL2 = 'http://192.168.177.23:80';

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
	return {
		...commonConfig,
		server: {
			open: true, // 运行时自动在浏览器打开
			port: 8800,
			proxy: {
				'/api': {
					target: command === 'serve' ? SERVER_URL : SERVER_URL2,
				},
			},
		},
	};
});
