import axios from 'axios';
import { withErrorHandling } from './uitls';

// 根据key获取数据
const getDataByKeyApiFunction = async function (key) {
	let res = await axios.get('/api/static/getDataByKey', {
		params: { key },
	});
	return res;
};
export const getDataByKeyApi = withErrorHandling(getDataByKeyApiFunction);

// 分页获取数据
const getDataPageApiFunction = async function ({ pageNum, pageSize }) {
	let res = await axios.get('/api/static/getDataPage', {
		params: { pageNum, pageSize },
	});
	return res;
};
export const getDataPageApi = withErrorHandling(getDataPageApiFunction);

// 新增数据
const addDataApiFunction = async function (param) {
	let res = await axios.post('/api/static/addData', {
		...param,
	});
	return res;
};
export const addDataApi = withErrorHandling(addDataApiFunction);

// 更新数据
const updateDataApiFunction = async function (param) {
	let res = await axios.post('/api/static/updateData', {
		...param,
	});
	return res;
};
export const updateDataApi = withErrorHandling(updateDataApiFunction, {
	successMsg: '更新成功',
});
