// 定义角色和权限映射
export const rolePermissions = {
	// 学生
	student: [
		// 竞赛管理
		'view_competitions', // 竞赛列表
		'view_my_competitions', // 我的竞赛
		// 创新创业项目
		'view_innovation_projects',
		// 项目库
		'view_project_library',
		// 提交项目
		'submit_project',
		// 用户管理
		'view_users_manage', // 用户管理
		'view_self_info', // 当前用户密码管理
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
		'view_self_info', // 当前用户密码管理
	],
	// 专家
	expert: [
		// 竞赛管理
		'view_competitions',
		// 创新创业项目
		'view_innovation_projects',
		// 项目库
		'view_project_library',
		// 评审项目
		'evaluate_projects',
	],
	// 学院管理员
	college_admin: [
		// 竞赛管理
		'view_competitions', // 竞赛列表
		'view_my_competitions', // 我的竞赛
		// 创新创业项目
		'view_innovation_projects',
		// 项目库
		'view_project_library',
		// 管理学院项目
		'manage_college_projects',
		// 管理学院用户
		'manage_college_users',
		// 用户管理
		'view_users_manage', // 用户管理
		'view_self_info', // 当前用户密码管理
		'view_student_info', // 学生信息管理
		'view_teacher_info', // 教师信息管理
	],
	// 学校管理员
	school_admin: [
		// 竞赛管理
		'view_competitions', // 竞赛列表
		'view_my_competitions', // 我的竞赛
		// 创新创业项目
		'view_innovation_projects',
		// 项目库
		'view_project_library',
		// 管理所有项目
		'manage_all_projects',
		// 管理所有用户
		'manage_all_users',
		// 管理系统设置
		'manage_system_settings',
		// 用户管理
		'view_users_manage', // 用户管理
		'view_self_info', // 当前用户密码管理
		'view_student_info', // 学生信息管理
		'view_teacher_info', // 教师信息管理
		'view_college_admin_info', // 学院管理员信息管理
		'view_expert_info', // 专家信息管理
	],
};
