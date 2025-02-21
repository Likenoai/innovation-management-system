import axios from 'axios';
import { withErrorHandling } from './uitls';

const getAllRoleFunction = async function () {
	let res = await axios.get('/api/role/getAll'); // 增加 api
	return res;
};
export const getAllRoleApi = withErrorHandling(getAllRoleFunction);

const addRoleFunction = async function () {
	let res = await axios.get('/api/role/add'); // 增加 api
	return res;
};
export const addRoleApi = withErrorHandling(addRoleFunction);
