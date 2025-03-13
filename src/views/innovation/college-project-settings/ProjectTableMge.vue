<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as contestApi from '@/api/contestApi.js'; // 确保路径正确
import { ElMessage, progressProps } from 'element-plus';
import { generateProjectData } from '@/utils/mock/exoertsAssignMock.js';
import { useDynamicHeight } from '@/utils/tableUtils.js';
import { Search } from '@element-plus/icons-vue';
// 在脚本部分顶部引入工具函数
import { formateTime } from '@/utils/dateUtils';
const router = useRouter();
const loading = ref(false);
const projectList = ref([]);
let tableHeight = useDynamicHeight(260);
let paging = ref({
	pageNum: 1,
	pageSize: 10,
	total: 0,
});
const goToUploadProject = () => {
	router.push({ name: 'UploadInnovation' });
};
const currentCollege = ref('计算机与信息学院'); // 新增的当前学院变量
const searchKeyword = ref('');
const selectedTimeRange = ref([]);

const handleSearch = () => {
	paging.value.pageNum = 1; // 重置为第一页
	getCollegeProjectList();
};

const handleTimeChange = () => {
	paging.value.pageNum = 1; // 重置为第一页
	getCollegeProjectList();
};

// 在模拟数据部分也添加排序
onMounted(() => {
	getCollegeProjectList();
	// projectList.value = generateProjectData(30).sort((a, b) => {
	// 	const orderA = a.projectVersion?.reviewOrder ?? Infinity;
	// 	const orderB = b.projectVersion?.reviewOrder ?? Infinity;
	// 	return orderA - orderB;
	// });
});
const handleView = (project) => {
	console.log('project:', project);
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
	getCollegeProjectList();
};

let statusParams = ref({
	projectId: '',
	detailId: '',
	reviewStatus: '',
});
let orderParams = ref({
	projectId: '',
	detailId: '',
	reviewOrder: '',
	reviewStatus: '',
});
const handleStatusParams = (row) => {
	console.log('row:', row);
	statusParams.value = {
		projectId: row.projectVersion.projectId,
		detailId: row.projectVersion.detailId,
		reviewStatus: row.projectVersion.reviewStatus,
	};
	handleStatusOrder(false);
};
const handleOrderParams = (row) => {
	console.log(row);
	orderParams.value = {
		projectId: row.projectVersion.projectId,
		detailId: row.projectVersion.detailId,
		reviewStatus: row.projectVersion.reviewStatus,
		reviewOrder: row.projectVersion.reviewOrder,
	};
	// 新增排序交换逻辑
	const oldOrder = row.projectVersion._originalOrder; // 保存原始排序值
	console.log('oldOrder:', oldOrder);
	handleStatusOrder(true).then(() => {
		// 在接口调用成功后，查找需要交换的条目
		const swapItem = projectList.value.find(
			(item) =>
				item.projectVersion?.reviewOrder !== null && // 新增非空判断
				item.projectVersion?.reviewOrder !== Infinity && // 新增非无穷判断
				item.projectVersion?.reviewOrder ===
					orderParams.value.reviewOrder &&
				item.projectVersion.detailId !== orderParams.value.detailId
		);
		console.log('swapItem', swapItem);
		if (swapItem) {
			swapItem.projectVersion.reviewOrder = oldOrder;
			contestApi.review({
				projectId: swapItem.projectVersion.projectId,
				detailId: swapItem.projectVersion.detailId,
				reviewStatus: swapItem.projectVersion.reviewStatus,
				reviewOrder: oldOrder,
			});
			projectList.value = sortProjectList(projectList.value);
		}
	});
};

const handleStatusOrder = async (type = true) => {
	try {
		if (type) {
			await contestApi.review(orderParams.value);
			await getCollegeProjectList();
		} else {
			await contestApi.review(statusParams.value);
		}
		// 新增自动刷新列表
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

const getCollegeProjectList = async () => {
	loading.value = true;
	try {
		await contestApi
			.getProjectsByCollege({
				college: currentCollege.value,
				pageNum: paging.value.pageNum,
				pageSize: paging.value.pageSize,
				keyword: searchKeyword.value, // 新增搜索参数
				startTime: selectedTimeRange.value?.[0], // 开始时间
				endTime: selectedTimeRange.value?.[1], // 结束时间
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

const goSetting = (row) => {
	router.push({
		name: 'settings-mges',
	});
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
						<el-icon><search /></el-icon>
					</template>
				</el-input>
				<el-button type="primary">导出</el-button>
				<!-- <el-date-picker
					v-model="selectedTimeRange"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="YYYY-MM-DD"
					@change="handleTimeChange"
				/> -->
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
							scope.row.projectDetail?.projectCategory ===
							'创新训练项目'
								? 'color: #95d475'
								: scope.row.projectDetail?.projectCategory ===
										'创业训练项目' ||
								  scope.row.projectDetail?.projectCategory ===
										'创业实践项目'
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
				><template #default="scope">
					<div style="color: #f56c6c">
						{{ scope.row.collegeAverageScore || '待评分' }}
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="projectVersion.reviewOrder"
				label="排序"
				:min-width="180"
				fixed="right"
				align="center"
			>
				<template #default="scope">
					<el-input-number
						v-model="scope.row.projectVersion.reviewOrder"
						:min="1"
						:max="paging.total"
						@change="
							(val) => {
								console.log(val);
								scope.row.projectVersion.reviewOrder = val;
								handleOrderParams(scope.row);
							}
						"
					></el-input-number>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				:min-width="300"
				fixed="right"
				align="center"
				prop="collegeAverageScore"
			>
				<template #default="scope">
					<el-button
						type="primary"
						text
						@click="handleView(scope.row)"
					>
						详情
					</el-button>
					<el-switch
						:model-value="
							scope.row.projectVersion?.reviewStatus === 1
						"
						@update:model-value="
							(val) => {
								scope.row.projectVersion =
									scope.row.projectVersion || {};
								scope.row.projectVersion.reviewStatus = val
									? 1
									: 6;
								handleStatusParams(scope.row);
							}
						"
						:disabled="
							![0, 1, 6].includes(
								scope.row.projectVersion?.reviewStatus
							)
						"
						active-text="打回"
						style="
							--el-switch-off-color: #dcdfe6;
							--el-switch-on-color: #ff4949;
							--el-color-primary: #ff4949;
						"
					></el-switch>
					&nbsp;&nbsp;
					<el-switch
						:model-value="
							scope.row.projectVersion?.reviewStatus === 2
						"
						@update:model-value="
							(val) => {
								scope.row.projectVersion =
									scope.row.projectVersion || {};
								scope.row.projectVersion.reviewStatus = val
									? 2
									: 6;
								handleStatusParams(scope.row);
							}
						"
						active-text="推荐"
						style="
							--el-switch-off-color: #dcdfe6;
							--el-switch-on-color: #13ce66;
							--el-color-primary: #13ce66;
						"
					></el-switch>
				</template>
			</el-table-column>
			<!-- 可以根据需要添加更多列 -->
		</el-table>
		<el-row :gutter="10" justify="center" style="padding-top: 10px">
			<el-pagination
				:current-page="paging.pageNum"
				:page-size="paging.pageSize"
				:total="paging.total"
				@current-change="handlePageChange"
				layout="total, prev, pager, next, jumper"
				class="pagination"
			></el-pagination>
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
