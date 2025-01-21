<script setup>
import { defineProps, onMounted, defineEmits } from 'vue';

const props = defineProps({
	formData: Object,
	batches: Array,
	primaryDisciplines: Array,
});

const emit = defineEmits(['updateFormData']);

onMounted(() => {
	console.log(props.formData);
});

function updateFormData(newData) {
	console.log('111');
	emit('updateFormData', newData);
}
</script>
<template>
	<el-card class="form-card">
		<div class="form-title">基本信息录入</div>
		<el-form :model="formData" ref="formRef" label-width="120px">
			<div class="form-row">
				<el-form-item
					label="所属批次"
					prop="batch"
					:rules="[
						{
							required: true,
							message: '请选择所属批次',
							trigger: 'change',
						},
					]"
					class="form-item"
				>
					<el-select
						v-model="formData.batch"
						@change="updateFormData({ batch: formData.batch })"
						placeholder="请选择批次"
					>
						<el-option
							v-for="batch in batches"
							:key="batch"
							:label="batch"
							:value="batch"
						/>
					</el-select>
				</el-form-item>

				<el-form-item
					label="项目名称"
					prop="projectName"
					:rules="[
						{
							required: true,
							message: '请输入项目名称',
							trigger: 'blur',
						},
						{
							max: 100,
							message: '项目名称不能超过100个字符',
							trigger: 'blur',
						},
					]"
					class="form-item"
				>
					<el-input
						v-model="formData.projectName"
						@input="
							updateFormData({
								projectName: formData.projectName,
							})
						"
						placeholder="请输入项目名称"
					/>
				</el-form-item>
			</div>

			<div class="form-row">
				<el-form-item
					label="项目级别"
					prop="projectLevel"
					:rules="[
						{
							required: true,
							message: '请选择项目级别',
							trigger: 'change',
						},
					]"
					class="form-item"
				>
					<el-select
						v-model="formData.projectLevel"
						@change="
							updateFormData({
								projectLevel: formData.projectLevel,
							})
						"
						placeholder="请选择项目级别"
					>
						<el-option label="国家级" value="国家级" />
						<el-option label="省级" value="省级" />
						<el-option label="校级" value="校级" />
					</el-select>
				</el-form-item>

				<el-form-item
					label="项目类型"
					prop="projectType"
					:rules="[
						{
							required: true,
							message: '请选择项目类型',
							trigger: 'change',
						},
					]"
					class="form-item"
				>
					<el-select
						v-model="formData.projectType"
						@change="
							updateFormData({
								projectType: formData.projectType,
							})
						"
						placeholder="请选择项目类型"
					>
						<el-option label="创新训练项目" value="创新训练项目" />
						<el-option label="创业训练项目" value="创业训练项目" />
						<el-option label="创业实践项目" value="创业实践项目" />
					</el-select>
				</el-form-item>
			</div>

			<div class="form-row">
				<el-form-item
					label="项目类别"
					prop="projectCategory"
					:rules="[
						{
							required: true,
							message: '请选择项目类别',
							trigger: 'change',
						},
					]"
					class="form-item"
				>
					<el-select
						v-model="formData.projectCategory"
						@change="
							updateFormData({
								projectCategory: formData.projectCategory,
							})
						"
						placeholder="请选择项目类别"
					>
						<el-option label="科技类" value="科技类" />
						<el-option label="人文社科类" value="人文社科类" />
						<el-option label="艺术设计类" value="艺术设计类" />
					</el-select>
				</el-form-item>

				<el-form-item
					label="所属学科"
					prop="primaryDiscipline"
					:rules="[
						{
							required: true,
							message: '请选择所属学科',
							trigger: 'change',
						},
					]"
					class="form-item"
				>
					<el-select
						v-model="formData.primaryDiscipline"
						@change="
							updateFormData({
								primaryDiscipline: formData.primaryDiscipline,
							})
						"
						placeholder="请选择学科"
					>
						<el-option
							v-for="discipline in primaryDisciplines"
							:key="discipline"
							:label="discipline"
							:value="discipline"
						/>
					</el-select>
				</el-form-item>
			</div>

			<div class="form-row">
				<el-form-item
					label="项目经费"
					prop="projectFunding"
					:rules="[{ required: true, message: '请输入项目经费' }]"
					class="form-item"
				>
					<el-input
						v-model="formData.projectFunding"
						placeholder="请输入项目经费"
					/>
				</el-form-item>
				<div class="form-item"></div>
			</div>
		</el-form>
	</el-card>
</template>

<style scoped>
.form-card {
	margin-bottom: 20px;
}
.form-title {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 10px;
}
.form-row {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20px;
}
.form-item {
	flex: 1 1 48%; /* 每个表单项占据48%的宽度，允许换行 */
	margin-right: 20px; /* 右侧间距 */
}
.form-item:last-child {
	margin-right: 0; /* 最后一个表单项不需要右侧间距 */
}
</style>
