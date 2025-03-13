<script setup>
import { computed, watch, defineProps, defineEmits } from 'vue';

// **接收父组件传递的评分数据**
const props = defineProps({
	criteria: Array, // 评分项 [{ name: '文本规范', options: [2,4,5], selected: null }]
	baseScore: Number, // 基础分值
});

// 定义事件，通知父组件
const emit = defineEmits(['update:criteria', 'update:totalScore']);

// **计算总分**
const totalScore = computed(() => {
	return (
		props.baseScore +
		props.criteria.reduce((sum, item) => sum + (item.selected ?? 0), 0)
	);
});

// **监听评分变化，通知父组件**
watch(
	() => props.criteria,
	(newCriteria) => {
		emit('update:criteria', newCriteria); // 返回评分详情
		emit('update:totalScore', totalScore.value); // 返回总分
	},
	{ deep: true }
);

// **清除评分**
const clearSelection = () => {
	props.criteria.forEach((item) => (item.selected = null));
	emit('update:criteria', props.criteria);
	emit('update:totalScore', props.baseScore);
};
</script>

<template>
	<el-table :data="props.criteria" border>
		<el-table-column prop="name" label="评分项" width="150" />
		<el-table-column label="一档" width="100">
			<template #default="{ row }">
				<el-radio v-model="row.selected" :label="row.options[0]">
					{{ row.options[0] }}
				</el-radio>
			</template>
		</el-table-column>
		<el-table-column label="二档" width="100">
			<template #default="{ row }">
				<el-radio v-model="row.selected" :label="row.options[1]">
					{{ row.options[1] }}
				</el-radio>
			</template>
		</el-table-column>
		<el-table-column label="三档" width="100">
			<template #default="{ row }">
				<el-radio v-model="row.selected" :label="row.options[2]">
					{{ row.options[2] }}
				</el-radio>
			</template>
		</el-table-column>
		<el-table-column label="四档" width="100">
			<template #default="{ row }">
				<el-radio
					v-model="row.selected"
					:label="row.options[3]"
					v-if="row.options.length > 3"
				>
					{{ row.options[3] }}
				</el-radio>
			</template>
		</el-table-column>
	</el-table>

	<div style="margin-top: 20px; text-align: center">
		<el-row :gutter="10">
			<el-col :span="12"
				><h3>总分: {{ totalScore }}</h3></el-col
			>
			<el-col :span="12"
				><el-button type="primary" @click="clearSelection"
					>清零</el-button
				></el-col
			>
		</el-row>
	</div>
</template>
