<script setup>
import { ref } from 'vue';
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue';

const tableData = ref([
	{
		id: 1,
		name: '智能垃圾分类系统',
		category: '环保科技',
		author: '王小明',
		createTime: '2023-01-15',
		downloads: 156,
		status: '已发布',
	},
	{
		id: 2,
		name: '校园快递代取平台',
		category: '生活服务',
		author: '李小红',
		createTime: '2023-03-22',
		downloads: 89,
		status: '已发布',
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
	<div class="project-library-container">
		<div class="header">
			<h2>项目库管理</h2>
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
				<el-button type="primary" @click="handleAdd">
					<el-icon><Plus /></el-icon>添加项目
				</el-button>
			</div>
		</div>

		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="id" label="ID" width="80" />
			<el-table-column prop="name" label="项目名称" />
			<el-table-column prop="category" label="项目分类" width="120" />
			<el-table-column prop="author" label="作者" width="120" />
			<el-table-column prop="createTime" label="创建时间" width="120" />
			<el-table-column prop="downloads" label="下载次数" width="100" />
			<el-table-column prop="status" label="状态" width="100">
				<template #default="{ row }">
					<el-tag
						:type="row.status === '已发布' ? 'success' : 'info'"
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
.project-library-container {
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
