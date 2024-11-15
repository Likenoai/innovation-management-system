// 定义角色和权限映射
export const rolePermissions = {
	// 学生
	student: [
		// 竞赛管理
		'view_my_competitions', // 我的竞赛
		// 用户管理
		'view_users_manage', // 用户管理
		// 创新创业项目
		'view_innovation_projects',
		// 项目库
		'view_project_library',
		// 提交项目
		'submit_project',
	],
	// 教师
	teacher: [
		// 竞赛管理
		'view_competitions', // 竞赛列表
		'view_my_competitions', // 我的竞赛
		// 创新创业项目
		'view_innovation_projects',
		// 项目库
		'view_project_library',
		// 评审项目
		'review_student_projects',
		// 管理项目
		'manage_own_projects',
		// 用户管理
		'view_users_manage', // 用户管理
	],
	// 专家
	expert: [
		'view_competitions',
		'view_innovation_projects',
		'view_project_library',
		'evaluate_projects',
	],
	// 学院管理员
	college_admin: [
		'view_competitions',
		'view_innovation_projects',
		'view_project_library',
		'manage_college_projects',
		'manage_college_users',
	],
	// 学校管理员
	school_admin: [
		'view_competitions',
		'view_innovation_projects',
		'view_project_library',
		'manage_all_projects',
		'manage_all_users',
		'manage_system_settings',
	],
};
