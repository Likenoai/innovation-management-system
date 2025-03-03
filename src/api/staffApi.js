import axios from 'axios';
import { withErrorHandling } from './uitls';

// 获取学生列表
const getStudentsApiFunction = async ({
	pageNum,
	pageSize,
	college,
	name,
	studentId,
	majorName,
	grade,
	educationLevel,
}) => {
	let res = await axios.get(
		`/api/staff/getStudents?pageNum=${pageNum}&college=${college}&name=${name}&studentId=${studentId}&majorName=${majorName}&grade=${grade}&educationLevel=${educationLevel}&pageSize=${pageSize}`,
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
const getTeachersApiFunction = async ({
	pageNum,
	pageSize,
	personnelCode,
	name,
	currentUnit,
}) => {
	let res = await axios.get(
		`/api/staff/getTeachers?pageNum=${pageNum}&pageSize=${pageSize}&personnelCode=${personnelCode}&name=${name}&currentUnit=${currentUnit}`,
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

// 所有学生的学院
const getStuCollegesApiFunction = async () => {
	let res = await axios.get('/api/staff/stuColleges', {
		headers: {
			'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
		},
	});
	return res;
};
export const getStuCollegesApi = withErrorHandling(getStuCollegesApiFunction);

// 用户详情
const getInfoApiFunction = async () => {
	let res = await axios.get('/api/staff/info', {
		headers: {
			'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
		},
	});
	return res;
};
export const getInfoApi = withErrorHandling(getInfoApiFunction);
