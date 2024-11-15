import axios from 'axios';

export const fetchTableData = async (page, pageSize) => {
	try {
		const response = await axios.post('/api/competitions', {
			params: {
				page,
				pageSize,
			},
		});
		return response; // 假设响应数据是一个数组
	} catch (error) {
		console.error('获取数据失败:', error);
		throw error;
	}
};
export const fetchMockData = async (page, pageSize) => {
	try {
		const response = await axios.post(
			`/api/competitions?page=${page}&pageSize=${pageSize}`
		);
		return response; // 假设响应数据是一个数组
	} catch (error) {
		console.error('获取数据失败:', error);
		throw error;
	}
};
