<script setup>
/*
 * @pageInfo: 校级专家项目分配
 */
import { ref, computed } from 'vue';
import {
	ElTable,
	ElTableColumn,
	ElSelect,
	ElOption,
	ElButton,
} from 'element-plus';
import {
	projects as mockProjects,
	experts as mockExperts,
} from '@/utils/mock/exoertsAssignMock.js'; // 引入模拟数据

// 项目 & 专家数据
const projects = ref(mockProjects);
const experts = ref(mockExperts);

// 筛选条件
const selectedType = ref('');
const selectedCategory = ref('');

// 选中的项目
const selectedProjects = ref([]);

// **计算筛选后的项目**
const filteredProjects = computed(() =>
	projects.value.filter(
		(project) =>
			(!selectedType.value || project.type === selectedType.value) &&
			(!selectedCategory.value ||
				project.category === selectedCategory.value)
	)
);

// **计算筛选后的专家**
const filteredExperts = computed(() =>
	experts.value.filter(
		(expert) =>
			(!selectedType.value || expert.type === selectedType.value) &&
			(!selectedCategory.value ||
				expert.category === selectedCategory.value)
	)
);

// **已分配项目**
const assignedProjects = ref([]);

// **随机分配专家**
const handleAssignExpert = (project) => {
	const numExperts = 3; // 每个项目分配 3 个专家
	const shuffledExperts = [...filteredExperts.value].sort(
		() => 0.5 - Math.random()
	); // 洗牌

	const assignedExperts = shuffledExperts
		.slice(0, numExperts)
		.map((e) => e.name);

	// 更新已分配列表
	const existingProject = assignedProjects.value.find(
		(p) => p.id === project.id
	);
	if (existingProject) {
		existingProject.expert = assignedExperts;
	} else {
		assignedProjects.value.push({ ...project, expert: assignedExperts });
	}

	// 更新原始项目数据中的专家信息
	const targetProject = projects.value.find((p) => p.id === project.id);
	if (targetProject) targetProject.expert = assignedExperts;
};

// **全选功能**
const toggleAll = (value) => {
	selectedProjects.value = value
		? filteredProjects.value.map((p) => p.id)
		: [];
};

import { useDynamicHeight } from '@/utils/index.js';
// **计算动态表格高度**
const maxHeight = useDynamicHeight(300);

// **分配所有项目的专家**
const assignAllExperts = () => {
	filteredProjects.value.forEach(handleAssignExpert);
};

// **更新已分配专家**
const updateAssignedExpert = (project, experts) => {
	const assignedProject = assignedProjects.value.find(
		(p) => p.id === project.id
	);
	if (assignedProject) assignedProject.expert = experts;
};

// **移除专家分配**
const removeAssignedExpert = (project) => {
	assignedProjects.value = assignedProjects.value.filter(
		(p) => p.id !== project.id
	);
	const targetProject = projects.value.find((p) => p.id === project.id);
	if (targetProject) targetProject.expert = [];
};
</script>

<template>
	<div class="assign-experts-container">
		<h1 class="assign-experts-title">专家分配</h1>

		<!-- 筛选条件 -->
		<div class="filter-container">
			<el-select
				v-model="selectedType"
				placeholder="选择项目类型"
				style="width: 200px"
				clearable
			>
				<el-option label="创新" value="创新" />
				<el-option label="创业" value="创业" />
			</el-select>
			<el-select
				v-model="selectedCategory"
				placeholder="选择项目类别"
				style="width: 200px"
				clearable
			>
				<el-option label="科技" value="科技" />
				<el-option label="人文" value="人文" />
			</el-select>
		</div>

		<!-- 批量分配 -->
		<el-button
			@click="assignAllExperts"
			type="primary"
			style="margin-bottom: 10px"
			>随机分配全部</el-button
		>

		<div class="tables-container">
			<!-- 未分配项目表格 -->
			<el-table
				:data="filteredProjects"
				:height="maxHeight"
				style="width: 58%"
			>
				<el-table-column
					prop="projectName"
					label="项目名称"
					width="200"
				/>
				<el-table-column prop="leader" label="负责人" width="120" />
				<el-table-column prop="level" label="级别" width="100" />
				<el-table-column label="分配专家" width="300">
					<template #default="{ row }">
						<el-select
							v-model="row.expert"
							placeholder="选择专家"
							multiple
							@change="updateAssignedExpert(row, $event)"
						>
							<el-option
								v-for="expert in filteredExperts"
								:key="expert.name"
								:label="expert.name"
								:value="expert.name"
							/>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template #default="{ row }">
						<el-button
							type="primary"
							@click="handleAssignExpert(row)"
							>分配</el-button
						>
					</template>
				</el-table-column>
			</el-table>

			<!-- 已分配项目表格 -->
			<el-table
				:data="assignedProjects"
				:height="maxHeight"
				style="width: 38%; margin-left: 20px"
			>
				<el-table-column
					prop="projectName"
					label="项目名称"
					width="200"
				/>
				<el-table-column label="分配专家" width="200">
					<template #default="{ row }">
						<span>{{ row.expert.join(', ') }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="leader" label="负责人" width="150" />
				<el-table-column prop="level" label="级别" width="100" />
				<el-table-column label="操作" width="150">
					<template #default="{ row }">
						<el-button
							type="danger"
							@click="removeAssignedExpert(row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
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

.filter-container {
	display: flex;
	gap: 10px;
	margin-bottom: 20px;
}

.tables-container {
	display: flex;
	justify-content: space-between;
}
</style>
