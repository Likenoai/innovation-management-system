<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const addAdvisor = () => {
	const newAdvisors = [
		...props.modelValue,
		{
			name: '',
			personnelCode: '',
			college: '',
			position: '',
			researchTopic: '',
			supportStatus: '',
			suggestion: '',
		},
	];
	emit('update:modelValue', newAdvisors);
};

const removeAdvisor = (index) => {
	const newAdvisors = props.modelValue.filter((_, i) => i !== index);
	emit('update:modelValue', newAdvisors);
};
</script>

<template>
	<el-card>
		<h3>指导教师</h3>
		<el-table :data="props.modelValue" border>
			<el-table-column prop="name" label="姓名" width="120">
				<template #default="{ row }">
					<el-input v-model="row.name" />
				</template>
			</el-table-column>
			<el-table-column prop="personnelCode" label="工号" width="120">
				<template #default="{ row }">
					<el-input v-model="row.personnelCode" />
				</template>
			</el-table-column>
			<el-table-column prop="college" label="学院" width="150">
				<template #default="{ row }">
					<el-input v-model="row.college" />
				</template>
			</el-table-column>
			<el-table-column prop="position" label="职称" width="120">
				<template #default="{ row }">
					<el-input v-model="row.position" />
				</template>
			</el-table-column>
			<el-table-column
				prop="researchTopic"
				label="研究课题"
				min-width="200"
			>
				<template #default="{ row }">
					<el-input v-model="row.researchTopic" />
				</template>
			</el-table-column>
			<el-table-column
				prop="supportStatus"
				label="配套支持情况"
				width="180"
			>
				<template #default="{ row }">
					<el-input v-model="row.supportStatus" />
				</template>
			</el-table-column>
			<el-table-column prop="suggestion" label="建议" min-width="300">
				<template #default="{ row }">
					<el-input v-model="row.suggestion" type="textarea" />
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right">
				<template #default="{ $index }">
					<el-button
						type="danger"
						size="small"
						@click="removeAdvisor($index)"
						>移除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="addAdvisor" style="margin-top: 10px"
			>添加指导教师</el-button
		>
	</el-card>
</template>
