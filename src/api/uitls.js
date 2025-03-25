import { ElMessage } from 'element-plus';

// 高阶函数，用于封装错误处理

export const withErrorHandling = (asyncFunc, baseConfig = {}) => {
	return async function (params, runtimeConfig = {}) {
		// 合并配置（运行时配置优先级更高）
		const config = { ...baseConfig, ...runtimeConfig };
		try {
			const response = await asyncFunc(params);
			if (config.successMsg) {
				ElMessage.success({
					message: config.successMsg,
					duration: 1500,
				});
			}
			return config.transformResponse?.(response) ?? response;
		} catch (error) {
			ElMessage.error({
				message: config.errorMsg || '操作失败，请稍后重试',
				duration: 3000,
			});
			return { success: false, error: error.message, data: null };
		}
	};
};
