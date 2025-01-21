<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus'; // 引入 ElMessage

const props = defineProps({
	formData: Object, // 接收父组件传递的 formData
});
const emit = defineEmits(['updateFormData']); // 定义 emit
const formRef = ref(null); // 定义 formRef
const supervisors = ref(props.formData.supervisors || []); // 使用父组件传递的 supervisors
const newSupervisor = ref({
	name: '',
	title: '',
	department: '',
	phone: '',
	email: '',
});

const addSupervisor = () => {
	// 校验表单
	const isValid = formRef.value.validate((valid) => {
		if (valid) {
			// 将新教师添加到列表中
			supervisors.value.push({ ...newSupervisor.value });
			ElMessage.success(`添加教师：${newSupervisor.value.name} 成功`);

			// 清空输入框
			newSupervisor.value = {
				name: '',
				title: '',
				department: '',
				phone: '',
				email: '',
			};
			emit('updateFormData', { supervisors: supervisors.value }); // 触发 emit
			setTimeout(() => {
				formRef.value.clearValidate();
			});
		} else {
			// 显示错误信息
			ElMessage.error('请填写指导教师信息中所有必填字段');
		}
	});
};

const removeSupervisor = (index) => {
	supervisors.value.splice(index, 1);
	emit('updateFormData', { supervisors: supervisors.value }); // 触发 emit
};
</script>

<template>
	<el-card class="form-card">
		<div class="form-title">指导教师信息录入</div>
		<el-form :model="newSupervisor" ref="formRef" label-width="120px">
			<!-- 教师信息录入部分 -->
			<div class="supervisor-input">
				<div class="input-row">
					<el-form-item
						label="教师姓名"
						class="form-item"
						prop="name"
						:rules="[{ required: true, message: '请输入教师姓名' }]"
					>
						<el-input
							v-model="newSupervisor.name"
							placeholder="请输入教师姓名"
						/>
					</el-form-item>
					<el-form-item
						label="职称"
						class="form-item"
						prop="title"
						:rules="[{ required: true, message: '请输入职称' }]"
					>
						<el-input
							v-model="newSupervisor.title"
							placeholder="请输入职称"
						/>
					</el-form-item>
				</div>
				<div class="input-row">
					<el-form-item
						label="所属部门"
						class="form-item"
						prop="department"
						:rules="[{ required: true, message: '请输入所属部门' }]"
					>
						<el-input
							v-model="newSupervisor.department"
							placeholder="请输入所属部门"
						/>
					</el-form-item>
					<el-form-item
						label="联系电话"
						class="form-item"
						prop="phone"
						:rules="[{ required: true, message: '请输入联系电话' }]"
					>
						<el-input
							v-model="newSupervisor.phone"
							placeholder="请输入联系电话"
						/>
					</el-form-item>
				</div>
				<div class="input-row">
					<el-form-item
						label="邮件"
						class="form-item"
						prop="email"
						:rules="[{ required: true, message: '请输入邮件' }]"
					>
						<el-input
							v-model="newSupervisor.email"
							placeholder="请输入邮件"
						/>
					</el-form-item>
					<div class="form-item"></div>
				</div>
				<el-button
					type="primary"
					@click="addSupervisor"
					style="float: right"
					>添加指导教师</el-button
				>
			</div>

			<!-- 教师信息表格 -->
			<el-table :data="supervisors" style="width: 100%">
				<el-table-column prop="name" label="教师姓名" />
				<el-table-column prop="title" label="职称" />
				<el-table-column prop="department" label="所属部门" />
				<el-table-column prop="phone" label="联系电话" />
				<el-table-column prop="email" label="邮件" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button
							@click="removeSupervisor(scope.$index)"
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
.supervisor-input {
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
