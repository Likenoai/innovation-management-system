// 高阶函数，用于封装错误处理
export const withErrorHandling = (asyncFunc) => {
	return async function (...args) {
		try {
			return await asyncFunc(...args);
		} catch (error) {
			console.error(`${asyncFunc.name} error:`, error);
			throw error; // 重新抛出错误以便上层处理
		}
	};
};
