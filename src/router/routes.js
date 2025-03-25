import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login/index.vue'),
	},
	{
		// 专家评审
		path: '/expert-review',
		name: 'ExpertReview',
		component: () => import('../views/innovation/expertReview.vue'),
		meta: {
			requiresAuth: true,
			permission: 'view_expert_review',
		},
	},
	{
		path: '/',
		component: () => import('../layout/index.vue'),
		redirect: '/home',
		children: [
			{
				// 静态资源管理
				path: 'static',
				name: 'static',
				component: () => import('../views/StaticMge.vue'),
				// meta: {
				// 	requiresAuth: true,
				// 	permission: 'view_static',
				// },
			},
			{
				// 权限管理
				path: 'permission',
				name: 'permission',
				component: () => import('../views/PermissionsManagement.vue'),
				// meta: {
				// 	requiresAuth: true,
				// 	permission: 'view_permission',
				// },
			},
			{
				// 首页
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
				// 学院项目设置
				path: 'college-project-settings',
				name: 'CollegeProjectSettings',
				component: () =>
					import(
						'../views/innovation/college-project-settings/CollegeProjectSettings.vue'
					),
				redirect: '/college-project-settings/project-table-Mge',
				meta: {
					requiresAuth: true,
					permission: 'view_college_project_settings',
				},
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
				// 学校项目设置
				path: 'school-project-settings',
				name: 'SchoolProjectSettings',
				component: () =>
					import(
						'../views/innovation/school-project-settings/SchoolProjectSettings.vue'
					),
				redirect: '/school-project-settings/school-project-table-Mge',
				children: [
					{
						path: 'school-project-table-Mge',
						name: 'school-project-table-Mge',
						component: () =>
							import(
								'../views/innovation/school-project-settings/ProjectTableMge.vue'
							),
					},
					{
						path: 'school-settings-mge',
						name: 'school-settings-mge',
						component: () =>
							import(
								'../views/innovation/school-project-settings/SettingsMge.vue'
							),
					},
				],
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
