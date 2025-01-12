<script setup>
import { ref } from 'vue';
import {
	ElForm,
	ElFormItem,
	ElInput,
	ElButton,
	ElSelect,
	ElOption,
	ElUpload,
	ElTable,
	ElTableColumn,
} from 'element-plus';

const levels = ['校级', '省级', '国家级'];
const types = ['创新项目', '创业项目'];

const form = ref({
	level: '',
	type: '',
	teamInfo: '',
	teacherInfo: '',
	title: '',
	description: '',
	discipline: '',
	keywords: '',
	applicationFile: null,
});

const submittedProjects = ref([
	{
		级别: '校级',
		类型: '创新项目',
		团队信息: '团队A',
		指导教师信息: '教师A',
		题目: '项目A',
		简介: '简介A',
		所属一级学科: '学科A',
		关键词: '关键词A',
	},
	// 可以添加更多的项目数据
]);

const handleSubmit = () => {
	console.log('提交的表单数据:', form.value);
	// 在这里处理表单提交逻辑
};

const handleFileChange = (file) => {
	form.value.applicationFile = file;
	console.log('上传的文件:', file.name);
};

const handleEdit = (index) => {
	console.log('编辑项目:', submittedProjects.value[index]);
	// 在这里处理编辑逻辑
};

const handleCancel = (index) => {
	console.log('取消项目:', submittedProjects.value[index]);
	// 在这里处理取消逻辑
};
</script>

<template>
	<div class="upload-innovation-container">
		<h1 class="upload-innovation-title">创新创业项目申请</h1>
		<el-form :model="form" label-width="120px" class="form-grid">
			<el-form-item label="级别">
				<el-select v-model="form.level" placeholder="选择级别">
					<el-option
						v-for="level in levels"
						:key="level"
						:label="level"
						:value="level"
					/>
				</el-select>
			</el-form-item>

			<el-form-item label="类型">
				<el-select v-model="form.type" placeholder="选择类型">
					<el-option
						v-for="type in types"
						:key="type"
						:label="type"
						:value="type"
					/>
				</el-select>
			</el-form-item>

			<el-form-item label="团队信息">
				<el-input v-model="form.teamInfo" placeholder="填写团队信息" />
			</el-form-item>

			<el-form-item label="指导教师信息">
				<el-input
					v-model="form.teacherInfo"
					placeholder="填写指导教师信息"
				/>
			</el-form-item>

			<el-form-item label="题目">
				<el-input v-model="form.title" placeholder="填写题目" />
			</el-form-item>

			<el-form-item label="简介">
				<el-input
					type="textarea"
					v-model="form.description"
					placeholder="填写简介"
				/>
			</el-form-item>

			<el-form-item label="所属一级学科">
				<el-input
					v-model="form.discipline"
					placeholder="填写所属一级学科"
				/>
			</el-form-item>

			<el-form-item label="关键词">
				<el-input
					v-model="form.keywords"
					placeholder="填写关键词（用；隔开）"
				/>
			</el-form-item>

			<el-form-item label="上传申请书">
				<el-upload
					action="#"
					:before-upload="handleFileChange"
					:show-file-list="false"
				>
					<el-button type="primary">点击上传</el-button>
				</el-upload>
			</el-form-item>
		</el-form>
		<div class="button-container">
			<el-button type="primary" @click="handleSubmit">提交申请</el-button>
		</div>
		<h2 class="submitted-projects-title">已提交项目申请</h2>
		<el-table
			:data="submittedProjects"
			style="width: 100%; min-height: 200px"
		>
			<el-table-column prop="级别" label="级别" width="100" />
			<el-table-column prop="类型" label="类型" width="150" />
			<el-table-column prop="团队信息" label="团队信息" width="150" />
			<el-table-column
				prop="指导教师信息"
				label="指导教师信息"
				width="150"
			/>
			<el-table-column prop="题目" label="题目" width="150" />
			<el-table-column prop="简介" label="简介" width="200" />
			<el-table-column
				prop="所属一级学科"
				label="所属一级学科"
				width="150"
			/>
			<el-table-column prop="关键词" label="关键词" width="200" />
			<el-table-column label="操作" fixed="right" width="180">
				<template #default="scope">
					<el-button size="mini" @click="handleEdit(scope.$index)"
						>编辑</el-button
					>
					<el-button
						size="mini"
						type="danger"
						@click="handleCancel(scope.$index)"
						>取消</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
.upload-innovation-container {
	padding: 20px;
}

.upload-innovation-title {
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
	flex: 1 1 calc(33.333% - 20px); /* 三列布局 */
}

.el-table {
	margin-top: 20px;
}

.button-container {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
</style>
