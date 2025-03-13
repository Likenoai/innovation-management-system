import axios from 'axios';
import { withErrorHandling } from './uitls';

// 项目申报
const applyProjectFunction = async (data) => {
	return axios.post('/api/contest/applyProject', data);
};
export const applyProject = withErrorHandling(applyProjectFunction);

// 获取项目详情
const getProjectDetailsFunction = async () => {
	return axios.get('/api/contest/getProjectDetails');
};
export const getProjectDetails = withErrorHandling(getProjectDetailsFunction);

// 获取项目导师
const advisorsByDetailIdFunction = async (detailId) => {
	return axios.get('/api/contest/advisorsByDetailId', {
		params: { detailId },
	});
};
export const advisorsByDetailId = withErrorHandling(advisorsByDetailIdFunction);

// 获取项目成员
const membersByDetailIdFunction = async (detailId) => {
	return axios.get('/api/contest/membersByDetailId', {
		params: { detailId },
	});
};
export const membersByDetailId = withErrorHandling(membersByDetailIdFunction);

// 获取项目版本
const versionByDetailIdFunction = async (detailId) => {
	return axios.get('/api/contest/versionByDetailId', {
		params: { detailId },
	});
};
export const versionByDetailId = withErrorHandling(versionByDetailIdFunction);

// 更新项目详情
const updateDetailFunction = async (data) => {
	return axios.post('/api/contest/updateDetail', data);
};
export const updateDetail = withErrorHandling(updateDetailFunction);

// 提交导师建议
const advisorSuggestionFunction = async (data) => {
	return axios.post('/api/contest/advisorSuggestion', data);
};
export const advisorSuggestion = withErrorHandling(advisorSuggestionFunction);

// 项目评审
// 新增评审状态接口
const reviewFunction = async (data) => {
	return axios.post('/api/contest/review', data);
};
export const review = withErrorHandling(reviewFunction);

// 新增学院项目评分查询
const scoreProjectsByCollegeFunction = async (params) => {
	return axios.get('/api/contest/scoreProjectsByCollege', {
		params: {
			pageNum: params.pageNum || 1,
			pageSize: params.pageSize || 10,
			college: params.college,
			type: params.type,
			status: params.status,
		},
	});
};
export const scoreProjectsByCollege = withErrorHandling(
	scoreProjectsByCollegeFunction
);

// 新增项目打分接口（增强参数处理）
const giveScoreFunction = async (data) => {
	return axios.post('/api/contest/giveScore', {
		detailId: data.detailId,
		projectId: data.projectId,
		reviewType: data.reviewType,
		reviewScore: data.reviewScore,
		reviewDetail: data.reviewDetail,
		reviewDescribe: data.reviewDescribe,
	});
};
export const giveScore = withErrorHandling(giveScoreFunction);

// 新增分配评审接口
const assignToExpertScoreFunction = async () => {
	return axios.post('/api/contest/assignToExpertScore');
};
export const assignToExpertScore = withErrorHandling(
	assignToExpertScoreFunction
);

// 新增待评分项目接口
const pendingScoreFunction = async (params) => {
	return axios.get('/api/contest/pendingScore', {
		params: {
			pageNum: params.pageNum || 1,
			pageSize: params.pageSize || 10,
			type: params.type,
			status: params.status,
		},
	});
};
export const pendingScore = withErrorHandling(pendingScoreFunction);

// 学院项目查询
const getProjectsByCollegeFunction = async (params) => {
	return axios.get('/api/contest/getProjectsByCollege', {
		params,
	});
};
export const getProjectsByCollege = withErrorHandling(
	getProjectsByCollegeFunction
);

// 新增获取单个项目接口
const getProjectFunction = async (projectId) => {
	return axios.get(`/api/contest/getProject/${projectId}`);
};
export const getProject = withErrorHandling(getProjectFunction);

// 新增获取单个项目接口
const updateProjectApiFunction = async (param) => {
	return axios.post(`/api/contest/updateProject`, {
		...param,
	});
};
export const updateProject = withErrorHandling(updateProjectApiFunction);
