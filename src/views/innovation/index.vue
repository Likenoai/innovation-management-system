<script setup>
import { ref } from 'vue';
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue';

const tableData = ref([
	{
		id: 1,
		name: '智能家居控制系统',
		leader: '张三',
		type: '技术创新',
		startDate: '2023-05-01',
		status: '进行中',
	},
	{
		id: 2,
		name: '校园二手交易平台',
		leader: '李四',
		type: '创业项目',
		startDate: '2023-06-15',
		status: '已结题',
	},
]);

const searchQuery = ref('');

const handleAdd = () => {
	// 添加项目逻辑
};

const handleEdit = (row) => {
	// 编辑项目逻辑
};

const handleDelete = (row) => {
	// 删除项目逻辑
};
</script>

<template>
	<div class="innovation-container">
		<div class="header">
			<h2>创新项目管理</h2>
			<div class="operations">
				<el-input
					v-model="searchQuery"
					placeholder="搜索项目"
					class="search-input"
				>
					<template #prefix>
						<el-icon><Search /></el-icon>
					</template>
				</el-input>
				<el-button
					v-permission="'manage_all_projects'"
					type="primary"
					@click="handleAdd"
				>
					<el-icon><Plus /></el-icon>添加项目
				</el-button>
			</div>
		</div>

		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="id" label="ID" width="80" />
			<el-table-column prop="name" label="项目名称" />
			<el-table-column prop="leader" label="负责人" width="120" />
			<el-table-column prop="type" label="项目类型" width="120" />
			<el-table-column prop="startDate" label="开始日期" width="120" />
			<el-table-column prop="status" label="状态" width="100">
				<template #default="{ row }">
					<el-tag
						:type="row.status === '进行中' ? 'success' : 'info'"
					>
						{{ row.status }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template #default="{ row }">
					<el-button
						v-permission="'manage_all_projects'"
						type="primary"
						size="small"
						@click="handleEdit(row)"
					>
						<el-icon><Edit /></el-icon>编辑
					</el-button>
					<el-button
						v-permission="'manage_all_projects'"
						type="danger"
						size="small"
						@click="handleDelete(row)"
					>
						<el-icon><Delete /></el-icon>删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
.innovation-container {
	padding: 20px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.operations {
	display: flex;
	gap: 10px;
}

.search-input {
	width: 300px;
}

h2 {
	margin: 0;
	color: #303133;
}
</style>
