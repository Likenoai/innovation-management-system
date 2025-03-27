<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useMyLoginStore } from '../../../stores/myLoginStore';
import { usePubliceStore } from '../../../stores/publiceStore';
import { useDynamicHeight } from '@/utils/tableUtils.js';
import * as staticApi from '@/api/staticApi.js';
import * as staffApi from '@/api/staffApi.js';
import * as contestApi from '@/api/contestApi.js';
// 时间管理数据

const myLoginStore = useMyLoginStore();
const publiceStore = usePubliceStore();

// 时间管理S
//#region
// #region 院级评审截至时间

const college = myLoginStore.userInfo.college;
const codeKeyCollegeEnd = 'all_college_end_time';
const collegeEndTime = ref('');

/**
 * 获取院级评审截止时间
 */
const getCollegeEndTime = async () => {
	const response = await staticApi.getDataByKeyApi(codeKeyCollegeEnd);
	collegeEndTime.value = response.data;
	return response;
};

onMounted(() => {
	getCollegeEndTime();
});

/**
 * 修改院级评审截止时间
 */
const updateCollegeEndTime = async () => {
	await staticApi.updateDataApi(
		{
			codeKey: codeKeyCollegeEnd,
			codeValue: collegeEndTime.value,
		},
		{
			successMsg: '院级评审截止时间修改成功',
		},
	);
};
// #endregion

//	#region 校级评审开始and结束时间
const codeKeySchoolStart = 'school_review_start_time';
const codeKeySchoolEnd = 'school_review_end_time';
const schoolStartTime = ref('');
const schoolEndTime = ref('');
/**
 * 获取校级评审开始时间和结束时间
 */
const getShooolTime = async () => {
	// 使用 Promise.all 并行请求
	const [schoolStartTimeRes, schoolEndTimeRes] = await Promise.all([
		staticApi.getDataByKeyApi(codeKeySchoolStart),
		staticApi.getDataByKeyApi(codeKeySchoolEnd),
	]);
	schoolStartTime.value = schoolStartTimeRes.data;
	schoolEndTime.value = schoolEndTimeRes.data;
};
onMounted(() => {
	getShooolTime();
});

/**
 * 更新校级评审时间配置
 * @async
 * @param {'start' | 'end'} type - 时间类型：'start'更新开始时间，其他值更新结束时间
 * @throws {Error} 当API调用失败时抛出错误
 * @example
 * // 更新开始时间
 * await updateSchoolTime('start')
 * // 更新结束时间
 * await updateSchoolTime('end')
 */
const updateSchoolTime = async (type) => {
	if (type === 'start') {
		await staticApi.updateDataApi({
			codeKey: codeKeySchoolStart,
			codeValue: schoolStartTime.value,
		});
	} else {
		await staticApi.updateDataApi({
			codeKey: codeKeySchoolEnd,
			codeValue: schoolEndTime.value,
		});
	}
};
//	#endregion 校级评审开始时间

//#endregion
// 时间管理 E

//#region 学院项目数量管理S
const collegeProjectNum = ref([]); // 存储学院项目数量数据
const getCollegeProjectNum = () => {
	staticApi.getCollegeProjectNumApi().then((item) => {
		collegeProjectNum.value = item.data;
	});
};
onMounted(() => {
	getCollegeProjectNum();
});
/**
 * 处理项目数量变化
 * @param {Object} item - 项目数量项
 */
const handleNumberChange = (() => {
	let timer = null;
	let lastItem = null;

	return async (item) => {
		// 保存最新修改项
		lastItem = { ...item };

		// 清除之前的定时器
		if (timer) clearTimeout(timer);

		// 设置新的防抖定时器（500ms）
		timer = setTimeout(async () => {
			await initStatic({
				codeKey: 'project_num' + lastItem.college,
				codeValue: lastItem.number,
			});
			await staticApi
				.updateDataApi(
					{
						codeKey: 'project_num' + lastItem.college,
						codeValue: lastItem.number,
					},
					{
						successMsg: `${lastItem.college}最大项目数量修改成功`,
					},
				)
				.finally(async () => {
					await getCollegeProjectNum();
					timer = null;
				});
		}, 500);
	};
})();
const tableHeightCollegeProject = useDynamicHeight(340);

//#endregion

// 评审专家管理 S
//#region
// 处理分页
const expertPaging = ref({
	pageNum: 1,
	pageSize: 10,
	total: 0,
});
const experts = ref([]); // 存储所有专家
const reviewExperts = ref([]); // 存储评审专家
const getExperts = async () => {
	await staffApi.getSchoolExpertsApi().then((item) => {
		experts.value = item.data;
	});
};
//#endregion
/**
 * 处理分页变化
 * @param {number} page - 当前页码
 */

onMounted(() => {
	getExperts();
});

const assignToExpertScore = async (row) => {
	const res = await contestApi.assignToExpertScoreApi({
		personnelCode: row.personnelCode,
		isCancel: row.isCancel,
	});
	if (res.code === 500) {
		ElMessage.error(res.msg);
		row.isCancel = !row.isCancel;
	}
};

import { withFirstCall } from '@/utils/index.js';
const reviewProject = ref([]);
// 学院管理员获取院级/校级 打分/未打分的项目集合
const getScoreProject = withFirstCall(async (isFirstCall) => {
	staticApi.updateDataApi(
		{
			codeKey: 'allot' + college,
			codeValue: '1',
		},
		{
			successMsg: null,
		},
	);
	const res1 = await contestApi.getScoreProjectsByCollegeApi({
		type: '0', // 0 院级 1 校级
		status: '1', // 0 未打分 1 已打分
		college: college,
	});
	const res2 = await contestApi.getScoreProjectsByCollegeApi({
		type: '0', // 0 院级 1 校级
		status: '0', // 0 未打分 1 已打分
		college: college,
	});
	const res1Data = res1.data.recordList || [];
	const res = res1Data.concat(res2.data.recordList);
	reviewProject.value = res;
	if (isAllot.value) {
		if (!isFirstCall) ElMessage.success('已分配');
		return;
	} else {
		ElMessage.success('分配成功');
	}
});
// 单元格合并
const handleSpan = ({ columnIndex, rowIndex }) => {
	// 只处理第二列
	if (columnIndex === 1) {
		// 首行合并所有行
		if (rowIndex === 0) {
			return {
				rowspan: reviewExperts.value.length,
				colspan: 1,
			};
		}
		// 其他行隐藏
		return { rowspan: 0, colspan: 0 };
	}
	// 其他列保持正常
	return { rowspan: 1, colspan: 1 };
};

const tableHeight = useDynamicHeight(360);
const isAllot = ref(true);
// 除了是否分配
const getAllot = async () => {
	const key = 'allot' + college;
	await staticApi.getDataByKeyApi(key).then((res) => {
		switch (res.data) {
			case null:
				staticApi
					.addDataApi({
						codeName: `${college}院级是否分配的标识`,
						codeKey: key,
						codeValue: '0',
						codeDesc: `${college}院级是否分配的标识`,
					})
					.then(() => {
						getAllot();
					});
				break;
			case '0':
				isAllot.value = false;
				break;
			case '1':
				isAllot.value = true;
				getScoreProject();
				break;
		}
	});
};
onMounted(() => {
	getAllot();
});
import { useRouter } from 'vue-router';
const router = useRouter();
// 路由跳转
const goProjectTableMgs = () => {
	router.push({
		name: 'school-project-table-Mge',
	});
};

// 学院项目管理S
//#region
import { initStatic } from '../../../utils/staticUtils';

const projectCount = ref(0); // 项目数量
const selectedCollege = ref(''); // 选中的学院
const allCollege = reactive(publiceStore.allCollege); // 所有学院
const projectNumCodeKey = computed(() => 'project_num' + selectedCollege.value);

// 监听 selectedCollege 变化
watch(selectedCollege, async (newVal) => {
	if (newVal) {
		const res = await staticApi.getDataByKeyApi(projectNumCodeKey.value);
		projectCount.value = res.data ? Number(res.data) : 0;
	}
});

const updateProjectCount = async () => {
	await initStatic({
		codeKey: projectNumCodeKey.value,
		codeValue: 0,
		codeName: `${selectedCollege.value}项目数量`,
	});
	await staticApi.updateDataApi(
		{
			codeKey: projectNumCodeKey.value,
			codeValue: projectCount.value,
		},
		{
			successMsg: '项目数量修改成功',
			errorMsg: '项目数量修改失败',
		},
	);
};

onMounted(() => {
	publiceStore.getAllCollege();
});
//#endregion
// 学院项目管理E

// 重点领域S
//#region
const codeKeySpecial = 'special';
const special = ref('');
//#endregion
// 重点领域E

// 校级专家权重管理 S
const codeKeyExpertWeights = 'expert_weights';
const expertWeights = ref({
	student: 30,
	internal: 50,
	external: 20,
});
const getExpertWeights = async () => {
	const res = await staticApi.getDataByKeyApi(codeKeyExpertWeights);
	expertWeights.value = {
		student: Number(res.data.split('，')[0]),
		internal: Number(res.data.split('，')[1]),
		external: Number(res.data.split('，')[2]),
	};
};
onMounted(() => {
	getExpertWeights();
});
const updateExpertWeights = async () => {
	const total =
		expertWeights.value.student +
		expertWeights.value.internal +
		expertWeights.value.external;
	if (total !== 100) {
		ElMessage.error('权重总和必须为100%');
		return;
	}

	await staticApi.updateDataApi(
		{
			codeKey: 'expert_weights',
			codeValue: `${expertWeights.value.student}，${expertWeights.value.internal}，${expertWeights.value.external}`,
		},
		{
			successMsg: '权重设置成功',
			errorMsg: '权重设置失败',
		},
	);
};
</script>

<template>
	<div class="settings-container">
		<el-card shadow="never" style="height: 100%">
			<el-tabs
				type="border-card"
				style="height: 100%"
				@tab-click="
					(tab) => {
						tab.props.label === '返回' && goProjectTableMgs();
					}
				"
			>
				<!-- 时间管理 -->
				<el-tab-pane
					label="时间管理"
					style="display: flex; justify-content: center; margin-top: 40px"
				>
					<el-form label-width="160px">
						<el-form-item label="院级评审结束时间">
							<el-date-picker
								v-model="collegeEndTime"
								type="datetime"
								placeholder="选择开始时间"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
							<el-button
								style="margin-left: 10px"
								type="primary"
								plain
								@click="updateCollegeEndTime"
							>
								确定
							</el-button>
						</el-form-item>

						<el-form-item label="校级评审开始时间">
							<el-date-picker
								v-model="schoolStartTime"
								type="datetime"
								placeholder="选择开始时间"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
							<el-button
								style="margin-left: 10px"
								type="primary"
								plain
								@click="updateSchoolTime('start')"
							>
								确定
							</el-button>
						</el-form-item>
						<el-form-item label="校级评审结束时间">
							<el-date-picker
								v-model="schoolEndTime"
								type="datetime"
								placeholder="选择结束时间"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
							<el-button
								style="margin-left: 10px"
								type="primary"
								plain
								@click="updateSchoolTime('end')"
							>
								确定
							</el-button>
						</el-form-item>
						<el-form-item label="重点领域">
							<el-col :span="12">
								<el-input v-model="special" placeholder="输入重点领域" />
							</el-col>

							<el-button
								style="margin-left: 10px"
								type="primary"
								plain
								@click="updateSchoolTime('end')"
							>
								确定
							</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="学院项目数量管理">
					<el-table
						:data="collegeProjectNum"
						:height="tableHeightCollegeProject"
						stripe
					>
						<el-table-column prop="college" label="学院" align="center" />
						<el-table-column prop="number" label="最大项目数量" align="center">
							<template #default="{ row }">
								<el-input-number
									v-model="row.number"
									@change="handleNumberChange(row)"
								/>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<!-- 专家权重管理 -->
				<el-tab-pane label="专家权重管理">
					<el-form label-width="160px">
						<el-form-item label="学生专家权重">
							<el-slider
								v-model="expertWeights.student"
								:min="0"
								:max="100"
								show-input
							/>
						</el-form-item>
						<el-form-item label="校内专家权重">
							<el-slider
								v-model="expertWeights.internal"
								:min="0"
								:max="100"
								show-input
							/>
						</el-form-item>
						<el-form-item label="校外专家权重">
							<el-slider
								v-model="expertWeights.external"
								:min="0"
								:max="100"
								show-input
							/>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="updateExpertWeights">
								保存设置
							</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<!-- 评审管理 -->
				<el-tab-pane label="评审专家管理">
					<div class="expert-management">
						<el-table :data="experts" :min-height="tableHeight" class="mt-20">
							<el-table-column prop="name" label="专家姓名" />
							<el-table-column label="评审" width="120">
								<template #default="scope">
									<el-switch
										:model-value="!scope.row.isCancel"
										style="
											--el-switch-off-color: #dcdfe6;
											--el-switch-on-color: #13ce66;
											--el-color-primary: #13ce66;
										"
										@update:model-value="
											(val) => {
												scope.row.isCancel = !val;
												assignToExpertScore(scope.row);
											}
										"
									/>
								</template>
							</el-table-column>
						</el-table>
						<!-- <el-row :gutter="10" justify="center">
							<el-pagination
								:current-page="expertPaging.pageNum"
								:page-size="expertPaging.pageSize"
								:total="expertPaging.total"
								@current-change="handlePageChange"
								layout="total, prev, pager, next, jumper"
								class="pagination"
							></el-pagination>
						</el-row> -->
					</div>
				</el-tab-pane>
				<!-- 评审项目分配 -->
				<el-tab-pane label="评审项目分配">
					<el-button
						type="primary"
						style="margin-bottom: 10px; margin-left: 20px"
						@click="getScoreProject"
					>
						自动分配
					</el-button>
					<div class="expert-management">
						<el-table
							:data="reviewExperts"
							:span-method="handleSpan"
							stripe
							:height="tableHeight"
						>
							<el-table-column prop="name" label="专家姓名" />
							<el-table-column label="评审项目">
								<template
									style="
										display: flex;
										flex-direction: column;
										justify-content: space-around;
										height: 100px;
									"
								>
									<div v-for="(item, index) in reviewProject" :key="item">
										{{ index + 1 }} {{ item.projectName }}
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-tab-pane>
				<el-tab-pane label="返回" />
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
