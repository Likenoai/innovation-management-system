// 推荐省赛项目

<script setup>
import { ref, computed } from 'vue';
import {
	ElTable,
	ElTableColumn,
	ElButton,
	ElSelect,
	ElOption,
} from 'element-plus';

// 示例项目数据
const projects = ref([
	{
		id: 1,
		项目名称: '项目A',
		负责人: '张三',
		答辩成绩: 85,
		盲审成绩: 90,
		是否立项: '是',
		推荐: false,
	},
	{
		id: 2,
		项目名称: '项目B',
		负责人: '李四',
		答辩成绩: 80,
		盲审成绩: 85,
		是否立项: '否',
		推荐: false,
	},
	// 可以添加更多的项目数据
]);

// 计算总成绩
const projectsWithTotalScore = computed(() => {
	return projects.value.map((project) => ({
		...project,
		总成绩: (project.答辩成绩 + project.盲审成绩) / 2,
	}));
});

// 推荐项目
const handleRecommend = (index) => {
	const project = projects.value[index];
	project.推荐 = true;
	console.log(`推荐项目: ${project.项目名称}`);
	// 在这里处理推荐逻辑
};
</script>

<template>
	<div class="provincial-recommendation-container">
		<h1 class="provincial-recommendation-title">推荐省赛项目</h1>
		<el-table :data="projectsWithTotalScore" style="width: 100%">
			<el-table-column prop="项目名称" label="项目名称" width="200" />
			<el-table-column prop="负责人" label="负责人" width="150" />
			<el-table-column prop="答辩成绩" label="答辩成绩" width="100" />
			<el-table-column prop="盲审成绩" label="盲审成绩" width="100" />
			<el-table-column prop="总成绩" label="总成绩" width="100" />
			<el-table-column prop="是否立项" label="是否立项" width="100" />
			<el-table-column label="操作" fixed="right" width="150">
				<template #default="scope">
					<el-button
						size="mini"
						type="primary"
						@click="handleRecommend(scope.$index)"
						:disabled="scope.row.推荐"
					>
						{{ scope.row.推荐 ? '已推荐' : '推荐' }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
.provincial-recommendation-container {
	padding: 20px;
}

.provincial-recommendation-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
}

.el-table {
	margin-top: 20px;
}
</style>
