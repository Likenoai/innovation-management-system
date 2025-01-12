export const menuConfig = [
	{
		path: '/home',
		title: '首页',
		icon: 'HomeFilled',
		permission: null,
	},
	{
		path: '/competitions',
		title: '竞赛管理',
		icon: 'Trophy',
		permission: 'view_competitions',
		children: [
			{
				path: '/competitions',
				title: '竞赛列表',
				permission: 'view_competitions',
			},
			{
				path: '/my-competitions',
				title: '我的竞赛',
				permission: 'view_my_competitions',
			},
		],
	},
	{
		path: '/innovation',
		title: '创新创业项目',
		icon: 'Files',
		permission: 'view_innovation_projects',
		children: [
			{
				path: '/innovation',
				title: '创新创业项目',
				permission: 'view_innovation_projects',
			},
			{
				path: '/upload-innovation',
				title: '上传项目',
				permission: 'view_innovation_upload',
			},
			{
				path: '/set-upload-innovation',
				title: '设定学生提交项目信息',
				permission: 'view_set_upload_innovation',
			},
			{
				path: '/college-review',
				title: '学院评审',
				permission: 'view_college_review',
			},
			{
				path: '/expert-review',
				title: '专家评审',
				permission: 'view_expert_review',
			},
			{
				path: '/assign-experts',
				title: '分配专家',
				permission: 'view_assign_experts',
			},
			{
				path: '/provincial-recommendation',
				title: '推荐省赛项目',
				permission: 'view_provincial_recommendation',
			},
			{
				path: '/achievement-entry',
				title: '成果录入',
				permission: 'view_achievement_entry',
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
