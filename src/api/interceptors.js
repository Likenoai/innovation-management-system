import axios from 'axios';
import { useMyLoginStore } from '../stores/myLoginStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

export function setupInterceptors(router) {
	const myLoginStore = useMyLoginStore();
	const { token } = storeToRefs(myLoginStore);

	// 请求拦截器
	axios.interceptors.request.use(
		(config) => {
			// 仅在 token 存在时添加请求头
			if (token.value) {
				config.headers['Authorization'] = `Bearer ${token.value}`;
				config.headers['SC-TOKEN'] = `Bearer ${token.value}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// 响应拦截器
	axios.interceptors.response.use(
		(response) => response.data, // 直接返回响应数据
		async (error) => {
			const { response } = error;

			// // 处理 401 未授权错误
			if (response?.status === 401) {
				try {
					// 清空用户存储
					// await myLoginStore.logout();
					// 避免重复跳转路由
					if (router.currentRoute.value.path !== '/login') {
						router.replace({
							path: '/login',
							query: {
								redirect: router.currentRoute.value.fullPath,
							},
						});
					}
				} catch (err) {
					console.error('登出过程中发生错误:', err);
				}
			}

			// 其他错误处理（可根据需要扩展）
			// else if (response?.status === 403) { ... }

			return Promise.reject(error);
		}
	);
}
