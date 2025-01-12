<script setup>
import { ref } from 'vue';
import {
	ElTable,
	ElTableColumn,
	ElSelect,
	ElOption,
	ElButton,
} from 'element-plus';

// 示例项目数据
const projects = ref([
	{
		id: 1,
		项目名称: '项目A',
		负责人: '张三',
		级别: '校级',
		专家: '',
	},
	{
		id: 2,
		项目名称: '项目B',
		负责人: '李四',
		级别: '省级',
		专家: '',
	},
	// 可以添加更多的项目数据
]);

// 示例专家列表
const experts = ['专家1', '专家2', '专家3'];

// 分配专家
const handleAssignExpert = (index) => {
	const project = projects.value[index];
	console.log(`项目 ${project.项目名称} 分配给: ${project.专家}`);
	// 在这里处理分配逻辑
};
</script>

<template>
	<div class="assign-experts-container">
		<h1 class="assign-experts-title">分配专家</h1>
		<el-table :data="projects" style="width: 100%">
			<el-table-column prop="项目名称" label="项目名称" width="200" />
			<el-table-column prop="负责人" label="负责人" width="150" />
			<el-table-column prop="级别" label="级别" width="100" />
			<el-table-column label="分配专家" width="200">
				<template #default="scope">
					<el-select v-model="scope.row.专家" placeholder="选择专家">
						<el-option
							v-for="expert in experts"
							:key="expert"
							:label="expert"
							:value="expert"
						/>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" width="150">
				<template #default="scope">
					<el-button
						size="mini"
						type="primary"
						@click="handleAssignExpert(scope.$index)"
						>分配</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
.assign-experts-container {
	padding: 20px;
}

.assign-experts-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
}

.el-table {
	margin-top: 20px;
}
</style>
