<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
	formData: Object, // 接收父组件传递的 formData
});
const emit = defineEmits(['updateFormData']);
const formRef = ref(null);
const teamMembers = ref(props.formData.teamMembers || []); // 使用父组件传递的 teamMembers
const newMember = ref({
	name: '',
	studentId: '',
	major: '',
	grade: '',
	educationLevel: '',
});

const addMember = () => {
	// 校验表单
	const isValid = formRef.value.validate((valid) => {
		if (valid) {
			// 将新成员添加到组员列表中
			teamMembers.value.push({ ...newMember.value });
			ElMessage.success(`添加学生：${newMember.value.name} 成功`);

			// 清空输入框
			newMember.value = {
				name: '',
				studentId: '',
				major: '',
				grade: '',
				educationLevel: '',
			};
			emit('updateFormData', { teamMembers: teamMembers.value }); // 触发 emit
			setTimeout(() => {
				formRef.value.clearValidate(); // 清除验证状态
			}, 0);
		} else {
			// 显示错误信息
			ElMessage.error('请填写所有团队信息中的必填字段');
		}
	});
};
const removeMember = (index) => {
	teamMembers.value.splice(index, 1);
	emit('updateFormData', { teamMembers: teamMembers.value }); // 触发 emit
};
</script>

<template>
	<el-card class="form-card">
		<div class="form-title">团队信息录入</div>
		<el-form :model="newMember" ref="formRef" label-width="120px">
			<!-- 组员信息录入部分 -->
			<div class="member-input">
				<div class="input-row">
					<el-form-item
						label="学生姓名"
						class="form-item"
						prop="name"
						:rules="[{ required: true, message: '请输入学生姓名' }]"
					>
						<el-input
							v-model="newMember.name"
							placeholder="请输入学生姓名"
						/>
					</el-form-item>
					<el-form-item
						label="学生学号"
						class="form-item"
						prop="studentId"
						:rules="[{ required: true, message: '请输入学生学号' }]"
					>
						<el-input
							v-model="newMember.studentId"
							placeholder="请输入学生学号"
						/>
					</el-form-item>
				</div>
				<div class="input-row">
					<!-- <el-form-item
						label="团队角色"
						class="form-item"
						prop="role"
						:rules="[{ required: true, message: '请输入团队角色' }]"
					>
						<el-input
							v-model="newMember.role"
							placeholder="请输入团队角色"
						/>
					</el-form-item> -->
					<el-form-item
						label="学历"
						class="form-item"
						prop="educationLevel"
						:rules="[{ required: true, message: '请选择学历' }]"
					>
						<el-select
							v-model="newMember.educationLevel"
							placeholder="请选择学历"
						>
							<el-option label="本科" value="本科" />
							<el-option label="专科" value="专科" />
						</el-select>
					</el-form-item>
					<el-form-item
						label="专业"
						class="form-item"
						prop="major"
						:rules="[{ required: true, message: '请输入专业' }]"
					>
						<el-input
							v-model="newMember.major"
							placeholder="请输入专业"
						/>
					</el-form-item>
				</div>
				<div class="input-row">
					<el-form-item
						label="年级"
						class="form-item"
						prop="grade"
						:rules="[{ required: true, message: '请输入年级' }]"
					>
						<el-input
							v-model="newMember.grade"
							placeholder="请输入年级"
						/>
					</el-form-item>
				</div>
				<el-button
					type="primary"
					@click="addMember"
					style="float: right"
					>添加组员</el-button
				>
			</div>

			<!-- 组员信息表格 -->
			<el-table :data="teamMembers" style="width: 100%">
				<el-table-column prop="name" label="学生姓名" />
				<el-table-column prop="studentId" label="学生学号" />
				<!-- <el-table-column prop="role" label="团队角色" /> -->
				<el-table-column prop="major" label="专业" />
				<el-table-column prop="grade" label="年级" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button
							@click="removeMember(scope.$index)"
							type="danger"
							size="small"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
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
.member-input {
	margin-bottom: 20px;
}
.input-row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px; /* 每行之间的间距 */
}
.form-item {
	flex: 1; /* 每个表单项占据相同的宽度 */
	margin-right: 10px; /* 右侧间距 */
}
.form-item:last-child {
	margin-right: 0; /* 最后一个表单项不需要右侧间距 */
}
</style>
