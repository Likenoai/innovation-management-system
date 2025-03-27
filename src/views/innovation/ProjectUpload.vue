<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import { nanoid } from 'nanoid';
import ProjectInfoForm from '@/components/innovation/ProjectInfoForm.vue';
import ProjectMemberForm from '@/components/innovation/ProjectMemberForm.vue';
import ProjectAdvisorForm from '@/components/innovation/ProjectAdvisorForm.vue';
import ProjectUploadFiles from '@/components/innovation/ProjectUploadFiles.vue';
import * as contestApi from '@/api/contestApi.js';
import * as staticApi from '@/api/staticApi.js';
import { ElMessage } from 'element-plus';
import { mockFormData } from '../../utils/mock/exoertsAssignMock';
import { useRoute } from 'vue-router'; // 新增路由hook
import { useMyLoginStore } from '@/stores/myLoginStore';
const myLoginStore = useMyLoginStore();
let college = myLoginStore.userInfo.college;
const route = useRoute(); // 获取路由实例
const projectId = computed(() => route.params.projectId);
console.log('projectId:', projectId);
const formData = ref({
	projectDetail: {
		// 项目基础信息
		projectId: null, // 项目ID（新建时为空）
		projectType: '', // 项目类型（科研/创业等）
		projectCategory: '', // 项目分类（创新训练/创业训练等）
		keyField: '', // 所属重点领域
		projectName: '', // 项目名称
		projectLevel: '', // 项目级别（国家级/省级等）
		primaryDiscipline: '', // 一级学科
		secondaryDiscipline: '', // 二级学科
		requestedFunding: null, // 申请经费（单位：元）
		approvedFunding: null, // 批准经费（单位：元）
		projectDuration: null, // 项目周期（单位：月）
		projectDescription: '', // 项目描述
		sourceName: '', // 所属重点领域
		approvalTime: '', // 立项时间（ISO格式）
		// 负责人信息
		dutyName: '', // 负责人姓名
		dutySex: null, // 性别（0-女，1-男）
		dutyNation: '', // 民族
		dutyBirth: '', // 出生日期（YYYY-MM-DD）
		dutyId: '', // 身份证号
		dutyCollege: '', // 所属学院
		dutyRelation: '', // 与项目关系
		dutyExperience: '', // 相关经历
		// 企业导师信息
		enterpriseAdvisorName: '', // 导师姓名
		enterpriseAdvisorContact: '', // 联系方式
		enterpriseAdvisorPosition: '', // 职位
		enterpriseAdvisorExperience: '', // 指导经验
		attachment: '', // 附件路径（支持PDF/doc/xls等格式）
	},
	projectMembers: [], // 项目成员数组（学生信息）
	projectAdvisors: [], // 校内导师数组（教师信息）
});
formData.value = mockFormData;
const getProject = async () => {
	try {
		// 使用 projectId.value 获取最新值
		const response = await contestApi.getProject(projectId.value);
		if (response.code === 200) {
			formData.value = response.data;
		}
	} catch (error) {
		console.error('获取项目失败:', error);
	}
};

// 改用 watch 监听路由变化
watch(
	projectId,
	(newVal) => {
		if (newVal) {
			getProject();
		}
	},
	{ immediate: true }
);
// 移除 isUpdate 的手动赋值
const isUpdate = computed(() => !!projectId.value);

import { isAfterCurrentTime } from '../../utils/dateUtils';

// 提交逻辑修正
const submitProject = async () => {
	const response = await staticApi.getDataByKeyApi(
		'apply_end_time' + college
	);
	const endTimeStr = response.data;
	console.log('endTimeStr:', endTimeStr);
	// 时间比对
	if (!isAfterCurrentTime(endTimeStr)) {
		if (isUpdate.value) {
			// 使用计算属性的值
			await handleUpdateProject();
		} else {
			await handleCreateProject();
		}
	} else {
		ElMessage.error('申请书上传时间已过');
	}
};

const handleUpdateProject = async () => {
	await contestApi.updateProject(formData.value).then((res) => {
		ElMessage.success('修改成功');
	});
};
const handleCreateProject = async () => {
	let isValid = await handleSubmit();
	if (isValid === false) {
		return;
	}
	if (formData.value.projectDetail.projectId == null) {
		formData.value.projectDetail.projectId = nanoid(10);
	}
	try {
		await contestApi.applyProject(formData.value);
		ElMessage.success('提交成功');
	} catch (error) {
		ElMessage.error('提交失败', error);
	}
};
const log = () => {
	console.log(formData.value);
};
let projectInfoFormRef = ref(null);
const handleSubmit = async () => {
	return await projectInfoFormRef.value.validateForm();
};

onUnmounted(() => {
	formData.value = {
		projectDetail: {},
		projectMembers: [],
		projectAdvisors: [],
	};
	console.log('ProjectUpload 组件已销毁');
});
</script>

<template>
	<el-card class="upload-card">
		<div class="custom-flex-container">
			<el-row>
				<el-col>
					<ProjectInfoForm
						ref="projectInfoFormRef"
						v-model="formData.projectDetail"
						class="flex-item"
				/></el-col>
			</el-row>

			<el-row :gutter="10" style="padding-bottom: 10px">
				<el-col :span="12"
					><ProjectMemberForm
						v-model="formData.projectMembers"
						class="person-from-item flex-item"
				/></el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="24"
					><ProjectAdvisorForm
						v-model="formData.projectAdvisors"
						class="person-from-item flex-item"
				/></el-col>
			</el-row>

			<el-row>
				<el-col :span="12"
					><ProjectUploadFiles
						v-model="formData.projectDetail.attachment"
				/></el-col>
				<el-col :span="12">
					<div class="box-container">
						<el-button
							:type="isUpdate ? 'success' : 'primary'"
							@click="submitProject"
							style="margin-top: 20px"
						>
							{{ isUpdate ? '修改' : '提交' }}
						</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
	</el-card>
</template>

<style scoped lang="less">
.upload-card {
	width: 100%;
	padding: 20px;
	.box-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
}
</style>
