<script setup>
import { ref } from 'vue';
import {
	ElTable,
	ElTableColumn,
	ElInputNumber,
	ElInput,
	ElButton,
} from 'element-plus';

// 示例项目数据
const projects = ref([
	{
		id: 1,
		项目名称: '项目A',
		负责人: '张三',
		级别: '校级',
		分数: 0,
		评论: '',
	},
	{
		id: 2,
		项目名称: '项目B',
		负责人: '李四',
		级别: '省级',
		分数: 0,
		评论: '',
	},
	// 可以添加更多的项目数据
]);

// 提交评分和评论
const handleSubmitReview = (index) => {
	const project = projects.value[index];
	console.log(
		`项目 ${project.项目名称} 的评分: ${project.分数}, 评论: ${project.评论}`
	);
	// 在这里处理提交逻辑
};
</script>

<template>
	<div class="expert-review-container">
		<h1 class="expert-review-title">专家盲审项目</h1>
		<el-table :data="projects" style="width: 100%">
			<el-table-column prop="项目名称" label="项目名称" width="200" />
			<el-table-column prop="负责人" label="负责人" width="150" />
			<el-table-column prop="级别" label="级别" width="100" />
			<el-table-column label="评分" width="150">
				<template #default="scope">
					<el-input-number
						v-model="scope.row.分数"
						:min="0"
						:max="100"
					/>
				</template>
			</el-table-column>
			<el-table-column label="评论" width="300">
				<template #default="scope">
					<el-input
						type="textarea"
						v-model="scope.row.评论"
						placeholder="填写评论"
					/>
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" width="150">
				<template #default="scope">
					<el-button
						size="mini"
						type="primary"
						@click="handleSubmitReview(scope.$index)"
						>提交</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
.expert-review-container {
	padding: 20px;
}

.expert-review-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
}

.el-table {
	margin-top: 20px;
}
</style>
