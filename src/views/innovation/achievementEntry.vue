<script setup>
import { ref } from 'vue';
import {
	ElForm,
	ElFormItem,
	ElInput,
	ElButton,
	ElSelect,
	ElOption,
	ElTable,
	ElTableColumn,
} from 'element-plus';

// 成果类型
const achievementTypes = [
	'发明专利',
	'实用新型',
	'软件著作权',
	'论文',
	'营业执照',
	'比赛录入',
];

// 表单数据
const form = ref({
	type: '',
	title: '',
	author: '',
	date: '',
});

// 已录入的成果列表
const achievements = ref([]);

// 提交表单
const handleSubmit = () => {
	if (
		form.value.type &&
		form.value.title &&
		form.value.author &&
		form.value.date
	) {
		achievements.value.push({ ...form.value });
		// 清空表单
		form.value.type = '';
		form.value.title = '';
		form.value.author = '';
		form.value.date = '';
	} else {
		alert('请填写所有字段');
	}
};
</script>

<template>
	<div class="achievement-entry-container">
		<h1 class="achievement-entry-title">成果录入系统</h1>
		<el-form :model="form" label-width="120px" class="form-grid">
			<el-form-item label="成果类型">
				<el-select v-model="form.type" placeholder="选择成果类型">
					<el-option
						v-for="type in achievementTypes"
						:key="type"
						:label="type"
						:value="type"
					/>
				</el-select>
			</el-form-item>

			<el-form-item label="成果标题">
				<el-input v-model="form.title" placeholder="填写成果标题" />
			</el-form-item>

			<el-form-item label="作者">
				<el-input v-model="form.author" placeholder="填写作者" />
			</el-form-item>

			<el-form-item label="日期">
				<el-input v-model="form.date" placeholder="填写日期" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="handleSubmit"
					>提交成果</el-button
				>
			</el-form-item>
		</el-form>

		<h2 class="submitted-achievements-title">已录入的成果</h2>
		<el-table :data="achievements" style="width: 100%">
			<el-table-column prop="type" label="成果类型" width="150" />
			<el-table-column prop="title" label="成果标题" width="200" />
			<el-table-column prop="author" label="作者" width="150" />
			<el-table-column prop="date" label="日期" width="150" />
		</el-table>
	</div>
</template>

<style scoped>
.achievement-entry-container {
	padding: 20px;
}

.achievement-entry-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
}

.form-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.el-form-item {
	flex: 1 1 calc(50% - 20px); /* 两列布局 */
}

.el-table {
	margin-top: 20px;
}

.submitted-achievements-title {
	margin-top: 40px; /* 增加表格标题与表单的距离 */
}
</style>
