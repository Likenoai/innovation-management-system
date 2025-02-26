import axios from 'axios';
import { withErrorHandling } from './uitls';

// 获取项目分类
const getCategoriesApiFunction = async () => {
	let res = await axios.get('/api/project/categories');
	return res;
};
export const getCategoriesApi = withErrorHandling(getCategoriesApiFunction);

// 获取项目列表
const getProjectsApiFunction = async () => {
	let res = await axios.get('/api/project/getAll');
	return res;
};
export const getProjectsApi = withErrorHandling(getProjectsApiFunction);

// 创建新项目
const createProjectApiFunction = async (param) => {
	let res = await axios.post('/api/project/create', param);
	return res;
};
export const createProjectApi = withErrorHandling(createProjectApiFunction);

// 更新项目
const updateProjectApiFunction = async (param) => {
	let res = await axios.post('/api/project/update', param);
	return res;
};
export const updateProjectApi = withErrorHandling(updateProjectApiFunction);

// 删除项目
const deleteProjectApiFunction = async (id) => {
	let res = await axios.post(`/api/project/delete/${id}`);
	return res;
};
export const deleteProjectApi = withErrorHandling(deleteProjectApiFunction);

// 获取项目详情
const getProjectByIdApiFunction = async (id) => {
	let res = await axios.get(`/api/project/${id}`);
	return res;
};
export const getProjectByIdApi = withErrorHandling(getProjectByIdApiFunction);

// 搜索项目
const searchProjectsApiFunction = async (params) => {
	let res = await axios.get('/api/project/search?' + params);
	return res;
};
export const searchProjectsApi = withErrorHandling(searchProjectsApiFunction);

// 生成项目
const generateProjectsApiFunction = async ({ keyword, numProjects }) => {
	let res = await axios.post('/api/project/generate', {
		keyword,
		numProjects,
	});
	return res;
};
export const generateProjectsApi = withErrorHandling(
	generateProjectsApiFunction
);

// 项目模板
const downloadTemplateApiFunction = async (param) => {
	let res = await axios.get('/api/project/template?' + param);
	return res;
};
export const downloadTemplateApi = withErrorHandling(
	downloadTemplateApiFunction
);

// 模板导入
const importProjectApiFunction = async (param) => {
	console.log(param);
	let res = await axios.post('/api/project/import', param, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return res;
};
export const importProjectApi = withErrorHandling(importProjectApiFunction);
