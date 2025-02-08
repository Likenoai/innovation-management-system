<script setup>
import { ref, computed } from 'vue';
import {
	ElTable,
	ElTableColumn,
	ElSelect,
	ElOption,
	ElButton,
	ElInput,
	ElCheckbox,
	ElCheckboxGroup,
} from 'element-plus';
import {
	projects as mockProjects,
	experts as mockExperts,
} from '@/utils/mockData'; // 引入模拟数据

// 使用生成的模拟数据
const projects = ref(mockProjects);
const experts = ref(mockExperts);

// 筛选条件
const selectedType = ref('');
const selectedCategory = ref('');

// 选中的项目
const selectedProjects = ref([]);
// 计算筛选后的项目
const filteredProjects = computed(() => {
	// 使用 projects.value 进行过滤，返回符合筛选条件的项目
	return projects.value.filter((project) => {
		// 检查项目类型和类别是否符合筛选条件
		return (
			// 如果没有选择类型，或者项目类型与所选类型匹配
			(!selectedType.value || project.type === selectedType.value) &&
			// 如果没有选择类别，或者项目类别与所选类别匹配
			(!selectedCategory.value ||
				project.category === selectedCategory.value)
		);
	});
});

// 计算筛选后的专家
const filteredExperts = computed(() => {
	return experts.value.filter((expert) => {
		return (
			(!selectedType.value || expert.type === selectedType.value) &&
			(!selectedCategory.value ||
				expert.category === selectedCategory.value)
		);
	});
});

// 已分配项目
const assignedProjects = ref([]);

// 随机分配专家
const handleAssignExpert = (project) => {
	const numberOfExpertsToAssign = 3; // 设置要分配的专家数量
	const assignedExperts = [];

	// 洗牌函数
	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]; // 交换元素
		}
		return array;
	};

	// 洗牌并选择专家
	const shuffledExperts = shuffleArray([...filteredExperts.value]);
	console.log(shuffledExperts);
	console.log(shuffledExperts[0], shuffledExperts[1], shuffledExperts[2]);
	for (
		let i = 0;
		i < Math.min(numberOfExpertsToAssign, shuffledExperts.length);
		i++
	) {
		assignedExperts.push(shuffledExperts[i].name); // 直接添加洗牌后的专家
	}

	if (assignedExperts.length > 0) {
		// 更新项目的专家信息，确保只保留最后一次分配结果
		const existingProjectIndex = assignedProjects.value.findIndex(
			(p) => p.id === project.id
		);
		if (existingProjectIndex !== -1) {
			// 更新已分配项目中的专家
			assignedProjects.value[existingProjectIndex].expert =
				assignedExperts; // 修改为多个专家
			// 更新模拟数据中的专家信息
			const mockProjectIndex = projects.value.findIndex(
				(p) => p.id === project.id
			);
			if (mockProjectIndex !== -1) {
				projects.value[mockProjectIndex].expert = assignedExperts; // 修改为多个专家
			}
			// 触发响应式更新
			assignedProjects.value = [...assignedProjects.value]; // 重新赋值以触发更新
		} else {
			// 如果项目未在已分配项目中，添加新项目
			project.expert = assignedExperts; // 修改为多个专家
			assignedProjects.value.push({ ...project });
			// 更新模拟数据中的专家信息
			const mockProjectIndex = projects.value.findIndex(
				(p) => p.id === project.id
			);
			if (mockProjectIndex !== -1) {
				projects.value[mockProjectIndex].expert = assignedExperts; // 修改为多个专家
			}
		}
		console.log(
			`项目 ${project.projectName} 分配给: ${assignedExperts.join(', ')}`
		); // 输出所有分配的专家
	}
};

// 全选功能
const toggleAll = (value) => {
	if (value) {
		selectedProjects.value = filteredProjects.value.map(
			(project) => project.id
		);
	} else {
		selectedProjects.value = [];
	}
};

// 根据屏幕分辨率设定最大高度
const maxHeight = computed(() => {
	const height = window.innerHeight;
	// if (height < 600) {
	// 	return '300px';
	// } else if (height < 800) {
	// 	return '500px';
	// } else {
	// 	return '700px';
	// }
	console.log(height - 200 + 'px');
	return height - 300 + 'px';
});

// 分配全部专家的功能
const assignAllExperts = () => {
	filteredProjects.value.forEach((project) => {
		handleAssignExpert(project);
	});
};
function log() {
	console.log(filteredProjects.value[0].expert);
}
function clicklog(value) {
	console.log(value);
}

// 添加更新专家的函数
const updateAssignedExpert = (project, experts) => {
	const existingProjectIndex = assignedProjects.value.findIndex(
		(p) => p.id === project.id
	);
	if (existingProjectIndex !== -1) {
		assignedProjects.value[existingProjectIndex].expert = experts; // 更新对应项目的专家
	}
};

// 添加删除分配专家的函数
const removeAssignedExpert = (project) => {
	const existingProjectIndex = assignedProjects.value.findIndex(
		(p) => p.id === project.id
	);
	if (existingProjectIndex !== -1) {
		// 清空该项目的专家分配
		assignedProjects.value[existingProjectIndex].expert = []; // 删除分配的专家
		assignedProjects.value.splice(existingProjectIndex, 1);
		const mockProjectIndex = projects.value.findIndex(
			(p) => p.id === project.id
		);
		if (mockProjectIndex !== -1) {
			projects.value[mockProjectIndex].expert = []; // 修改为多个专家
		}
		// 触发响应式更新
		assignedProjects.value = [...assignedProjects.value]; // 重新赋值以触发更新
		console.log(`项目 ${project.projectName} 的分配专家已被删除`);
	}
};
</script>

<template>
	<div class="assign-experts-container">
		<h1 class="assign-experts-title">分配专家</h1>

		<!-- 筛选条件 -->
		<div class="filter-container">
			<el-select
				v-model="selectedType"
				placeholder="选择项目类型"
				style="margin-right: 10px; width: 200px"
				clearable
			>
				<el-option label="创新" value="创新" />
				<el-option label="创业" value="创业" />
			</el-select>
			<el-select
				v-model="selectedCategory"
				placeholder="选择项目类别"
				style="margin-right: 10px; width: 200px"
				clearable
			>
				<el-option label="科技" value="科技" />
				<el-option label="人文" value="人文" />
			</el-select>
		</div>

		<!-- 分配全部按钮 -->
		<el-button
			@click="assignAllExperts"
			type="primary"
			style="margin-bottom: 10px"
			>随机分配全部</el-button
		>
		<!-- 项目表格和已分配项目表格并列显示 -->
		<div class="tables-container">
			<!-- 项目表格 -->
			<el-table
				:data="filteredProjects"
				:style="{ width: '58%', height: maxHeight }"
				max-height="800"
			>
				<!-- <el-table-column
					type="selection"
					width="55"
					:selectable="(row) => true"
				/> -->
				<el-table-column
					prop="projectName"
					label="项目名称"
					width="200"
				/>
				<el-table-column prop="leader" label="负责人" width="120" />
				<el-table-column prop="level" label="级别" width="100" />
				<el-table-column label="分配专家" width="300">
					<template #default="scope">
						<el-select
							v-model="scope.row.expert"
							placeholder="选择专家"
							multiple
							@change="
								(value) =>
									updateAssignedExpert(scope.row, value)
							"
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
				<el-table-column label="操作" fixed="right" width="150">
					<template #default="scope">
						<el-button
							type="primary"
							@click="handleAssignExpert(scope.row)"
							>分配</el-button
						>
					</template>
				</el-table-column>
			</el-table>

			<!-- 已分配项目表格 -->
			<el-table
				:data="assignedProjects"
				:style="{ width: '38%', height: maxHeight, marginLeft: '20px' }"
				max-height="800"
			>
				<el-table-column
					prop="projectName"
					label="项目名称"
					width="200"
				/>
				<el-table-column label="分配专家" width="200">
					<template #default="scope">
						<span>{{ scope.row.expert.join(', ') }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="leader" label="负责人" width="150" />
				<el-table-column prop="level" label="级别" width="100" />
				<el-table-column label="操作" width="150" fixed="right">
					<template #default="scope">
						<el-button
							type="danger"
							@click="removeAssignedExpert(scope.row)"
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
	margin-bottom: 20px;
	display: flex;
	flex-wrap: wrap;
}

.el-table {
	margin-top: 20px;
}

.tables-container {
	display: flex;
	justify-content: space-between; /* 使表格之间有间距 */
}
</style>
