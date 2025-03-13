<script setup>
import { defineProps, defineEmits, onMounted, ref, computed, watch } from 'vue';
import staticConfig from '../../config/static';
import { ElMessage } from 'element-plus';
import * as staticApi from '@/api/staticApi.js';
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const updateForm = (key, value) => {
	emit('update:modelValue', { ...props.modelValue, [key]: value });
};

// 加载表单中的选择项S
const projectStaticOptions = ref({
	projectCategory: [],
	projectFirstLevel: [],
	projectSecondLevel: [],
}); // 项目静态配置
// 获取项目类别配置
const getProjectStaticOptions = async () => {
	const categoryRes = await staticApi.getDataByKeyApi(
		staticConfig['项目类型']
	);
	if (categoryRes.code === 200) {
		projectStaticOptions.value.projectCategory =
			categoryRes.data.split('，');
	}
	const firstRes = await staticApi.getDataByKeyApi(staticConfig['一级学科']);
	if (firstRes.code === 200) {
		projectStaticOptions.value.projectFirstLevel =
			firstRes.data.split('，');
	}
};
watch(
	() => props.modelValue.primaryDiscipline,
	(newValue) => {
		if (newValue) {
			getProjectSecondLevelOptions(); // 调用获取二级学科的方法
		}
	}
);
let currentFirstCategory = computed(() => {
	return props.modelValue.primaryDiscipline;
});

const getProjectSecondLevelOptions = async () => {
	const secondRes = await staticApi.getDataByKeyApi(
		currentFirstCategory.value
	);
	if (secondRes.code === 200) {
		projectStaticOptions.value.projectSecondLevel =
			secondRes.data.split('，');
		if (
			projectStaticOptions.value.projectSecondLevel.indexOf(
				props.modelValue.secondaryDiscipline
			) == -1
		) {
			props.modelValue.secondaryDiscipline = '';
		}
	} else {
		projectStaticOptions.value.projectSecondLevel = [];
	}
};
onMounted(() => {
	getProjectSecondLevelOptions();
	getProjectStaticOptions();
});
// 加载表单中的选择项E

const rules = {
	//项目信息
	projectName: [
		{ required: true, message: '请输入项目名称', trigger: 'blur' },
	],
	projectCategory: [
		{ required: true, message: '请选择项目类别', trigger: 'change' },
	],
	keyField: [
		{ required: true, message: '请输入所属重点领域', trigger: 'blur' },
	],
	projectLevel: [
		{ required: true, message: '请选择项目级别', trigger: 'change' },
	],
	// 学科信息
	primaryDiscipline: [
		{ required: true, message: '请选择一级学科', trigger: 'change' },
	],
	secondaryDiscipline: [
		{ required: true, message: '请选择二级学科', trigger: 'change' },
	],
	// 资金与时间
	approvalTime: [
		{ required: true, message: '请选择立项时间', trigger: 'change' },
	],
	requestedFunding: [
		{ required: true, message: '请选择申请金额', trigger: 'change' },
	],
	projectDuration: [
		{
			type: 'number',
			required: true,
			message: '请输入项目周期',
			trigger: 'change',
		},
	],
	// 负责人信息
	dutyName: [
		{ required: true, message: '请输入负责人姓名', trigger: 'blur' },
	],
	dutySex: [{ required: true, message: '请输入负责人性别', trigger: 'blur' }],
	dutyId: [{ required: true, message: '请输入负责人学号', trigger: 'blur' }],
	dutyCollege: [
		{ required: true, message: '请输入负责人所在学院', trigger: 'blur' },
	],
	dutyRelation: [
		{ required: true, message: '请输入联系方式', trigger: 'blur' },
		{
			pattern: /^1[3-9]\d{9}$/,
			message: '请输入有效的手机号',
			trigger: 'blur',
		},
	],
};
// 提交表单校验
const formRef = ref(null);

const validateForm = async () => {
	try {
		return await formRef.value.validate();
	} catch (error) {
		ElMessage.error('表单校验失败，请检查输入');
		return false;
	}
};
defineExpose({
	validateForm,
});
</script>

<template>
	<el-form
		:model="props.modelValue"
		:rules="rules"
		validate-on-rule-change
		ref="formRef"
	>
		<el-divider content-position="center" border-style="none">
			<h1>项目信息</h1>
		</el-divider>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="项目名称" prop="projectName">
					<el-input
						v-model="props.modelValue.projectName"
						@input="updateForm('projectName', $event)"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="项目类别" prop="projectType">
					<el-select
						v-model="props.modelValue.projectType"
						@change="updateForm('projectType', $event)"
					>
						<el-option label="一般项目" value="一般项目" />
						<el-option label="重点领域项目" value="重点领域项目" />
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="项目类型" prop="projectCategory">
					<el-select
						v-model="props.modelValue.projectCategory"
						@change="updateForm('projectCategory', $event)"
					>
						<el-option
							:label="item"
							:value="item"
							v-for="item in projectStaticOptions.projectCategory"
						/>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-form-item label="所属重点领域" prop="keyField">
					<el-input
						v-model="props.modelValue.keyField"
						@input="updateForm('keyField', $event)"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="项目级别" prop="projectLevel">
					<el-select
						v-model="props.modelValue.projectLevel"
						@change="updateForm('projectLevel', $event)"
					>
						<el-option label="国家级" value="国家级" />
						<el-option label="省级" value="省级" />
						<el-option label="校级" value="校级" />
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="项目来源名称" prop="sourceName">
					<el-input
						v-model="props.modelValue.sourceName"
						@input="updateForm('sourceName', $event)"
					/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider content-position="left" border-style="none"
			><h4>学科信息</h4></el-divider
		>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="一级学科" prop="primaryDiscipline">
					<el-select
						v-model="props.modelValue.primaryDiscipline"
						@change="updateForm('primaryDiscipline', $event)"
					>
						<el-option
							:label="item"
							:value="item"
							v-for="item in projectStaticOptions.projectFirstLevel"
						/>
					</el-select>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item label="二级学科" prop="secondaryDiscipline">
					<el-select
						v-model="props.modelValue.secondaryDiscipline"
						@change="updateForm('secondaryDiscipline', $event)"
						:disabled="
							projectStaticOptions.projectSecondLevel.length === 0
						"
					>
						<el-option
							:label="item"
							:value="item"
							v-for="item in projectStaticOptions.projectSecondLevel"
						/>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>

		<el-divider content-position="left" border-style="none"
			><h4>资金与时间</h4></el-divider
		>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-form-item label="立项时间" prop="approvalTime">
					<el-date-picker
						v-model="props.modelValue.approvalTime"
						type="date"
						value-format="YYYY-MM-DDTHH:mm:ss"
						@change="updateForm('approvalTime', $event)"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="申请金额（元）" prop="requestedFunding">
					<el-input-number
						v-model="props.modelValue.requestedFunding"
						:min="0"
						@change="updateForm('requestedFunding', $event)"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="项目周期（月）" prop="projectDuration">
					<el-input-number
						v-model="props.modelValue.projectDuration"
						:min="1"
						@change="updateForm('projectDuration', $event)"
					/>
				</el-form-item>
			</el-col>

			<!-- <el-col :span="12">
				<el-form-item label="获批金额（元）">
					<el-input-number
						v-model="props.modelValue.approvedFunding"
						:min="0"
						@change="updateForm('approvedFunding', $event)"
					/>
				</el-form-item>
			</el-col> -->
		</el-row>

		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="项目简介" prop="projectDescription">
					<el-input
						v-model="props.modelValue.projectDescription"
						type="textarea"
						@input="updateForm('projectDescription', $event)"
					/> </el-form-item
			></el-col>
		</el-row>

		<el-divider content-position="center" border-style="none"
			><h1>负责人信息</h1></el-divider
		>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-form-item label="负责人姓名" prop="dutyName">
					<el-input
						v-model="props.modelValue.dutyName"
						@input="updateForm('dutyName', $event)"
					/>
				</el-form-item>
			</el-col>

			<el-col :span="6">
				<el-form-item label="负责人性别" prop="dutySex">
					<el-select
						v-model="props.modelValue.dutySex"
						@change="updateForm('dutySex', $event)"
					>
						<el-option label="男" :value="1" />
						<el-option label="女" :value="0" />
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="负责人学号" prop="dutyId">
					<el-input
						v-model="props.modelValue.dutyId"
						@input="updateForm('dutyId', $event)"
					/>
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="所在学院" prop="dutyCollege">
					<el-input
						v-model="props.modelValue.dutyCollege"
						@input="updateForm('dutyCollege', $event)"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="联系方式" prop="dutyRelation">
					<el-input
						v-model="props.modelValue.dutyRelation"
						@input="updateForm('dutyRelation', $event)"
					/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="12">
				<el-form-item label="科研经历" prop="dutyExperience">
					<el-input
						v-model="props.modelValue.dutyExperience"
						type="textarea"
						@input="updateForm('dutyExperience', $event)"
					/> </el-form-item
			></el-col>
		</el-row>

		<el-divider content-position="center" border-style="none"
			><h1>企业指导信息</h1></el-divider
		>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-form-item label="企业导师姓名" prop="enterpriseAdvisorName">
					<el-input
						v-model="props.modelValue.enterpriseAdvisorName"
						@input="updateForm('enterpriseAdvisorName', $event)"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="6"
				><el-form-item
					label="导师职务"
					prop="enterpriseAdvisorPosition"
				>
					<el-input
						v-model="props.modelValue.enterpriseAdvisorPosition"
						@input="updateForm('enterpriseAdvisorPosition', $event)"
					/> </el-form-item
			></el-col>
			<el-col :span="12">
				<el-form-item
					label="导师联系方式"
					prop="enterpriseAdvisorContact"
				>
					<el-input
						v-model="props.modelValue.enterpriseAdvisorContact"
						@input="updateForm('enterpriseAdvisorContact', $event)"
					/>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="12">
				<el-form-item
					label="导师经验"
					prop="enterpriseAdvisorExperience"
				>
					<el-input
						v-model="props.modelValue.enterpriseAdvisorExperience"
						type="textarea"
						@input="
							updateForm('enterpriseAdvisorExperience', $event)
						"
					/>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<style scoped></style>
