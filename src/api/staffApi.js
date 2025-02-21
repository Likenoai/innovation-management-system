import axios from 'axios';
import { withErrorHandling } from './uitls';

// 获取学生列表
const getStudentsApiFunction = async () => {
	let res = await axios.get('/api/staff/getStudents', {
		headers: {
			'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
		},
	});
	return res;
};
export const getStudentsApi = withErrorHandling(getStudentsApiFunction);

// 获取教师列表
const getTeachersApiFunction = async () => {
	let res = await axios.get('/api/staff/getTeachers', {
		headers: {
			'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
		},
	});
	return res;
};
export const getTeachersApi = withErrorHandling(getTeachersApiFunction);

// 获取专家列表
const getExpertsApiFunction = async () => {
	let res = await axios.get('/api/staff/getExperts', {
		headers: {
			'SC-TOKEN': localStorage.getItem('token'), // 假设从本地存储获取 token
		},
	});
	return res;
};
export const getExpertsApi = withErrorHandling(getExpertsApiFunction);
