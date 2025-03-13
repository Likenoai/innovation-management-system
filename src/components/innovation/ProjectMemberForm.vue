<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const addMember = () => {
	const newMembers = [...props.modelValue, { studentId: '', mainWork: '' }];
	emit('update:modelValue', newMembers);
};

const removeMember = (index) => {
	const newMembers = props.modelValue.filter((_, i) => i !== index);
	emit('update:modelValue', newMembers);
};
</script>

<template>
	<el-card>
		<h3>团队成员</h3>
		<el-table :data="props.modelValue" border>
			<el-table-column prop="studentId" label="学号">
				<template #default="{ row }">
					<el-input v-model="row.studentId" />
				</template>
			</el-table-column>
			<el-table-column prop="mainWork" label="主要工作">
				<template #default="{ row }">
					<el-input v-model="row.mainWork" />
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="{ $index }">
					<el-button
						type="danger"
						size="small"
						@click="removeMember($index)"
						>移除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="addMember" style="margin-top: 10px"
			>添加成员</el-button
		>
	</el-card>
</template>
