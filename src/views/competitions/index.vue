<script setup>
import { ref } from 'vue';
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue';

const tableData = ref([
	{
		id: 1,
		name: '2023年全国大学生创新创业大赛',
		type: '创新创业类',
		startDate: '2023-01-01',
		endDate: '2023-12-31',
		status: '进行中',
	},
	{
		id: 2,
		name: '互联网+大学生创新创业大赛',
		type: '科技创新类',
		startDate: '2023-03-01',
		endDate: '2023-09-30',
		status: '已结束',
	},
]);

const searchQuery = ref('');

const handleAdd = () => {
	// 添加竞赛逻辑
};

const handleEdit = (row) => {
	// 编辑竞赛逻辑
};

const handleDelete = (row) => {
	// 删除竞赛逻辑
};
</script>

<template>
	<div class="competitions-container">
		<div class="header">
			<h2>竞赛管理</h2>
			<div class="operations">
				<el-input
					v-model="searchQuery"
					placeholder="搜索竞赛"
					class="search-input"
				>
					<template #prefix>
						<el-icon><Search /></el-icon>
					</template>
				</el-input>
				<el-button type="primary" @click="handleAdd">
					<el-icon><Plus /></el-icon>添加竞赛
				</el-button>
			</div>
		</div>

		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="id" label="ID" width="80" />
			<el-table-column prop="name" label="竞赛名称" />
			<el-table-column prop="type" label="竞赛类型" width="120" />
			<el-table-column prop="startDate" label="开始日期" width="120" />
			<el-table-column prop="endDate" label="结束日期" width="120" />
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
						type="primary"
						size="small"
						@click="handleEdit(row)"
					>
						<el-icon><Edit /></el-icon>编辑
					</el-button>
					<el-button
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
.competitions-container {
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
