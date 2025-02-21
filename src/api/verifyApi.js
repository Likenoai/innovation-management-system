import axios from 'axios';
import { withErrorHandling } from './uitls';

// 获取验证码
const getCodeApiFunction = async () => {
	let res = await axios.get('/api/verify/getCode');
	return res;
};
export const getCodeApi = withErrorHandling(getCodeApiFunction);

// 校验验证码
const checkCodeApiFunction = async (param) => {
	let res = await axios.post('/api/verify/checkCode', param);
	return res;
};
export const checkCodeApi = withErrorHandling(checkCodeApiFunction);

// 导入数据
const importDataApiFunction = async (param) => {
	let res = await axios.post('/api/verify/importData', param);
	return res;
};
export const importDataApi = withErrorHandling(importDataApiFunction);

// 检查员工
const checkStaffApiFunction = async (params) => {
	let res = await axios.get('/api/verify/checkStaff', { params });
	return res;
};
export const checkStaffApi = withErrorHandling(checkStaffApiFunction);
