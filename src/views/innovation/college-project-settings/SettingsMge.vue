<script setup>
import { ref, onMounted } from 'vue';
import * as staffApi from '@/api/staffApi.js';
import { ElMessage } from 'element-plus';
import { useMyLoginStore } from '../../../stores/myLoginStore';
// 时间管理数据
const submitDeadline = ref('');
const reviewRange = ref([]);
const myLoginStore = useMyLoginStore();
// 评审管理数据
const newExpert = ref('');
const experts = ref([]);

const getExperts = async () => {
	try {
		const response = await staffApi.getCollegeExpertsApi({
			college: myLoginStore.userInfo.college,
		});
		if (response.code === 200) {
			experts.value = response.data;
			console.log('experts.value:', experts.value);
		}
	} catch (error) {
		ElMessage.error({
			message: '获取专家列表出错，请稍后重试',
			duration: 3000,
		});
		console.error('获取专家列表错误:', error);
	}
};
onMounted(() => {
	getExperts();
});
// const addExpert = () => {
// 	if (newExpert.value.trim()) {
// 		experts.value.push({
// 			id: Date.now(),
// 			name: newExpert.value,
// 			assignedCount: 0,
// 		});
// 		newExpert.value = '';
// 		ElMessage.success('专家添加成功');
// 	}
// };

// const removeExpert = (expert) => {
// 	experts.value = experts.value.filter((e) => e.id !== expert.id);
// };

const assignProjects = () => {
	ElMessage.info('项目分配功能开发中...');
};
</script>

<template>
	<div class="settings-container">
		<el-card shadow="never" style="height: 100%">
			<el-tabs type="border-card" style="height: 100%">
				<!-- 时间管理 -->
				<el-tab-pane label="时间管理">
					<el-form label-width="160px">
						<el-form-item label="申请书截止时间">
							<el-date-picker
								v-model="submitDeadline"
								type="datetime"
								placeholder="选择截止时间"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
						</el-form-item>

						<el-form-item label="院级评审时间">
							<el-date-picker
								v-model="reviewRange"
								type="daterange"
								range-separator="-"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							/>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<!-- 评审管理 -->
				<el-tab-pane label="评审管理">
					<div class="expert-management">
						<el-space>
							<el-input
								v-model="newExpert"
								placeholder="输入专家姓名"
								style="width: 200px"
							/>
							<el-button type="primary" @click="addExpert"
								>添加专家</el-button
							>
							<el-button @click="assignProjects"
								>分配项目评审</el-button
							>
						</el-space>

						<el-table :data="experts" height="300px" class="mt-20">
							<el-table-column prop="name" label="专家姓名" />
							<el-table-column
								prop="assignedCount"
								label="已分配项目数"
							/>
							<el-table-column label="操作" width="120">
								<template #default="scope">
									<el-button
										link
										type="danger"
										@click="removeExpert(scope.row)"
										>移除</el-button
									>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<style scoped>
.settings-container {
	padding: 20px;
	height: 100%;
	background: #f5f7fa;
	:deep(.el-card__body) {
		height: 100%;
	}
	:deep(.el-tabs__content) {
		padding: 20px;
	}

	.mt-20 {
		margin-top: 20px;
	}

	.expert-management {
		padding: 0 20px;
	}
}
</style>
