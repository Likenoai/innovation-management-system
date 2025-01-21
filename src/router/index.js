import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/login/login.vue';
import Layout from '../layout/index.vue';
import { ElMessage } from 'element-plus';
import { useMyLoginStore } from '../stores/myLoginStore.js';

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/',
		component: Layout,
		redirect: '/home',
		children: [
			{
				path: 'home',
				name: 'Home',
				component: HomeView,
				meta: { requiresAuth: true },
			},
			// Competitions Module
			{
				path: 'competitions',
				name: 'Competitions',
				component: () => import('../views/competitions/index.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_competitions',
				},
			},
			{
				path: 'my-competitions',
				name: 'MyCompetitions',
				component: () =>
					import('../views/competitions/MyCompetitions.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_my_competitions',
				},
			},
			// Innovation Module
			{
				path: 'innovation',
				name: 'Innovation',
				component: () => import('../views/innovation/index.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_innovation_projects',
				},
			},
			{
				// 学生上传项目
				path: 'upload-innovation',
				name: 'UploadInnovation',
				component: () =>
					import(
						'../views/innovation/uploadInnovation/uploadInnovation.vue'
					),
				meta: {
					requiresAuth: true,
					permission: 'view_innovation_upload',
				},
			},
			{
				// 设定学生提交项目信息
				path: 'set-upload-innovation',
				name: 'SetUploadInnovation',
				component: () =>
					import('../views/innovation/setUploadInnovation.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_set_upload_innovation',
				},
			},
			{
				// 学院评审
				path: 'college-review',
				name: 'CollegeReview',
				component: () =>
					import('../views/innovation/collegeReview.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_college_review',
				},
			},
			{
				// 专家评审
				path: 'expert-review',
				name: 'ExpertReview',
				component: () => import('../views/innovation/expertReview.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_expert_review',
				},
			},
			{
				// 分配专家
				path: 'assign-experts',
				name: 'AssignExperts',
				component: () =>
					import('../views/innovation/assignExperts.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_assign_experts',
				},
			},
			{
				// 推荐省赛项目
				path: 'provincial-recommendation',
				name: 'ProvincialRecommendation',
				component: () =>
					import('../views/innovation/provincialRecommendation.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_provincial_recommendation',
				},
			},
			{
				// 成功录入
				path: 'achievement-entry',
				name: 'AchievementEntry',
				component: () =>
					import('../views/innovation/achievementEntry.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_achievement_entry',
				},
			},

			// Project Library Module
			{
				path: 'project-library',
				name: 'ProjectLibrary',
				component: () => import('../views/project-library/index.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_project_library',
				},
			},
			{
				path: 'users-manage',
				name: 'UsersManage',
				component: () => import('../views/usersMag/UsersMessage.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
	const loginStore = useMyLoginStore();
	const token = loginStore.token;
	const permissions = loginStore.permissions;

	// console.log('router token:', token);
	// console.log('loginStore.role:', loginStore.role);

	if (to.path === '/login') {
		if (token) {
			next('/');
		} else {
			next();
		}
		return;
	}

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!token) {
			next('/login');
			return;
		}

		// 检查权限
		if (to.meta.permission) {
			if (!permissions || !permissions.includes(to.meta.permission)) {
				ElMessage.error('没有访问权限');
				next(false);
				return;
			}
		}
	}

	next();
});

export default router;
