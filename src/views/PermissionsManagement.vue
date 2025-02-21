<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
	getAllPermissionsApi,
	addPermissionApi,
	deletePowerApi,
	addPowerApi,
	getRoleApi,
} from '@/api/permissionApi.js';
import { getAllRoleApi, addRoleApi } from '@/api/roleApi.js';
import { handleTableHeight } from '../utils';
import { useMyLoginStore } from '../stores/myLoginStore';
const permissionsData = ref([]);
console.clear();

// 基本信息获取S
const getAllPermissions = async () => {
	// 获取所有权限并更新权限数据
	let res = await getAllPermissionsApi();
	permissionsData.value = res.data;
};

let currentRole = ref({
	roleId: null,
	permissionsData: [],
});
let myloginStore = useMyLoginStore();
currentRole.value.roleId = myloginStore.role;
const roles = ref([]);

const getAllRole = async () => {
	// 获取所有角色并更新角色数据
	let res = await getAllRoleApi();
	roles.value = res.data;
};

const getRole = async () => {
	// 根据当前角色 ID 获取角色权限数据
	let res = await getRoleApi(currentRole.value.roleId);
	console.log('res:', res);
	currentRole.value.permissionsData = res.data;
	return res;
};

onMounted(async () => {
	getAllPermissions();
	getAllRole();
	getRole();
});
// 基本信息获取E

const addPermissionDialogVisible = ref(false);
const editPermissionDialogVisible = ref(false);
const newPermission = ref({ permissionCode: '', description: '' });
const editPermission = ref({ id: null, name: '', description: '' });

const showAddPermissionDialog = () => {
	// 展示新权限添加页面
	newPermission.value = { permissionCode: '', description: '' };
	addPermissionDialogVisible.value = true;
};

const addPermission = async () => {
	// 添加新权限并刷新权限列表
	await addPermissionApi(newPermission.value).then((item) => {
		console.log(item);
		getAllPermissions();
	});
	addPermissionDialogVisible.value = false;
};
const showEditPermissionDialog = (permission) => {
	editPermission.value = { ...permission };
	editPermissionDialogVisible.value = true;
};
const addPower = async (permissionId) => {
	// 为角色添加权限并刷新权限列表
	let res = await addPowerApi({
		roleId: currentRole.value.roleId,
		permissionId,
	}).then(async (item) => {
		await getRole();
		return item;
	});
	console.log();
	console.log('res:', res);
};
const deletePower = async (permissionId) => {
	// 为角色删除权限并刷新权限列表
	let res = await deletePowerApi({
		roleId: currentRole.value.roleId,
		permissionId,
	}).then((item) => {
		console.log(item);
		getRole();
	});
};
const updatePermission = async () => {
	// 更新权限信息
	editPermissionDialogVisible.value = false;
};

const changeCurrentRoleId = (roleId: string) => {
	// 更改当前角色 ID
	console.log(roleId);
	currentRole.value.roleId = roleId;
	getRole();
};

const rowClassName = (row: any) => {
	// 根据当前角色的权限数据判断是否高亮显示行
	let result = currentRole.value.permissionsData.some((permission) => {
		return permission.permissionId == row.row.permissionId;
	})
		? 'highlight-row'
		: '';
	console.log('result:', result);
	return result;
};
</script>

<template>
	<div class="permissions-management-container">
		<div class="header">
			<h2>权限管理</h2>
			<el-button type="primary" @click="showAddPermissionDialog"
				>添加权限</el-button
			>
		</div>

		<!-- 角色显示区域 -->
		<div class="roles-display">
			<el-button
				v-for="role in roles"
				:key="role.roleId"
				color="#626aef"
				class="role-btn"
				:plain="role.roleId !== currentRole.roleId"
				@click="changeCurrentRoleId(role.roleId)"
			>
				{{ role.description }}
			</el-button>
		</div>

		<el-table
			:data="permissionsData"
			style="width: 100%"
			:height="handleTableHeight(200)"
			:row-class-name="rowClassName"
		>
			<el-table-column prop="permissionCode" label="权限代码" />
			<el-table-column prop="description" label="权限描述" />
			<el-table-column label="创建时间" prop="createTime" />
			<el-table-column label="更新时间" prop="updateTime" />
			<el-table-column label="操作">
				<template #default="scope">
					<el-button
						@click="showEditPermissionDialog(scope.row)"
						type="text"
						size="small"
						>编辑</el-button
					>
					<el-button
						@click="addPower(scope.row.permissionId)"
						type="text"
						size="small"
						style="color: blue"
						>添加</el-button
					>
					<el-button
						@click="deletePower(scope.row.permissionId)"
						type="text"
						size="small"
						style="color: #3d3e83"
						>取消</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="添加权限" v-model="addPermissionDialogVisible">
			<el-form :model="newPermission">
				<el-form-item
					label="权限名称"
					:rules="[{ required: true, message: '请输入权限名称' }]"
				>
					<el-input v-model="newPermission.permissionCode" />
				</el-form-item>
				<el-form-item label="权限描述">
					<el-input v-model="newPermission.description" />
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addPermissionDialogVisible = false"
					>取 消</el-button
				>
				<el-button type="primary" @click="addPermission"
					>确 定</el-button
				>
			</span>
		</el-dialog>

		<el-dialog title="编辑权限" v-model="editPermissionDialogVisible">
			<el-form :model="editPermission">
				<el-form-item
					label="权限名称"
					:rules="[{ required: true, message: '请输入权限名称' }]"
					class="input-link"
				>
					<el-input v-model="editPermission.permissionCode" />
				</el-form-item>
				<el-form-item label="权限描述">
					<el-input v-model="editPermission.description" />
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editPermissionDialogVisible = false"
					>取 消</el-button
				>
				<el-button type="primary" @click="updatePermission"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<style scoped>
.permissions-management-container {
	height: 100%;
	width: 100%;
	padding: 20px;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
.roles-display {
	margin-bottom: 20px;
}
.role-btn {
	margin-right: 10px;
}
::v-deep .highlight-row {
	background-color: #d1e7dd; /* 设置高亮背景颜色为柔和的绿色 */
}
</style>
