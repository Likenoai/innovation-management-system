import axios from 'axios';
import { withErrorHandling } from './uitls';

// 获取学生列表
const getStudentsApiFunction = async ({ pageNum, pageSize }) => {
	let res = await axios.get(
		`/api/staff/getStudents?pageNum=${pageNum}&pageSize=${pageSize}`,
		{
			headers: {
				'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
			},
		}
	);
	return res;
};
export const getStudentsApi = withErrorHandling(getStudentsApiFunction);

// 获取教师列表
const getTeachersApiFunction = async ({ pageNum, pageSize }) => {
	let res = await axios.get(
		`/api/staff/getTeachers?pageNum=${pageNum}&pageSize=${pageSize}`,
		{
			headers: {
				'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
			},
		}
	);
	return res;
};
export const getTeachersApi = withErrorHandling(getTeachersApiFunction);

// 获取专家列表
const getExpertsApiFunction = async ({ pageNum, pageSize }) => {
	let res = await axios.get(
		`/api/staff/getExperts?pageNum=${pageNum}&pageSize=${pageSize}`,
		{
			headers: {
				'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
			},
		}
	);
	return res;
};
export const getExpertsApi = withErrorHandling(getExpertsApiFunction);

// 获取专家列表
const getManagersApiFunction = async ({ pageNum, pageSize }) => {
	let res = await axios.get(
		`/api/staff/getManagers?pageNum=${pageNum}&pageSize=${pageSize}`,
		{
			headers: {
				'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
			},
		}
	);
	return res;
};
export const getManagersApi = withErrorHandling(getManagersApiFunction);

// 获取下载模板
const getTemplateApiFunction = async (param) => {
	let res = await axios.get('/api/staff/getTemplate?type=' + param.type, {
		headers: {
			'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
		},
	});
	return res;
};
export const getTemplateApi = withErrorHandling(getTemplateApiFunction);

// 重置密码
const resetPasswordApiFunction = async ({ id, type }) => {
	let res = await axios.post(
		'/api/staff/reset/' + id,
		{ type },
		{
			headers: {
				'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
			},
		}
	);
	return res;
};
export const resetPasswordApi = withErrorHandling(resetPasswordApiFunction);
