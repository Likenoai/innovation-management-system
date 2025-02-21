import axios from 'axios';
import { withErrorHandling } from './uitls';
// 封装 API 函数
const loginApiFunction = async function (param) {
	let res = await axios.post('/api/user/login', {
		...param,
	});
	return res;
};
export const loginApi = withErrorHandling(loginApiFunction);

const addApiFunction = async function (param) {
	let res = await axios.post('/api/user/add', {
		...param,
	});
	return res;
};
export const addApi = withErrorHandling(addApiFunction);

const getDetailApiFunction = async function (token) {
	let res = await axios.get('/api/user/getDetail', {
		headers: {
			'SC-TOKEN': token,
		},
	});
	return res;
};
export const getDetailApi = withErrorHandling(getDetailApiFunction);

const getByIdApiFunction = async function (id) {
	let res = await axios.get(`/api/user/${id}`);
	return res;
};
export const getByIdApi = withErrorHandling(getByIdApiFunction);

const changeUserApiFunction = async function (id, param) {
	let res = await axios.post(`/api/user/change/${id}`, {
		...param,
	});
	return res;
};
export const changeUserApi = withErrorHandling(changeUserApiFunction);

const updateUserApiFunction = async function (param) {
	let res = await axios.post('/api/user/update', {
		...param,
	});
	return res;
};
export const updateUserApi = withErrorHandling(updateUserApiFunction);

const deleteUserApiFunction = async function (id) {
	let res = await axios.post(`/api/user/delete/${id}`);
	return res;
};
export const deleteUserApi = withErrorHandling(deleteUserApiFunction);
