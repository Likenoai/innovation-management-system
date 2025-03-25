<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { Search, Upload, Download } from '@element-plus/icons-vue';
import { useMyLoginStore } from '@/stores/myLoginStore';
import UserManageCard from '@/components/UserManageCard.vue';
import * as staffApi from '@/api/staffApi.js';
import { importDataApi } from '@/api/verifyApi.js';
import { ElMessage, ElTooltip } from 'element-plus';
import { debounce } from 'lodash';
// 获取登录状态
const loginStore = useMyLoginStore();

class ListParams {
	constructor() {
		this.pageNum = 1; // 当前页码
		this.pageSize = 30; // 每页条目数
		this.currentPage = 1; // 当前页面
		this.total = 0; // 总条目数
	}
	reset() {
		this.pageNum = 1;
		this.pageSize = 30;
		this.currentPage = 1; // 重置当前页面
		this.total = 0; // 重置总条目数
	}
}
class StudentListParams extends ListParams {
	constructor() {
		super();
		this.college = ''; // 学院
		this.name = ''; // 姓名
		this.studentId = ''; // 学号
		this.majorName = ''; // 专业
		this.grade = ''; // 年级
		this.educationLevel = ''; // 学历
	}
	resetSelect() {
		this.college = '';
		this.name = '';
		this.studentId = '';
		this.majorName = '';
		this.grade = '';
		this.educationLevel = '';
	}
	trim() {
		this.college = this.college.trim();
		this.name = this.name.trim();
		this.studentId = this.studentId.trim();
		this.majorName = this.majorName.trim();
		this.grade = this.grade.trim();
		this.educationLevel = this.educationLevel.trim();
	}
}
class TeacherListParams extends ListParams {
	constructor() {
		super();
		this.personnelCode = ''; // 人员编码
		this.name = ''; // 姓名
		this.currentUnit = ''; // 当前单位
	}
	resetSelect() {
		this.personnelCode = '';
		this.name = '';
		this.currentUnit = '';
	}
	trim() {
		this.personnelCode = this.personnelCode.trim();
		this.name = this.name.trim();
		this.currentUnit = this.currentUnit.trim();
	}
}

const expertListParams = ref(new ListParams());
const studentListParams = ref(new StudentListParams());
const teacherListParams = ref(new TeacherListParams());
const managerListParams = ref(new ListParams());

const categoryOptions = ref(['计算机与信息学院']);
const studentList = ref([]);
const teacherList = ref([]);
const expertList = ref([]);
const managerList = ref([]);

const dialogVisibleStudent = ref(false);
const dialogVisibleTeacher = ref(false);
const dialogVisibleExpert = ref(false);
const dialogVisibleManager = ref(false);

// 封装的错误处理函数
const handleApiCall = async (apiCall, params) => {
	try {
		return await apiCall(params); // 调用 API
	} catch (error) {
		if (error.status === 401) {
			ElMessage.error('缺少权限');
		} else {
			ElMessage.error('请求失败: ' + error.message);
		}
		throw error; // 抛出错误以便后续处理
	}
};

// 获取基础数据
const getManagerList = async () => {
	dialogVisibleManager.value = true;
	const response = await handleApiCall(staffApi.getManagersApi, {
		...managerListParams.value,
	});
	if (response) {
		managerList.value = response.data.recordList;
		managerListParams.value.total = response.data.total;
		dialogVisibleManager.value = false;
	}
};

const handelStudentSelect = () => {
	studentListParams.value.trim();
	console.log('studentListParams:', studentListParams.value);
	getStudentList();
};
const getStudentList = async () => {
	dialogVisibleStudent.value = true;
	const response = await handleApiCall(staffApi.getStudentsApi, {
		...studentListParams.value,
	});
	if (response) {
		studentList.value = response.data.recordList;
		studentListParams.value.total = response.data.total;
		dialogVisibleStudent.value = false;
	}
};

const getExpertList = async () => {
	dialogVisibleExpert.value = true;
	const response = await handleApiCall(staffApi.getExpertsApi, {
		...expertListParams.value,
	});
	if (response) {
		expertList.value = response.data.recordList;
		expertListParams.value.total = response.data.total;
		dialogVisibleExpert.value = false;
	} else {
		ElMessage.error('获取专家列表失败');
	}
};

const handelTeacherSelect = () => {
	teacherListParams.value.trim();
	console.log('teacherListParams:', teacherListParams.value);
	getTeacherList();
};

const getTeacherList = async () => {
	dialogVisibleTeacher.value = true;
	const response = await handleApiCall(staffApi.getTeachersApi, {
		...teacherListParams.value,
	});
	if (response) {
		teacherList.value = response.data.recordList;
		teacherListParams.value.total = response.data.total;
		dialogVisibleTeacher.value = false;
	} else {
		ElMessage.error('获取教师列表失败');
	}
};

const getStuColleges = async () => {
	let res = await handleApiCall(staffApi.getStuCollegesApi);
	if (res.code === 200) {
		categoryOptions.value = res.data;
	}
};
onMounted(() => {
	getExpertList();
	getTeacherList();
	getStudentList();
	getManagerList();
	getStuColleges();
});
/**
 * 处理当前页码变化
 *
 * @param {number} type - 表示当前操作的类型：
 *                        0 - 学生列表
 *                        1 - 教师列表
 *                        2 - 专家列表
 *                        3 - 管理员列表
 * @param {number} newPage - 新的页码
 */
const handleCurrentChange = (newPage, type) => {
	switch (type) {
		case 0:
			// 更新学生列表的当前页码
			studentListParams.value.pageNum = newPage; // 使用 .value
			studentListParams.value.currentPage = newPage; // 使用 .value
			getStudentList();
			break;
		case 1:
			// 更新教师列表的当前页码
			teacherListParams.value.pageNum = newPage; // 使用 .value
			teacherListParams.value.currentPage = newPage; // 使用 .value
			getTeacherList();
			break;
		case 2:
			// 更新专家列表的当前页码
			expertListParams.value.pageNum = newPage; // 使用 .value
			expertListParams.value.currentPage = newPage; // 使用 .value
			getExpertList();
			break;
		case 3:
			// 更新专家列表的当前页码
			managerListParams.value.pageNum = newPage; // 使用 .value
			managerListParams.value.currentPage = newPage; // 使用 .value
			getManagerList();
			break;
		default:
		// 处理无效的类型
	}
};

// 下载模板
import { handleDownload } from '../utils';
const getTemplate = async (type) => {
	let res = await staffApi.getTemplateApi({ type });
	let name = '';
	switch (type) {
		case 0:
			// 当 expression 等于 value1 时执行的代码
			name = '学生导入模板.xlsx';
			break;
		case 1:
			// 当 expression 等于 value2 时执行的代码
			name = '教师导入模板.xlsx';
			break;
		case 2:
			// 当 expression 等于 value3 时执行的代码
			name = '校内评审专家导入模板.xlsx';
			break;
		case 3:
			// 当 expression 等于 value3 时执行的代码
			name = '院级评审专家导入模板.xlsx';
			break;
		default:
		// 当 expression 不等于任何 case 值时执行的代码
	}
	if (handleDownload(res.data, name)) {
		ElMessage.success(`${name}下载成功`);
	} else {
		ElMessage.error(`${name}下载失败`);
	}
};

const form = ref({
	oldPassword: '',
	newPassword: '',
	confirmPassword: '',
});

import { changeUserApi } from '@/api/userApi.js';
// 功能区

// 修改密码S
async function updatePassword() {
	if (form.value.newPassword !== form.value.confirmPassword) {
		ElMessage.error('两次输入的密码不一致');
		return;
	}
	if (
		!form.value.oldPassword ||
		!form.value.newPassword ||
		!form.value.confirmPassword
	) {
		ElMessage.error('请填写完整密码信息');
		return;
	}
	try {
		let id = loginStore.id;
		const response = await changeUserApi(id, {
			password: form.value.oldPassword,
			newPassword: form.value.newPassword,
		});
		if (response.code === 200) {
			ElMessage.success('密码修改成功');
			form.value.oldPassword = '';
			form.value.newPassword = '';
			form.value.confirmPassword = '';
		} else {
			ElMessage.error('密码修改失败');
		}
	} catch (error) {
		console.error('密码修改错误:', error);
		ElMessage.error('密码修改失败: ' + error.message);
	}
}
// 修改密码E

// 动态调整表格高度S
import { useDynamicHeight } from '@/utils/index.js';
const tableHeightRef = useDynamicHeight();

// // 动态调整表格高度E

const visibilityStates = {
	expert: ref(true),
	collegeAdmin: ref(true),
	teacher: ref(true),
	student: ref(true),
	self: ref(true),
};
function visibilityAllFalse() {
	visibilityStates.expert.value = false;
	visibilityStates.collegeAdmin.value = false;
	visibilityStates.teacher.value = false;
	visibilityStates.student.value = false;
	visibilityStates.self.value = false;
}

function toggleVisibility(type) {
	if (!singlePageMode.value) {
		if (visibilityStates[type] !== undefined) {
			visibilityStates[type].value = !visibilityStates[type].value;
		}
	} else {
		visibilityAllFalse();
		visibilityStates[type].value = true;
	}
}

/// 单页面模式S
const singlePageMode = ref(true);

// 切换单页面模式
function toggleSinglePageMode() {
	if (!singlePageMode.value) {
		visibilityAllFalse();
	}
	singlePageMode.value = !singlePageMode.value;
}
/// 单页面模式E

// 初始化可见性状态
function initVisibilityStates() {
	visibilityStates.expert.value = false;
	visibilityStates.collegeAdmin.value = false;
	visibilityStates.teacher.value = false;
	visibilityStates.student.value = false;
}

onMounted(() => {
	initVisibilityStates();
});

// 检查用户是否有权限查看某个卡片
function hasPermission(permission) {
	return loginStore.permissions.includes(permission);
}

// 定义按钮类型
const buttonTypes = [
	{ label: '专家', type: 'expert', permission: 'view_expert_info' },
	{
		label: '学院管理员',
		type: 'collegeAdmin',
		permission: 'view_college_admin_info',
	},
	{ label: '教师', type: 'teacher', permission: 'view_teacher_info' },
	{ label: '学生', type: 'student', permission: 'view_student_info' },
	{ label: '当前用户', type: 'self', permission: 'view_self_info' },
];

// 创建一个新的被过滤过的数组
const filteredButtonTypes = computed(() => {
	return buttonTypes.filter((button) => hasPermission(button.permission));
});

/// 信息导入S
// 处理文件导入
/**
 * 通用导入处理函数
 * @param {File} file - 上传的文件对象
 * @param {string} typeName - 类型名称（用于提示信息）
 * @param {number} typeValue - 类型值（0-学生，1-教师，2-学院专家，3-校内专家）
 * @param {Function} [onSuccess] - 成功后的回调函数
 */
const handleImport = async (file, typeName, typeValue, onSuccess) => {
	try {
		ElMessage.info(`正在导入${typeName}信息`);

		const formData = new FormData();
		formData.append('file', file);
		formData.append('type', typeValue);

		const response = await importDataApi(formData);
		console.log(response);
		if (response.code === 200) {
			ElMessage.success(`${typeName}导入成功`);
			onSuccess?.(); // 执行成功回调（如果有）
		} else {
			ElMessage.error(response.msg);
		}
	} catch (error) {
		ElMessage.error(`${typeName}导入失败: ${error.message}`);
	}
	return false; // 阻止默认上传行为
};
//  信息导入E
//	重置密码S
/**
 * 重置用户密码
 *
 * @param {Object} row - 包含用户信息的对象，必须包含用户的 id。
 * @param {number} type - 用户类型：
 *                        0 - 学生
 *                        1 - 教师
 *                        2 - 专家、管理员
 */

const resetPassword = debounce(async (row, type) => {
	console.log('row:', row);
	let res = await staffApi.resetPasswordApi({ id: row.id, type });
	console.log(res);
	if (res.code == 200) {
		ElMessage.success(`${row.name}:重置密码成功`);
	}
}, 300);
//	重置密码E

// // 处理溢出状态
const handleOverflow = (row, isOverflow) => {
	row.isOverflow = isOverflow;
};

// // 自定义指令
// const vCheckOverflow = {
// 	mounted(el, binding) {
// 		const callback = binding.value;
// 		const check = () => {
// 			const isOverflow = el.scrollWidth > el.clientWidth;
// 			callback(isOverflow);
// 		};

// 		// 立即执行首次检查
// 		check();

// 		// 创建监听器
// 		const observer = new ResizeObserver(check);
// 		observer.observe(el);

// 		// 存储到元素属性以便卸载
// 		el._overflowObserver = observer;
// 	},
// 	updated(el, binding) {
// 		// 更新时重新检查
// 		const callback = binding.value;
// 		const isOverflow = el.scrollHeight > el.clientHeight;
// 		callback(isOverflow);
// 	},
// 	beforeUnmount(el) {
// 		// 清理监听器
// 		if (el._overflowObserver) {
// 			el._overflowObserver.disconnect();
// 		}
// 	},
// };
</script>

<template>
	<div class="users-manage-container">
		<UserManageCard
			:singlePageMode="singlePageMode"
			v-permission="'view_expert_info'"
			title="专家信息管理"
			:visible="visibilityStates.expert.value"
			@update:visible="(value) => (visibilityStates.expert.value = value)"
		>
			<template #actions>
				<div class="car-btn-box">
					<el-button
						type="primary"
						@click="getTemplate(2)"
						style="height: 42"
						plain
						>校内专家导入模板</el-button
					>
					<el-button
						type="primary"
						@click="getTemplate(3)"
						style="height: 42"
						plain
						>院级专家导入模板</el-button
					>
					<el-upload
						action="#"
						:before-upload="
							(file) =>
								handleImport(file, '校内专家', 3, getExpertList)
						"
						:show-file-list="true"
						accept=".xlsx, .xls"
					>
						<el-button type="primary" plain>
							<el-icon><Upload /></el-icon
							>&nbsp;&nbsp;校内专家信息导入
						</el-button>
					</el-upload>
					<el-upload
						action="#"
						:before-upload="
							(file) =>
								handleImport(file, '院级专家', 2, getExpertList)
						"
						:show-file-list="true"
						accept=".xlsx, .xls"
					>
						<el-button type="primary" plain>
							<el-icon><Upload /></el-icon
							>&nbsp;&nbsp;院级专家信息导入
						</el-button>
					</el-upload>
				</div>
			</template>
			<template #table>
				<el-table
					:data="expertList"
					border
					stripe
					:height="tableHeightRef"
					align="center"
					header-align="center"
					v-loading="dialogVisibleExpert"
				>
					<el-table-column
						label="序号"
						width="60"
						header-align="center"
						align="center"
					>
						<template #default="{ $index }">
							{{ $index + 1 }}
						</template>
					</el-table-column>
					<el-table-column
						prop="name"
						label="姓名"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="personnelCode"
						label="人员编码"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="college"
						label="学院"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="subject"
						label="学科"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="unit"
						label="单位"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="action"
						label="操作"
						min-width="160"
						fixed="right"
						align="center"
						header-align="center"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="resetPassword(scope.row, 2)"
								text
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					:current-page="expertListParams.currentPage"
					:page-size="expertListParams.pageSize"
					:total="expertListParams.total"
					@current-change="
						(newPage) => {
							handleCurrentChange(newPage, 2);
						}
					"
				/>
			</template>
		</UserManageCard>

		<!-- 学院管理员信息管理 -->
		<UserManageCard
			:singlePageMode="singlePageMode"
			v-permission="'view_college_admin_info'"
			title="学院管理员信息管理"
			:visible="visibilityStates.collegeAdmin.value"
			@update:visible="
				(value) => (visibilityStates.collegeAdmin.value = value)
			"
		>
			<template #actions> </template>
			<template #table>
				<el-table
					:data="managerList"
					border
					stripe
					:height="tableHeightRef"
					align="center"
					header-align="center"
					v-loading="dialogVisibleManager"
				>
					<el-table-column
						label="序号"
						width="60"
						header-align="center"
						align="center"
					>
						<template #default="{ $index }">
							{{ $index + 1 }}
						</template>
					</el-table-column>
					<el-table-column
						prop="name"
						label="姓名"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="college"
						label="学院"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="action"
						label="操作"
						min-width="100"
						fixed="right"
						align="center"
						header-align="center"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="resetPassword(scope.row, 2)"
								text
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					:current-page="managerListParams.currentPage"
					:page-size="managerListParams.pageSize"
					:total="managerListParams.total"
					@current-change="
						(newPage) => {
							handleCurrentChange(newPage, 3);
						}
					"
				/>
			</template>
		</UserManageCard>
		<!-- 教师信息管理 -->
		<UserManageCard
			:singlePageMode="singlePageMode"
			v-permission="'view_teacher_info'"
			title="教师信息管理"
			:visible="visibilityStates.teacher.value"
			@update:visible="
				(value) => (visibilityStates.teacher.value = value)
			"
		>
			<template #actions>
				<div class="car-btn-box">
					<el-button
						type="primary"
						@click="getTemplate(1)"
						style="height: 42"
						plain
						>教师导入模板</el-button
					>
					<el-upload
						action="#"
						:before-upload="
							(file) =>
								handleImport(file, '教师', 1, getTeacherList)
						"
						:show-file-list="true"
						accept=".xlsx, .xls"
					>
						<el-button type="primary" plain>
							<el-icon><Upload /></el-icon
							>&nbsp;&nbsp;教师信息导入
						</el-button>
					</el-upload>
					<div class="search-container">
						<el-input
							v-model="teacherListParams.personnelCode"
							placeholder="请输入人员编码"
							clearable
							class="input-item"
							style="padding-bottom: 10px"
						>
						</el-input>
						<el-input
							v-model="teacherListParams.name"
							placeholder="请输入姓名"
							clearable
							class="input-item"
							style="padding-bottom: 10px"
						>
						</el-input>
						<el-input
							v-model="teacherListParams.currentUnit"
							placeholder="请输入当前单位"
							clearable
							class="input-item"
							style="padding-bottom: 10px"
						>
						</el-input>

						<el-button
							type="primary"
							@click="handelTeacherSelect"
							style="height: 42"
							plain
							>搜索</el-button
						>
					</div>
				</div>
			</template>
			<template #table>
				<el-table
					:data="teacherList"
					border
					stripe
					:height="tableHeightRef"
					align="center"
					header-align="center"
					v-loading="dialogVisibleTeacher"
				>
					<el-table-column
						label="序号"
						width="60"
						header-align="center"
						align="center"
					>
						<template #default="{ $index }">
							{{ $index + 1 }}
						</template>
					</el-table-column>
					<el-table-column
						prop="name"
						label="姓名"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="personnelCode"
						label="人员编码"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="currentUnit"
						label="当前单位"
						align="center"
						header-align="center"
					>
						<template #default="{ row }">
							<div>
								<el-tooltip
									:content="row.currentUnit"
									placement="top-start"
									:disabled="!row.isOverflow"
								>
									<div class="project-info">
										<div
											class="project-name"
											v-height-overflow="
												(val) =>
													handleOverflow(row, val)
											"
										>
											{{ row.currentUnit }}
										</div>
										<!-- 其他标签 -->
									</div>
								</el-tooltip>
							</div>
						</template></el-table-column
					>
					<el-table-column
						prop="professionalTitle"
						label="职称"
						align="center"
						header-align="center"
						min-width="120"
					/>
					<el-table-column
						prop="highestDegree"
						label="最高学位"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="highestEducation"
						label="最高学历"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="ethnicity"
						label="民族"
						align="center"
						header-align="center"
					/>

					<el-table-column
						prop="gender"
						label="性别"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="birthDate"
						label="出生日期"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="arrivalDate"
						label="到岗日期"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="rankLevel"
						label="职级"
						align="center"
						header-align="center"
					/>
					<el-table-column
						prop="registerFlag"
						label="是否注册"
						width="120"
						fixed="right"
					>
						<template #default="scope">
							<span
								:style="
									scope.row.registerFlag == 1
										? { color: '#95d475' }
										: { color: '#f89898' }
								"
							>
								{{
									scope.row.registerFlag == 1
										? '已注册'
										: '未注册'
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="action"
						label="操作"
						align="center"
						header-align="center"
						fixed="right"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="resetPassword(scope.row, 1)"
								text
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					:current-page="teacherListParams.currentPage"
					:page-size="teacherListParams.pageSize"
					:total="teacherListParams.total"
					@current-change="
						(newPage) => {
							handleCurrentChange(newPage, 1);
						}
					"
				/>
			</template>
		</UserManageCard>
		<!-- 学生信息管理 -->
		<UserManageCard
			:singlePageMode="singlePageMode"
			v-permission="'view_student_info'"
			title="学生信息管理"
			:visible="visibilityStates.student.value"
			@update:visible="
				(value) => (visibilityStates.student.value = value)
			"
		>
			<template #actions>
				<div class="car-btn-box">
					<el-button
						type="primary"
						@click="getTemplate(0)"
						style="height: 42"
						plain
						>学生导入模板</el-button
					>
					<el-upload
						action="#"
						:before-upload="
							(file) =>
								handleImport(file, '学生', 0, getStudentList)
						"
						:show-file-list="true"
						accept=".xlsx, .xls"
					>
						<el-button type="primary" plain>
							<el-icon><Upload /></el-icon
							>&nbsp;&nbsp;学生信息导入
						</el-button>
					</el-upload>
					<div class="search-container">
						<el-input
							v-model="studentListParams.name"
							placeholder="请输入姓名"
							clearable
							class="input-item"
							style="padding-bottom: 10px"
						>
						</el-input>
						<el-input
							v-model="studentListParams.studentId"
							placeholder="请输入学号"
							clearable
							class="input-item"
							style="padding-bottom: 10px"
						>
						</el-input>
						<el-select
							v-model="studentListParams.college"
							placeholder="请选择学院"
							clearable
							class="input-item"
						>
							<el-option
								v-for="item in categoryOptions"
								:label="item"
								:value="item"
							></el-option>
						</el-select>
						<el-input
							v-model="studentListParams.majorName"
							placeholder="请输入专业"
							clearable
							class="input-item"
							style="padding-bottom: 10px"
						>
						</el-input>
						<el-input
							v-model="studentListParams.grade"
							placeholder="请输入年级"
							clearable
							class="input-item"
							style="padding-bottom: 10px"
						>
						</el-input>

						<el-button
							type="primary"
							@click="handelStudentSelect"
							style="height: 42"
							plain
							>搜索</el-button
						>
					</div>
				</div>
			</template>
			<template #table>
				<el-table
					:data="studentList"
					border
					stripe
					:height="tableHeightRef"
					align="center"
					header-align="center"
					v-loading="dialogVisibleStudent"
					table-layout="auto"
				>
					<el-table-column
						label="序号"
						width="60"
						header-align="center"
						align="center"
					>
						<template #default="{ $index }">
							{{ $index + 1 }}
						</template>
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="100" />
					<el-table-column
						prop="studentId"
						label="学号"
						width="auto"
						fit="true"
					>
						<template #default="{ row }">
							<div style="white-space: nowrap">
								{{ row.studentId }}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="college" label="学院" width="180" />
					<el-table-column prop="majorName" label="专业" width="120">
						<template #default="{ row }">
							<div style="white-space: nowrap">
								{{ row.majorName }}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="grade" label="年级" width="100" />
					<el-table-column
						prop="educationLevel"
						label="学历"
						width="120"
					/>
					<el-table-column
						prop="registerFlag"
						label="是否注册"
						fixed="right"
					>
						<template #default="scope">
							<span
								:style="
									scope.row.registerFlag == 1
										? { color: '#95d475' }
										: { color: '#f89898' }
								"
							>
								{{
									scope.row.registerFlag == 1
										? '已注册'
										: '未注册'
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="action" label="操作" fixed="right">
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="resetPassword(scope.row, 0)"
								text
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					:current-page="studentListParams.currentPage"
					:page-size="studentListParams.pageSize"
					:total="studentListParams.total"
					@current-change="
						(newPage) => {
							handleCurrentChange(newPage, 0);
						}
					"
				/>
			</template>
		</UserManageCard>

		<UserManageCard
			:singlePageMode="singlePageMode"
			v-permission="'view_self_info'"
			title="当前用户密码管理"
			:visible="visibilityStates.self.value"
			@update:visible="(value) => (visibilityStates.self.value = value)"
		>
			<template #table>
				<el-form
					:model="form"
					label-width="120px"
					:style="{
						height: tableHeightRef,
					}"
					class="user-content"
				>
					<el-form-item label="原来密码">
						<el-input
							v-model="form.oldPassword"
							type="password"
							show-password
							style="max-width: 300px"
						/>
					</el-form-item>
					<el-form-item label="新密码">
						<el-input
							v-model="form.newPassword"
							type="password"
							show-password
							style="max-width: 300px"
						/>
					</el-form-item>
					<el-form-item label="确认密码">
						<el-input
							v-model="form.confirmPassword"
							type="password"
							show-password
							style="max-width: 300px"
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="updatePassword"
							>修改密码</el-button
						>
					</el-form-item>
				</el-form>
			</template>
		</UserManageCard>
		<div class="toolbar">
			<el-button
				v-for="button in filteredButtonTypes"
				:key="button.type"
				:type="visibilityStates[button.type].value ? 'success' : 'info'"
				@click="toggleVisibility(button.type)"
				round
				style="margin: 0"
				:class="
					visibilityStates[button.type].value
						? 'el-button--primary'
						: 'el-button--plain'
				"
			>
				{{ button.label }}
			</el-button>
			<el-button
				:type="singlePageMode ? 'primary' : 'info'"
				@click="toggleSinglePageMode"
				round
				style="margin: 0"
			>
				单页面模式
			</el-button>
		</div>
	</div>
</template>

<style scoped lang="less">
.users-manage-container {
	height: 100%;
	width: 100%;
	padding: 20px;
	display: flex;
	justify-content: end;
	align-items: flex-start;
	gap: 20px;
	.car-btn-box {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;

		flex-wrap: wrap;
		overflow-x: auto; /* 仅在需要时显示水平滚动条 */
		overflow-y: hidden; /* 隐藏垂直滚动条 */
		/* 自定义滚动条样式 */
		::-webkit-scrollbar {
			width: 2px !important;
		}
		::-webkit-scrollbar-thumb {
			background-color: #888; /* 滚动条颜色 */
			border-radius: 10px; /* 滚动条圆角 */
		}
		::-webkit-scrollbar-thumb:hover {
			background-color: #555; /* 滚动条悬停时的颜色 */
		}
		::-webkit-scrollbar-track {
			background: #f1f1f1; /* 滚动条轨道颜色 */
			border-radius: 10px; /* 轨道圆角 */
		}
		.search-container {
			display: flex;
			gap: 10px;
			.input-item {
				width: 200px;
			}
		}
	}
}
.toolbar {
	min-width: 100px;
	display: flex;
	flex-direction: column;
	gap: 10px;

	.el-button--primary {
		background-color: #3b415f;
		color: #ffffff;
		border: none;
		&:hover {
			background-color: #4b5278;
			color: #ffffff;
		}
		&:active {
			background-color: #2d3249;
			color: #ffffff;
		}
	}
	.el-button--plain {
		background-color: transparent;
		border: 1px solid #3b415f;
		color: #3b415f;
		&:hover {
			background-color: #f5f7fa;
			border-color: #4b5278;
			color: #4b5278;
		}
		&:active {
			background-color: #e4e7ed;
			border-color: #2d3249;
			color: #2d3249;
		}
	}
}
.project-info {
	/* display: flex; */
	align-items: flex-start;
}

.project-name {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* 超过1行显示省略号 */
	-webkit-box-orient: vertical;
}
</style>
