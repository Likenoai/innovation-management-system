<script setup>
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
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
});

function addExpert() {
	// 在这里添加处理逻辑，例如打开一个对话框或表单
	console.log('添加专家账号');
}

function resetPassword(expert) {
	// 在这里添加重置密码的逻辑
	console.log(`重置密码: ${expert.name}`);
}

function deleteExpert(expert) {
	// 在这里添加删除专家的逻辑
	console.log(`删除专家: ${expert.name}`);
}

import { ref, onMounted, onBeforeUnmount } from 'vue';

const tableHeight = ref('650px');

function updateTableHeight() {
	const windowHeight = window.innerHeight;
	tableHeight.value = `${windowHeight - 264}px`; // 264 是其他元素的高度
}

onMounted(() => {
	updateTableHeight();
	window.addEventListener('resize', updateTableHeight);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateTableHeight);
});
import UserManageCard from '@/components/UserManageCard.vue';
const visibilityStates = {
	expert: ref(true),
	collegeAdmin: ref(true),
	teacher: ref(true),
	student: ref(true),
};
const expertCardVisible = ref(true);
function toggleVisibility(type) {
	if (visibilityStates[type] !== undefined) {
		visibilityStates[type].value = !visibilityStates[type].value;
		// expertCardVisible.value = true;
		// console.log('expertCardVisible:', expertCardVisible.value);
	}
}

const buttonTypes = [
	{ label: '专家', type: 'expert' },
	{ label: '学院管理员', type: 'collegeAdmin' },
	{ label: '教师', type: 'teacher' },
	{ label: '学生', type: 'student' },
];
</script>

<template>
	<div class="users-manage-container">
		<UserManageCard
			title="专家账号管理"
			:visible="visibilityStates.expert"
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
								type="text"
								size="small"
								@click="resetPassword(scope.row)"
							>
								重置密码
							</el-button>
							<el-button
								type="text"
								size="small"
								@click="deleteExpert(scope.row)"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</UserManageCard>
		<UserManageCard
			title="学院管理员账号管理"
			:visible="visibilityStates.collegeAdmin"
			@update:visible="
				(value) => (visibilityStates.collegeAdmin.value = value)
			"
		>
			<template #actions>
				<el-button type="primary" @click="addExpert" v-if="false"
					>添加学院管理员</el-button
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
								type="text"
								size="small"
								@click="resetPassword(scope.row)"
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</UserManageCard>
		<UserManageCard
			title="教师账号管理"
			:visible="visibilityStates.teacher"
			@update:visible="
				(value) => (visibilityStates.teacher.value = value)
			"
		>
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
								type="text"
								size="small"
								@click="resetPassword(scope.row)"
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</UserManageCard>
		<UserManageCard
			title="学生账号管理"
			:visible="visibilityStates.student"
			@update:visible="
				(value) => (visibilityStates.student.value = value)
			"
		>
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
								type="text"
								size="small"
								@click="resetPassword(scope.row)"
							>
								重置密码
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</UserManageCard>

		<UserManageCard title="当前用户密码管理">
			<template #table>
				<el-form
					:model="form"
					label-width="120px"
					:style="{
						height: tableHeight,
					}"
					class="user-content"
				>
					<el-form-item label="当前密码">
						<el-input
							v-model="form.currentPassword"
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
				v-for="button in buttonTypes"
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
	justify-content: start;
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
