<script setup>
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElInputNumber, ElButton } from 'element-plus';

// 示例项目数据
const projects = ref([
	{
		id: 1,
		项目名称: '项目A',
		负责人: '张三',
		级别: '校级',
		分数: 0,
	},
	{
		id: 2,
		项目名称: '项目B',
		负责人: '李四',
		级别: '省级',
		分数: 0,
	},
	// 可以添加更多的项目数据
]);

// 打分处理
const handleScoreChange = (value, index) => {
	projects.value[index].分数 = value;
	console.log(
		`项目 ${projects.value[index].项目名称} 的分数更新为: ${value}`
	);
};

// 推荐处理
const handleRecommend = (index) => {
	const project = projects.value[index];
	console.log(`推荐项目: ${project.项目名称}`);
	// 在这里处理推荐逻辑
};
</script>

<template>
	<div class="college-review-container">
		<h1 class="college-review-title">学院评审推荐</h1>
		<el-table :data="projects" style="width: 100%">
			<el-table-column prop="项目名称" label="项目名称" width="200" />
			<el-table-column prop="负责人" label="负责人" width="150" />
			<el-table-column prop="级别" label="级别" width="100" />
			<el-table-column label="打分" width="150">
				<template #default="scope">
					<el-input-number
						v-model="scope.row.分数"
						:min="0"
						:max="100"
						@change="
							(value) => handleScoreChange(value, scope.$index)
						"
					/>
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" width="150">
				<template #default="scope">
					<el-button
						size="mini"
						type="primary"
						@click="handleRecommend(scope.$index)"
						>推荐</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
.college-review-container {
	padding: 20px;
}

.college-review-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
}

.el-table {
	margin-top: 20px;
}
</style>
