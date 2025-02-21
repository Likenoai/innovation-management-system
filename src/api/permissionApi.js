import axios from 'axios';
import { withErrorHandling } from './uitls'; // 确保路径正确

// 封装 API 函数
const getAllPermissionsApiFunction = async function () {
	let res = await axios.get('/api/permission/getAll'); // 增加 api
	return res;
};
export const getAllPermissionsApi = withErrorHandling(
	getAllPermissionsApiFunction
);

const getRoleApiFunction = async function (roleId) {
	let res = await axios.get('/api/permission/getRole', {
		// 增加 api
		params: { roleId },
	});
	return res;
};
export const getRoleApi = withErrorHandling(getRoleApiFunction);

const addPowerApiFunction = async function (param) {
	let res = await axios.post('/api/permission/addPower', {
		// 增加 api
		...param,
	});
	return res;
};
export const addPowerApi = withErrorHandling(addPowerApiFunction);

const deletePowerApiFunction = async function (param) {
	let res = await axios.post('/api/permission/deletePower', {
		// 增加 api
		...param,
	});
	return res;
};
export const deletePowerApi = withErrorHandling(deletePowerApiFunction);

const addPermissionApiFunction = async function (param) {
	let res = await axios.post('/api/permission/add', {
		// 增加 api
		...param,
	});
	return res;
};
export const addPermissionApi = withErrorHandling(addPermissionApiFunction);

const deletePermissionApiFunction = async function (param) {
	let res = axios.post('/api/permission/delete', {
		...param,
	});
	return res;
};
export const deletePermissionApi = withErrorHandling(
	deletePermissionApiFunction
);

const updatePermissionApiFunction = async function (param) {
	let res = axios.post('/api/permission/update', {
		...param,
	});
	return res;
};
export const updatePermissionApi = withErrorHandling(
	updatePermissionApiFunction
);
