import axios from 'axios';
import pinia from '@/stores/index.js';

import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore(pinia);

// 设置请求拦截器
axios.interceptors.request.use(
	(config) => {
		// 如果有 token，则将其添加到请求头中
		const token = loginStore.token;
		if (token) {
			config.headers.token = `${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 添加响应拦截器
axios.interceptors.response.use(
	function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		console.log(response);
		return response.data;
	},
	function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);
