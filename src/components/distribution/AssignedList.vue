<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['assignments']);
const emit = defineEmits(['remove']);

// 取消分配
const removeAssignment = (index) => {
	emit('remove', index);
};
</script>

<template>
	<el-card>
		<h3>已分配专家 - 项目</h3>
		<el-table :data="props.assignments" border>
			<el-table-column prop="expert.name" label="专家姓名" />
			<el-table-column prop="expert.field" label="学科" />
			<el-table-column prop="project.name" label="项目名称" />
			<el-table-column label="操作">
				<template #default="{ $index }">
					<el-button
						type="danger"
						size="small"
						@click="removeAssignment($index)"
						>移除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>
