<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import * as contestApi from '@/api/contestApi.js'; // 确保路径正确
import * as staticApi from '@/api/staticApi.js'; // 确保路径正确
import { ElMessage } from 'element-plus';
import { generateProjectData } from '@/utils/mock/exoertsAssignMock.js';
import { useDynamicHeight } from '@/utils/tableUtils.js';
import { formateTime } from '@/utils/dateUtils.js';
import { useMyLoginStore } from '@/stores/myLoginStore.js';
const myLoginStore = useMyLoginStore();
let college = myLoginStore.userInfo.college;
let isStudent = computed(() => {
	return myLoginStore.role === 6;
});
const isMock = false;
const router = useRouter();
const loading = ref(false);
const projectList = ref([]);
let tableHeight = useDynamicHeight(200);

import { isAfterCurrentTime } from '../../utils/dateUtils';
const goToUploadProject = async () => {
	try {
		const response = await staticApi.getDataByKeyApi(
			'apply_end_time' + college
		);
		const endTimeStr = response.data;
		console.log('endTimeStr:', endTimeStr);

		// 时间比对
		if (!isAfterCurrentTime(endTimeStr)) {
			router.push({ name: 'UploadInnovation' });
		} else {
			ElMessage.error('申请书上传时间已过，无法提交新项目');
		}
	} catch (error) {
		console.error('请求失败:', error);
		ElMessage.error('无法获取评审时间，请稍后重试');
	}
};

const getProjectList = async () => {
	loading.value = true;
	try {
		const response = await contestApi.getProjectDetails();
		if (response.code === 200) {
			projectList.value = response.data;
		} else {
			ElMessage.error({
				message: '获取项目列表失败: ' + response.msg,
				duration: 3000,
			});
		}
	} catch (error) {
		ElMessage.error({
			message: '获取项目列表出错，请稍后重试',
			duration: 3000,
		});
		console.error('获取项目列表错误:', error);
	} finally {
		loading.value = false;
	}
};
onMounted(() => {
	if (!isMock) {
		getProjectList();
	} else {
		projectList.value = generateProjectData(30);
	}
});
const handleView = (project) => {
	console.log('project:', project);
	router.push({
		name: 'UploadInnovation',
		params: { projectId: project.id },
	});
};
</script>

<template>
	<div class="my-projects-container">
		<el-header>
			<el-row :gutter="10">
				<el-col :span="6"><h1>我的项目</h1></el-col>
				<el-col :span="6" align="right" :push="12"
					><el-button type="primary" @click="goToUploadProject"
						>项目申请</el-button
					></el-col
				>
			</el-row>
		</el-header>
		<el-main>
			<el-table
				v-loading="loading"
				:data="projectList"
				border
				style="width: 100%"
				:height="tableHeight"
			>
				<el-table-column
					prop="projectName"
					label="项目名称"
					:min-width="180"
				/>
				<el-table-column
					prop="projectType"
					label="项目类型"
					:min-width="120"
					align="center"
				/>
				<el-table-column
					prop="projectCategory"
					label="项目类别"
					:min-width="120"
					align="center"
				>
					<template #default="scope">
						<div
							:style="
								scope.row.projectCategory === '创新训练项目'
									? 'color: #95d475'
									: scope.row.projectCategory ===
											'创业训练项目' ||
									  scope.row.projectCategory ===
											'创业实践项目'
									? 'color: #eebe77'
									: 'color: #f56c6c'
							"
						>
							{{ scope.row.projectCategory }}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="projectLevel"
					label="项目级别"
					:min-width="120"
					align="center"
				/>
				<el-table-column
					prop="dutyName"
					label="负责人姓名"
					:min-width="120"
					align="center"
				/>
				<el-table-column
					prop="dutyCollege"
					label="负责人学院"
					:min-width="180"
					align="center"
				/>
				<el-table-column
					prop="sourceName"
					label="项目来源"
					:min-width="150"
				/>
				<el-table-column
					prop="approvalTime"
					label="批准时间"
					:min-width="150"
					align="center"
				>
					<template #default="scope">
						{{ formateTime(scope.row.approvalTime) }}
					</template>
				</el-table-column>
				<el-table-column
					prop="dutyFlag"
					label="项目负责人"
					:min-width="150"
					align="center"
					v-if="isStudent"
				>
					<template #default="scope">
						<span v-if="scope.row.dutyFlag === true"
							><el-icon color="#12bb37" size="1.2rem"
								><Select /></el-icon
						></span>
						<span v-else>
							<el-icon color="red" size="1.2rem"
								><CloseBold /></el-icon
						></span>
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					:min-width="150"
					fixed="right"
					align="center"
				>
					<template #default="scope">
						<el-button
							type="primary"
							text
							@click="handleView(scope.row)"
						>
							查看
						</el-button>
					</template>
				</el-table-column>
				<!-- 可以根据需要添加更多列 -->
			</el-table>
		</el-main>
	</div>
</template>

<style scoped>
.my-projects-container {
	padding: 20px;
}
</style>
