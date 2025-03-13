import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login/index.vue'),
	},
	{
		path: '/',
		component: () => import('../layout/index.vue'),
		redirect: '/home',
		children: [
			{
				path: 'static',
				name: 'static',
				component: () => import('../views/StaticMge.vue'),
				// meta: {
				// 	requiresAuth: true,
				// 	permission: 'view_static',
				// },
			},
			{
				path: 'permission',
				name: 'permission',
				component: () => import('../views/PermissionsManagement.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_permission',
				},
			},
			{
				path: 'home',
				name: 'Home',
				component: () => import('../views/home/index.vue'),
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
				path: 'ai-innovation-expert-assignment',
				name: 'Innovation-Expert-Assignment',
				component: () =>
					import('../views/ai-innovation/ExpertAssignment.vue'),
			},
			{
				path: 'my-projects',
				name: 'MyProjects',
				component: () => import('../views/innovation/MyProjects.vue'),
			},
			{
				// 学生上传项目
				path: 'upload-innovation/:projectId?',
				name: 'UploadInnovation',
				component: () =>
					import('../views/innovation/ProjectUpload.vue'),
				// meta: {
				// 	requiresAuth: true,
				// 	permission: 'view_innovation_upload',
				// },
			},
			{
				path: 'college-project-settings',
				name: 'CollegeProjectSettings',
				component: () =>
					import(
						'../views/innovation/college-project-settings/CollegeProjectSettings.vue'
					),
				redirect: '/college-project-settings/project-table-Mge',
				children: [
					{
						path: 'project-table-Mge',
						name: 'project-table-Mges',
						component: () =>
							import(
								'../views/innovation/college-project-settings/ProjectTableMge.vue'
							),
					},
					{
						path: 'settings-mge',
						name: 'settings-mges',
						component: () =>
							import(
								'../views/innovation/college-project-settings/SettingsMge.vue'
							),
					},
				],
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
				// 专家评审
				path: 'expert-review',
				name: 'ExpertReview',
				component: () => import('../views/innovation/expertReview.vue'),
				// meta: {
				// 	requiresAuth: true,
				// 	permission: 'view_expert_review',
				// },
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
			{
				path: 'permissions-management',
				name: 'permissions-management',
				component: () => import('../views/PermissionsManagement.vue'),
			},
		],
	},
];

export default routes;
