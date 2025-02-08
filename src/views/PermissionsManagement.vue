<template>
	<el-card>
		<div class="permissions-management">
			<div class="header">
				<h2>权限管理</h2>
				<el-button type="primary" @click="showAddPermissionDialog"
					>添加权限</el-button
				>
			</div>
			<el-table :data="permissions" style="width: 100%">
				<el-table-column prop="name" label="权限名称" />
				<el-table-column prop="description" label="权限描述" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button
							@click="showEditPermissionDialog(scope.row)"
							type="text"
							size="small"
							>编辑</el-button
						>
						<el-button
							@click="deletePermission(scope.row.id)"
							type="text"
							size="small"
							style="color: red"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>

			<el-dialog
				title="添加权限"
				:visible.sync="addPermissionDialogVisible"
			>
				<el-form :model="newPermission">
					<el-form-item
						label="权限名称"
						:rules="[{ required: true, message: '请输入权限名称' }]"
					>
						<el-input v-model="newPermission.name" />
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

			<el-dialog
				title="编辑权限"
				:visible.sync="editPermissionDialogVisible"
			>
				<el-form :model="editPermission">
					<el-form-item
						label="权限名称"
						:rules="[{ required: true, message: '请输入权限名称' }]"
					>
						<el-input v-model="editPermission.name" />
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
	</el-card>
</template>

<script setup>
import { ref } from 'vue';

const permissions = ref([
	{ id: 1, name: '查看用户', description: '允许查看用户信息' },
	{ id: 2, name: '编辑用户', description: '允许编辑用户信息' },
]);

const addPermissionDialogVisible = ref(false);
const editPermissionDialogVisible = ref(false);
const newPermission = ref({ name: '', description: '' });
const editPermission = ref({ id: null, name: '', description: '' });

const showAddPermissionDialog = () => {
	newPermission.value = { name: '', description: '' };
	addPermissionDialogVisible.value = true;
};

const addPermission = () => {
	const newId = permissions.value.length + 1;
	permissions.value.push({ id: newId, ...newPermission.value });
	addPermissionDialogVisible.value = false;
};

const showEditPermissionDialog = (permission) => {
	editPermission.value = { ...permission };
	editPermissionDialogVisible.value = true;
};

const updatePermission = () => {
	const index = permissions.value.findIndex(
		(p) => p.id === editPermission.value.id
	);
	if (index !== -1) {
		permissions.value[index] = { ...editPermission.value };
	}
	editPermissionDialogVisible.value = false;
};

const deletePermission = (id) => {
	permissions.value = permissions.value.filter((p) => p.id !== id);
};
</script>

<style scoped>
.permissions-management {
	padding: 20px;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
</style>
