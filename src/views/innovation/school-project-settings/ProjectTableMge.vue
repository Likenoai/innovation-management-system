<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as contestApi from '@/api/contestApi.js'; // 确保路径正确
import { ElMessage } from 'element-plus';
import { useDynamicHeight } from '@/utils/tableUtils.js';
import { Search } from '@element-plus/icons-vue';
// 在脚本部分顶部引入工具函数
import { formateTime } from '@/utils/dateUtils';
const router = useRouter();
const loading = ref(false);
const projectList = ref([]);
const tableHeight = useDynamicHeight(260);
const paging = ref({
	pageNum: 1,
	pageSize: 30,
	total: 0,
});

const searchKeyword = ref('');
const handleSearch = () => {
	paging.value.pageNum = 1; // 重置为第一页
	getSchoolProjectList();
};

// 在模拟数据部分也添加排序
onMounted(() => {
	getSchoolProjectList();
});
const handleView = (project) => {
	router.push({
		name: 'UploadInnovation',
		params: { projectId: project.projectDetail.id },
	});
};

/**
 * 处理分页变化
 * @param {number} page - 当前页码
 */
const handlePageChange = (page) => {
	paging.value.pageNum = page;
	// 这里可以根据当前页码和每页大小来更新表格数据
	getSchoolProjectList();
};

const statusParams = ref({
	projectId: '',
	detailId: '',
	reviewStatus: '',
});
// 修改项目的状态
const handleStatusParams = (row) => {
	statusParams.value = {
		projectId: row.projectVersion.projectId,
		detailId: row.projectVersion.detailId,
		reviewStatus: row.projectVersion.reviewStatus,
	};
	handleStatusOrder();
};

const handleStatusOrder = async () => {
	try {
		await contestApi.review(statusParams.value);
	} catch (err) {
		ElMessage.error({
			message: '修改失败:' + err.msg,
			duration: 3000,
		});
	}
};

// 在获取数据时记录原始排序值
// 新增排序方法
const sortProjectList = (list) => {
	return list
		.map((item) => ({
			...item,
			projectVersion: {
				...item.projectVersion,
				_originalOrder: item.projectVersion?.reviewOrder,
			},
		}))
		.sort((a, b) => {
			const orderA = a.projectVersion?.reviewOrder ?? Infinity;
			const orderB = b.projectVersion?.reviewOrder ?? Infinity;
			return orderA - orderB;
		});
};

const getSchoolProjectList = async () => {
	loading.value = true;
	try {
		await contestApi
			.getSchoolProjectsApi({
				pageNum: paging.value.pageNum,
				pageSize: paging.value.pageSize,
			})
			.then((res) => {
				projectList.value = sortProjectList(res.data.recordList); // 使用排序方法
				paging.value.total = res.data.total;
			})
			.catch((err) => {
				ElMessage.error({
					message: '获取项目列表失败:' + err.msg,
					duration: 3000,
				});
			});
	} catch (err) {
		ElMessage.error({
			message: '获取项目列表出错，请稍后重试',
			duration: 3000,
		});
	} finally {
		loading.value = false;
	}
};

const goSetting = (row) => {
	router.push({
		name: 'school-settings-mge',
	});
};
// 项目状态S
//#region
const getStatusText = (status) => {
	switch (status) {
		case -2:
			return '校级评审阶段';
		case -1:
			return '院级评审阶段';
		case 0:
			return '未评审';
		case 1:
			return '院级评审打回';
		case 2:
			return '已推荐校级';
		case 3:
			return '校级评审打回';
		case 4:
			return '已推荐省级';
		case 5:
			return '已推荐国家级';
		case 6:
			return '院级';
		case 7:
			return '校级';
		case 8:
			return '省级';
		case 9:
			return '国家级';
		case 10:
			return '申请截止未开始评审';
		default:
			return '未知状态';
	}
};

// 获取状态样式
const getStatusStyle = (status) => {
	switch (status) {
		case -2:
			return { color: '#409EFF' }; // 蓝色 (保留)
		case -1:
			return { color: '#67C23A' }; // 绿色 (保留)
		case 0:
			return { color: '#909399' }; // 灰色 (保留)
		case 1:
			return { color: '#F56C6C' }; // 红色 (保留)
		case 2:
			return { color: '#E6A23C' }; // 橙色 (保留)
		case 3:
			return { color: '#DC143C' }; // 深红 (原红色调整)
		case 4:
			return { color: '#FF8C00' }; // 深橙 (原橙色调整)
		case 5:
			return { color: '#DAA520' }; // 金色 (新增)
		case 6:
			return { color: '#20B2AA' }; // 浅青 (原绿色调整)
		case 7:
			return { color: '#8A2BE2' }; // 蓝紫 (原蓝色调整)
		case 8:
			return { color: '#9ACD32' }; // 黄绿 (新增)
		case 9:
			return { color: '#FF1493' }; // 深粉 (新增)
		case 10:
			return { color: '#A9A9A9' }; // 深灰 (原灰色调整)
		default:
			return { color: '#909399' }; // 灰色
	}
};
//#endregion
// 项目状态E

// 信息提示
/**
 * 推荐的消息提示
 * @param {Object} row - 项目行数据
 */
const popupRmdElMessage = (row) => {
	const isReviewSchool = !!row.schoolScores.find(
		(item) => item.reviewType === 1,
	);
	if (!isReviewSchool) {
		ElMessage({
			message: '还未校级评分',
			type: 'warning',
			duration: 1500,
			showClose: true,
		});
	}
};
/**
 * 打回的消息提示
 * @param {Object} row - 项目行数据
 */
const popupBackElMessage = (row) => {
	const canBack = [2, 3].includes(row.projectVersion?.reviewStatus);
	if (!canBack) {
		ElMessage({
			message: '过了打回阶段',
			type: 'warning',
			duration: 1000,
			showClose: true,
		});
	}
};
</script>

<template>
	<div class="project-table-mge">
		<el-row
			:gutter="10"
			style="padding-bottom: 10px"
			justify="space-between"
			align="middle"
		>
			<el-col
				:span="18"
				class="header-tools"
				style="display: flex; justify-content: flex-start"
			>
				<el-input
					v-model="searchKeyword"
					placeholder="输入项目名称搜索"
					clearable
					style="width: 240px; margin-right: 15px"
					@keyup.enter="handleSearch"
				>
					<template #prefix>
						<el-icon><search></search></el-icon>
					</template>
				</el-input>
				<el-button type="primary">导出</el-button>
			</el-col>

			<el-col :span="6" style="display: flex; justify-content: flex-end">
				<el-button type="primary" @click="goSetting">设置</el-button>
			</el-col>
		</el-row>
		<el-table
			v-loading="loading"
			:data="projectList"
			border
			style="width: 100%"
			:height="tableHeight"
		>
			<el-table-column
				prop="projectDetail.projectName"
				label="项目名称"
				:min-width="180"
			/>
			<el-table-column
				prop="projectVersion.reviewStatus"
				label="项目状态"
				:min-width="180"
				align="center"
			>
				<template #default="scope">
					<el-button
						link
						:style="getStatusStyle(scope.row.projectVersion.reviewStatus)"
					>
						{{ getStatusText(scope.row.projectVersion.reviewStatus) }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column
				prop="projectDetail.projectType"
				label="项目类型"
				:min-width="120"
				align="center"
			/>
			<el-table-column
				prop="projectDetail.projectCategory"
				label="项目类别"
				:min-width="120"
				align="center"
			>
				<template #default="scope">
					<div
						:style="
							scope.row.projectDetail?.projectCategory === '创新训练项目'
								? 'color: #95d475'
								: scope.row.projectDetail?.projectCategory === '创业训练项目' ||
									  scope.row.projectDetail?.projectCategory === '创业实践项目'
									? 'color: #eebe77'
									: 'color: #f56c6c'
						"
					>
						{{ scope.row.projectDetail.projectCategory }}
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="projectDetail.projectLevel"
				label="项目级别"
				:min-width="120"
				align="center"
			/>
			<el-table-column
				prop="projectAdvisor.name"
				label="第一导师"
				:min-width="120"
				align="center"
			/>
			<el-table-column
				prop="projectDetail.dutyName"
				label="负责人姓名"
				:min-width="120"
				align="center"
			/>
			<el-table-column
				prop="projectDetail.dutyCollege"
				label="负责人学院"
				:min-width="180"
				align="center"
			/>
			<el-table-column
				prop="projectDetail.sourceName"
				label="项目来源"
				:min-width="150"
			/>
			<el-table-column
				prop="projectDetail.approvalTime"
				label="批准时间"
				:min-width="150"
				align="center"
			>
				<template #default="scope">
					{{ formateTime(scope.row.projectDetail?.approvalTime) }}
				</template>
			</el-table-column>
			<el-table-column
				prop="collegeAverageScore"
				label="院级评分"
				:min-width="150"
				align="center"
			>
				<template #default="scope">
					<div style="color: #f56c6c">
						{{
							scope.row.schoolScores?.find((item) => item.reviewType === 0)
								?.reviewScore || '待评分'
						}}
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="schoolScores"
				label="校级评分"
				:min-width="150"
				align="center"
			>
				<template #default="scope">
					<div style="color: #f56c6c">
						{{
							scope.row.schoolScores?.find((item) => item.reviewType === 1)
								?.reviewScore || '待评分'
						}}
					</div>
				</template>
			</el-table-column>

			<el-table-column
				label="操作"
				:min-width="260"
				fixed="right"
				align="center"
				prop="schoolAverageScore"
			>
				<template #default="scope">
					<el-button type="primary" text @click="handleView(scope.row)">
						详情
					</el-button>
					<!-- 校级状态：2，3，4，7 -->
					<!-- 只有2，3状态才允许打回 -->
					<el-switch
						:model-value="scope.row.projectVersion?.reviewStatus === 3"
						:disabled="![2, 3].includes(scope.row.projectVersion?.reviewStatus)"
						active-text="打回"
						style="
							--el-switch-off-color: #dcdfe6;
							--el-switch-on-color: #ff4949;
							--el-color-primary: #ff4949;
						"
						@click="popupBackElMessage(scope.row)"
						@update:model-value="
							(val) => {
								scope.row.projectVersion = scope.row.projectVersion || {};
								scope.row.projectVersion.reviewStatus = val ? 3 : 2;
								handleStatusParams(scope.row);
							}
						"
					/>
					&nbsp;&nbsp;
					<!-- 只有4，7状态才允许打回 -->
					<el-switch
						:model-value="scope.row.projectVersion?.reviewStatus === 4"
						active-text="推荐"
						:disabled="![4, 7].includes(scope.row.projectVersion?.reviewStatus)"
						style="
							--el-switch-off-color: #dcdfe6;
							--el-switch-on-color: #13ce66;
							--el-color-primary: #13ce66;
						"
						@click="popupRmdElMessage(scope.row)"
						@update:model-value="
							(val) => {
								scope.row.projectVersion = scope.row.projectVersion || {};
								scope.row.projectVersion.reviewStatus = val ? 4 : 7;
								handleStatusParams(scope.row);
							}
						"
					/>
				</template>
			</el-table-column>
			<!-- 可以根据需要添加更多列 -->
		</el-table>
		<el-row :gutter="10" justify="center" style="padding-top: 10px">
			<el-pagination
				:current-page="paging.pageNum"
				:page-size="paging.pageSize"
				:total="paging.total"
				layout="total, prev, pager, next, jumper"
				class="pagination"
				@current-change="handlePageChange"
			/>
		</el-row>
	</div>
</template>

<style scoped>
.header-tools {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
