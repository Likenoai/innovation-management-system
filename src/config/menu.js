export const menuConfig = [
	{
		path: '/home',
		title: '首页',
		icon: 'HomeFilled',
		permission: null,
	},
	{
		path: '/permission',
		title: '权限管理',
		// permission: 'view_permission',
	},
	{
		path: '/static',
		title: '静态资源管理',
	},
	// {
	// 	path: '/competitions',
	// 	title: '竞赛管理',
	// 	icon: 'Trophy',
	// 	permission: 'view_competitions',
	// 	children: [
	// 		{
	// 			path: '/competitions',
	// 			title: '竞赛列表',
	// 			permission: 'view_competitions',
	// 		},
	// 		{
	// 			path: '/my-competitions',
	// 			title: '我的竞赛',
	// 			permission: 'view_my_competitions',
	// 		},
	// 	],
	// },
	{
		path: '/innovation',
		title: '创新创业项目',
		icon: 'Files',
		permission: 'view_innovation_projects',
		children: [
			{
				path: '/my-projects',
				title: '我的项目',
				permission: 'view_my_projects',
			},
			{
				path: '/college-project-settings',
				title: '院级评审',
				permission: 'view_college_project_settings',
			},
			{
				path: '/school-project-settings',
				title: '校级评审',
				permission: 'view_school_project_settings',
			},
			{
				path: '/expert-review',
				title: '专家评审',
				permission: 'view_expert_review',
			},
		],
	},
	{
		path: '/project-library',
		title: '项目库',
		icon: 'Files',
		permission: 'view_project_library',
	},
	{
		path: '/users-manage',
		title: '用户管理',
		icon: 'User',
		permission: 'view_users_manage',
	},
	{
		title: '系统管理',
		icon: 'Setting',
		permission: 'manage_system_settings',
		children: [
			// {
			// 	path: '/user',
			// 	title: '用户管理',
			// 	permission: 'manage_all_users',
			// },
			// {
			// 	path: '/role',
			// 	title: '角色管理',
			// 	permission: 'manage_system_settings',
			// },
		],
	},
];
