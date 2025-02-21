<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import BasicInfo from './basicInfo/index.vue';
import TeamInfo from './TeamInfo.vue';
import SupervisorInfo from './SupervisorInfo.vue';
import axios from 'axios';
const formData = ref({
	// 基础信息
	batch: '', // 批次时间
	projectName: '', // 项目名称
	projectLevel: '', // 项目级别
	projectType: '', // 项目类型
	projectCategory: '', // 项目类别
	primaryDiscipline: '', // 所属学科
	projectFunding: '',
	// 团队信息
	teamMembers: [],
	// 指导教师信息
	supervisors: [],

	projectDescription: '',
	attachments: [], // 附件
});

const batches = ['2024年', '2023年', '2022年'];
const primaryDisciplines = ['工学', '理学', '文学'];
const colleges = ['机械工程学院', '计算机科学与技术学院', '外国语学院'];

const submitForm = async () => {
	// 打印所有填写的数据
	let res = await axios
		.post('/api/post', {
			...formData.value,
		})
		.then(function (response) {
			console.log(response);
			ElMessage.success('保存成功！');
		})
		.catch(function (error) {
			console.log(error);
			ElMessage.error('保存失败！');
		});
	console.log('提交的数据:', JSON.stringify(formData.value, null, 2));
};

const resetForm = () => {
	// 重置表单逻辑
	formData.value = {
		projectDescription: '',
		attachments: [],
		batch: '',
		projectName: '',
		projectLevel: '',
		projectType: '',
		projectCategory: '',
		primaryDiscipline: '',
		teamMembers: [],
		supervisors: [],
		projectFunding: '',
	};
	ElMessage.info('表单已重置！');
};

const handleFileChange = (file, fileList) => {
	formData.value.attachments = fileList; // 更新附件列表
};

const beforeUpload = (file) => {
	const isValid = file.size / 1024 / 1024 < 2; // 限制文件大小为2MB
	if (!isValid) {
		ElMessage.error('上传文件大小不能超过 2MB!');
	}
	return isValid;
};

const handleExceed = (files, fileList) => {
	ElMessage.warning(
		`当前限制选择 2 个文件，已选择 ${fileList.length} 个文件`
	);
};

// 接收来自 BasicInfo 的 emit 通知
const updateFormData = (newData) => {
	Object.assign(formData.value, newData); // 更新 formData 的部分数据
	console.log(formData.value);
};
</script>

<template>
	<div class="form-container">
		<el-form :model="formData" ref="formRef" label-width="120px">
			<BasicInfo
				:formData="formData"
				:batches="batches"
				:primaryDisciplines="primaryDisciplines"
				@updateFormData="updateFormData"
			/>
			<TeamInfo
				:formData="formData"
				:colleges="colleges"
				@updateFormData="updateFormData"
			/>
			<SupervisorInfo
				:formData="formData"
				@updateFormData="updateFormData"
			/>
			<!-- 项目详细描述和附件上传部分 -->
			<el-card class="form-card">
				<div class="form-title">项目详细信息</div>
				<!-- 项目详细描述 -->
				<el-form-item label="项目简介" prop="projectDescription">
					<el-input
						type="textarea"
						v-model="formData.projectDescription"
						placeholder="请输入项目简介"
						rows="4"
					/>
				</el-form-item>
				<!-- 附件上传 -->
				<el-form-item label="附件" prop="attachments">
					<div style="margin-bottom: 10px">
						<!-- 增加间隔 -->
						<el-upload
							class="upload-demo"
							action="#"
							multiple
							:on-change="handleFileChange"
							:before-upload="beforeUpload"
							:limit="2"
							:on-exceed="handleExceed"
							:show-file-list="true"
							:file-list="formData.attachments"
						>
							<el-button
								slot="trigger"
								size="small"
								type="primary"
								style="margin-right: 8px"
								>选择文件</el-button
							>
							<div slot="tip" class="el-upload__tip">
								只能上传不超过2个文件，且每个文件大小不能超过2MB
							</div>
						</el-upload>
					</div>
				</el-form-item>
			</el-card>

			<el-form-item style="display: flex; justify-content: space-between">
				<el-button type="primary" @click="submitForm">保存</el-button>
				<el-button @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped>
.form-container {
	padding: 20px;
}
.form-card {
	margin-bottom: 20px;
}
.form-title {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 10px;
}
</style>
