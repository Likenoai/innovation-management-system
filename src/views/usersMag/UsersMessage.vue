<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useLoginStore } from '@/stores/loginStore';
import UserManageCard from '@/components/UserManageCard.vue';
import axios from 'axios';
// 获取登录状态
const loginStore = useLoginStore();

// 生成专家模拟数据
const expertList = [];
for (let i = 1; i <= 20; i++) {
	expertList.push({
		id: i,
		name: `专家${i}`,
		title: '教授',
		college: '计算机科学与技术学院',
		expertise: '人工智能',
		email: `expert${i}@university.edu`,
		phone: `13800${i}000`,
	});
}

const form = ref({
	oldPassword: '',
	newPassword: '',
	confirmPassword: '',
});
import { ElMessage } from 'element-plus';
// 功能区
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
	console.log('修改密码');
	try {
		const response = await axios.put('/scgl/Password/updatePassword', {
			oldPassword: form.value.oldPassword,
			password: form.value.newPassword,
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
function exportTeacher() {
	console.log('导出教师信息');
}

function exportStudent() {
	console.log('导出学生信息');
}

function addExpert() {
	console.log('添加专家账号');
}

function resetPassword(expert) {
	console.log(`重置密码: ${expert.name}`);
}

function deleteExpert(expert) {
	console.log(`删除专家: ${expert.name}`);
}

const tableHeight = ref('650px');

function updateTableHeight() {
	const windowHeight = window.innerHeight;
	tableHeight.value = `${windowHeight - 264}px`;
}

onMounted(() => {
	updateTableHeight();
	window.addEventListener('resize', updateTableHeight);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateTableHeight);
});

const visibilityStates = {
	expert: ref(true),
	collegeAdmin: ref(true),
	teacher: ref(true),
	student: ref(true),
	self: ref(true),
};

function toggleVisibility(type) {
	if (visibilityStates[type] !== undefined) {
		visibilityStates[type].value = !visibilityStates[type].value;
	}
}

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
</script>

<template>
	<div class="users-manage-container">
		<UserManageCard
			v-permission="'view_expert_info'"
			title="专家信息管理"
			:visible="visibilityStates.expert.value"
			@update:visible="(value) => (visibilityStates.expert.value = value)"
		>
			<template #actions>
				<el-button type="primary" @click="addExpert" plain
					>添加专家账号</el-button
				>
			</template>
			<template #table>
				<el-table
					:data="expertList.slice(0, 10)"
					border
					stripe
					:height="tableHeight"
					:header-cell-style="{
						backgroundColor: '#f5f5f5',
						color: '#333',
					}"
				>
					<el-table-column prop="id" label="ID" width="80" />
					<el-table-column prop="name" label="姓名" width="100" />
					<el-table-column prop="title" label="职称" width="100" />
					<el-table-column prop="college" label="学院" width="180" />
					<el-table-column
						prop="expertise"
						label="专业领域"
						width="120"
					/>
					<el-table-column
						prop="email"
						label="邮箱"
						width="180"
						show-overflow-tooltip
					/>
					<el-table-column prop="phone" label="电话" width="120" />
					<el-table-column
						prop="action"
						label="操作"
						min-width="160"
						fixed="right"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="resetPassword(scope.row)"
								text
							>
								重置密码
							</el-button>
							<el-button
								type="primary"
								size="small"
								@click="deleteExpert(scope.row)"
								text
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</UserManageCard>
		<UserManageCard
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
					:data="expertList"
					border
					stripe
					:height="tableHeight"
					:header-cell-style="{
						backgroundColor: '#f5f5f5',
						color: '#333',
					}"
				>
					<el-table-column prop="id" label="ID" width="80" />
					<el-table-column prop="name" label="姓名" width="100" />
					<el-table-column prop="title" label="职称" width="100" />
					<el-table-column prop="college" label="学院" width="180" />
					<el-table-column
						prop="expertise"
						label="专业领域"
						width="120"
					/>
					<el-table-column
						prop="email"
						label="邮箱"
						width="180"
						show-overflow-tooltip
					/>
					<el-table-column prop="phone" label="电话" width="120" />
					<el-table-column
						prop="action"
						label="操作"
						min-width="100"
						fixed="right"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="resetPassword(scope.row)"
								text
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</UserManageCard>
		<UserManageCard
			v-permission="'view_teacher_info'"
			title="教师信息管理"
			:visible="visibilityStates.teacher.value"
			@update:visible="
				(value) => (visibilityStates.teacher.value = value)
			"
		>
			<template #actions>
				<el-button type="primary" @click="exportTeacher" plain
					>教师信息导入</el-button
				>
			</template>
			<template #table>
				<el-table
					:data="expertList"
					border
					stripe
					:height="tableHeight"
					:header-cell-style="{
						backgroundColor: '#f5f5f5',
						color: '#333',
					}"
				>
					<el-table-column prop="id" label="ID" width="80" />
					<el-table-column prop="name" label="姓名" width="100" />
					<el-table-column prop="title" label="职称" width="100" />
					<el-table-column prop="college" label="学院" width="180" />
					<el-table-column
						prop="expertise"
						label="专业领域"
						width="120"
					/>
					<el-table-column
						prop="email"
						label="邮箱"
						width="180"
						show-overflow-tooltip
					/>
					<el-table-column prop="phone" label="电话" width="120" />
					<el-table-column
						prop="action"
						label="操作"
						min-width="100"
						fixed="right"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="resetPassword(scope.row)"
								text
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</UserManageCard>
		<UserManageCard
			v-permission="'view_student_info'"
			title="学生信息管理"
			:visible="visibilityStates.student.value"
			@update:visible="
				(value) => (visibilityStates.student.value = value)
			"
		>
			<template #actions>
				<el-button type="primary" @click="exportStudent" plain
					>学生信息导入</el-button
				>
			</template>
			<template #table>
				<el-table
					:data="expertList"
					border
					stripe
					:height="tableHeight"
					:header-cell-style="{
						backgroundColor: '#f5f5f5',
						color: '#333',
					}"
				>
					<el-table-column prop="id" label="ID" width="80" />
					<el-table-column prop="name" label="姓名" width="100" />
					<el-table-column prop="title" label="职称" width="100" />
					<el-table-column prop="college" label="学院" width="180" />
					<el-table-column
						prop="expertise"
						label="专业领域"
						width="120"
					/>
					<el-table-column
						prop="email"
						label="邮箱"
						width="180"
						show-overflow-tooltip
					/>
					<el-table-column prop="phone" label="电话" width="120" />
					<el-table-column
						prop="action"
						label="操作"
						min-width="100"
						fixed="right"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="resetPassword(scope.row)"
								text
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</UserManageCard>

		<UserManageCard
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
						height: tableHeight,
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
</style>
