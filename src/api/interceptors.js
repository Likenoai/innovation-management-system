import axios from 'axios';
import { useMyLoginStore } from '../stores/myLoginStore';
import { storeToRefs } from 'pinia';

export function setupInterceptors() {
	const myLoginStore = useMyLoginStore();
	const { token } = storeToRefs(myLoginStore);
	console.log(token);
	axios.interceptors.request.use(
		(config) => {
			if (token.value) {
				config.headers['SC-TOKEN'] = `Bearer ${token.value}`;
				config.headers.Authorization = `Bearer ${token.value}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	axios.interceptors.response.use(
		function (response) {
			// 2xx 范围内的状态码都会触发该函数。
			// 对响应数据做点什么
			// console.log(response)
			return response.data;
		},
		function (error) {
			// 超出 2xx 范围的状态码都会触发该函数。
			// 对响应错误做点什么
			return Promise.reject(error);
		}
	);
}
