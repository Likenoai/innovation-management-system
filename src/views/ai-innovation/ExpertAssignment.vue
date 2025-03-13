<script setup>
import { ref, onMounted } from 'vue';
import {
	generateExpertData,
	generateProjectData,
} from '@/utils/mock/exoertsAssignMock.js';
import UnassignedList from '@/components/distribution/UnassignedList.vue';
import AssignedList from '@/components/distribution/AssignedList.vue';
const experts = ref([]);
const projects = ref([]);
const assignments = ref([]);

// 模拟数据加载
const fetchData = async () => {
	experts.value = generateExpertData(10);
	console.log('experts:', experts.value);
	projects.value = generateProjectData();
	console.log('projects.value:', projects.value);
};

// 分配专家到项目
const assignExpert = ({ expert, project }) => {
	if (!expert || !project) return;
	assignments.value.push({ expert, project });
};

// 取消分配
const removeAssignment = (index) => {
	assignments.value.splice(index, 1);
};

// 提交模拟数据
const submitAssignments = async () => {
	console.log('提交的分配数据:', assignments.value);
};

onMounted(fetchData);
</script>

<template>
	<el-card>
		<h2>专家 - 项目分配</h2>
		<UnassignedList
			:experts="experts"
			:projects="projects"
			@assign="assignExpert"
		/>
		<AssignedList :assignments="assignments" @remove="removeAssignment" />
		<el-button
			type="primary"
			@click="submitAssignments"
			style="margin-top: 20px"
			>提交分配</el-button
		>
	</el-card>
</template>

<style scoped>
.el-card {
	max-width: 1200px;
	margin: 20px auto;
	padding: 20px;
}
</style>
