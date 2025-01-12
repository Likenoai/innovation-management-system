<script setup>
import { ref } from 'vue';
import {
	ElForm,
	ElFormItem,
	ElInput,
	ElButton,
	ElDatePicker,
	ElTable,
	ElTableColumn,
} from 'element-plus';

// 表单数据
const form = ref({
	projectType: '',
	startDate: '',
	endDate: '',
});

// 已设定的信息列表
const settings = ref([]);

// 提交表单
const handleSubmit = () => {
	if (form.value.projectType && form.value.startDate && form.value.endDate) {
		settings.value.push({ ...form.value });
		// 清空表单
		form.value.projectType = '';
		form.value.startDate = '';
		form.value.endDate = '';
	} else {
		alert('请填写所有字段');
	}
};
</script>

<template>
	<div class="set-upload-innovation-container">
		<h1 class="set-upload-innovation-title">设定学生提交项目信息</h1>
		<el-form :model="form" label-width="120px" class="form-grid">
			<el-form-item label="项目类型">
				<el-input
					v-model="form.projectType"
					placeholder="填写项目类型"
				/>
			</el-form-item>

			<el-form-item label="开始日期">
				<el-date-picker
					v-model="form.startDate"
					type="date"
					placeholder="选择开始日期"
				/>
			</el-form-item>

			<el-form-item label="结束日期">
				<el-date-picker
					v-model="form.endDate"
					type="date"
					placeholder="选择结束日期"
				/>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="handleSubmit"
					>提交设定</el-button
				>
			</el-form-item>
		</el-form>

		<h2 class="submitted-projects-title">已设定的信息</h2>
		<el-table :data="settings" style="width: 100%">
			<el-table-column prop="projectType" label="项目类型" width="150" />
			<el-table-column prop="startDate" label="开始日期" width="150" />
			<el-table-column prop="endDate" label="结束日期" width="150" />
		</el-table>
	</div>
</template>

<style scoped>
.set-upload-innovation-container {
	padding: 20px;
}

.set-upload-innovation-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px; /* 增加标题与内容的距离 */
}

.form-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.el-form-item {
	flex: 1 1 calc(33.333% - 20px); /* 三列布局 */
}

.el-table {
	margin-top: 20px;
}

.submitted-projects-title {
	margin-top: 40px; /* 增加表格标题与表单的距离 */
}
</style>
