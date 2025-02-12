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
	},
	{
		path: '/innovation',
		title: '创新创业项目',
		icon: 'Light',
		permission: 'view_innovation_projects',
	},
	{
		path: '/project-library',
		title: '项目库',
		icon: 'Files',
		permission: 'view_project_library',
	},
	{
		title: '系统管理',
		icon: 'Setting',
		permission: 'manage_system_settings',
		children: [
			{
				path: '/user',
				title: '用户管理',
				permission: 'manage_all_users',
			},
			{
				path: '/role',
				title: '角色管理',
				permission: 'manage_system_settings',
			},
		],
	},
];
