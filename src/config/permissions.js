// 定义角色和权限映射
export const rolePermissions = {
	student: [
		'view_competitions',
		'view_innovation_projects',
		'view_project_library',
		'submit_project',
	],
	teacher: [
		'view_competitions',
		'view_innovation_projects',
		'view_project_library',
		'review_student_projects',
		'manage_own_projects',
	],
	expert: [
		'view_competitions',
		'view_innovation_projects',
		'view_project_library',
		'evaluate_projects',
	],
	college_admin: [
		'view_competitions',
		'view_innovation_projects',
		'view_project_library',
		'manage_college_projects',
		'manage_college_users',
	],
	school_admin: [
		'view_competitions',
		'view_innovation_projects',
		'view_project_library',
		'manage_all_projects',
		'manage_all_users',
		'manage_system_settings',
	],
};
