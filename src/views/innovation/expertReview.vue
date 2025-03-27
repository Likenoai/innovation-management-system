<script setup>
/*
 * @pageInfo: 专家盲审项目
 */
import { ref, computed, onMounted } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import VuePdfEmbed from 'vue-pdf-embed';
import { useDynamicHeight } from '@/utils/index.js';
import { generateProjectData } from '@/utils/mock/exoertsAssignMock.js';
import * as contestApi from '@/api/contestApi.js';
import { useMyLoginStore } from '@/stores/myLoginStore.js';
import { getDataByKeyApi } from '../../api/staticApi';
// 基础数据S
const myLoginStore = useMyLoginStore();
const college = myLoginStore.userInfo.college;
const projects = ref();
projects.value = generateProjectData(30);
const maxHeight = useDynamicHeight(160);
const projectParams = ref({
	pagnNum: 1,
	pageSize: 10,
	type: '0',
	status: '', //0为打分 1已打分
});
projectParams.value.college = myLoginStore.userInfo.college;
const pageTotal = ref(0);

import { withFirstCall } from '@/utils/index.js';
// 获取待评分项目列表
const getProjectList = withFirstCall(async (isFirstCall) => {
	try {
		const [res1, res2] = await Promise.all([
			contestApi.getPendingScoreApi({
				...projectParams.value,
				status: '0',
			}),
			contestApi.getPendingScoreApi({
				...projectParams.value,
				status: '1',
			}),
		]);

		// 处理未打分项目
		const unScored = (res1.data?.recordList || []).map((item) => ({
			...item,
			isScore: false, // status=0 的未打分
		}));

		// 处理已打分项目
		const scored = (res2.data?.recordList || []).map((item) => ({
			...item,
			isScore: true, // status=1 的已打分
		}));

		projects.value = [...unScored, ...scored];
		pageTotal.value = (res1.data?.total || 0) + (res2.data?.total || 0);
		if (isFirstCall) currentItem.value = projects.value[0].id;
	} catch (error) {
		ElMessage.error('获取项目列表失败' + error);
	}
});
const handlePageChange = (num) => {
	projectParams.value.pagnNum = num;
	getProjectList();
};
const collegeEndTime = ref();
const getCollegeEndTime = async () => {
	getDataByKeyApi('all_college_end_time').then((res) => {
		collegeEndTime.value = res.data;
	});
};
onMounted(() => {
	getProjectList();
	getCollegeEndTime();
});
// 基础数据E

// pdf文件S
import igpath from '@/assets/基于改进CBAM注意力机制风扇异常状况的识别.pdf';
const currentItem = ref(0);
const currentItemPdf = ref(igpath);
function changeItem(row) {
	if (currentItem.value === row.id) {
		return;
	}
	clearParam();

	currentItem.value = row.id;
	getProjectDetail(currentItem.value);
	projects.value.forEach((item) => {
		if (item.id === currentItem.value) {
			currentItemPdf.value = item.attachment;
			return;
		}
	});
}
// 根据id获取项目的详情
const getProjectDetail = async (id) => {
	const res = await contestApi.getScoreByDetailIdApi({ detailId: id });
	if (res.data && res.data.length > 0) {
		criteria.value = res.data[0].reviewDetail
			? JSON.parse(res.data[0].reviewDetail)
			: [
					{ name: '文本规范', options: [2, 4, 5], selected: null },
					{ name: '逻辑清晰', options: [2, 4, 5], selected: null },
					{ name: '组织完善', options: [2, 4, 5], selected: null },
					{ name: '实践合理', options: [2, 4, 5], selected: null },
					{ name: '社会价值', options: [2, 4, 6], selected: null },
					{ name: '前景广阔', options: [2, 4, 6], selected: null },
					{ name: '创新意义', options: [2, 4, 6, 8], selected: null },
				];
		remark.value = res.data[0].reviewDescribe || '';
	} else {
		criteria.value = [
			{ name: '文本规范', options: [2, 4, 5], selected: null },
			{ name: '逻辑清晰', options: [2, 4, 5], selected: null },
			{ name: '组织完善', options: [2, 4, 5], selected: null },
			{ name: '实践合理', options: [2, 4, 5], selected: null },
			{ name: '社会价值', options: [2, 4, 6], selected: null },
			{ name: '前景广阔', options: [2, 4, 6], selected: null },
			{ name: '创新意义', options: [2, 4, 6, 8], selected: null },
		];
		remark.value = '';
	}
	console.log('res:', res);
};

import TableIntefrals from '../../components/innovation/TableIntefrals.vue';
import { ElMessage } from 'element-plus';
// **评分数据（由父组件管理）**
const baseScore = ref(60);
const criteria = ref([
	{ name: '文本规范', options: [2, 4, 5], selected: null },
	{ name: '逻辑清晰', options: [2, 4, 5], selected: null },
	{ name: '组织完善', options: [2, 4, 5], selected: null },
	{ name: '实践合理', options: [2, 4, 5], selected: null },
	{ name: '社会价值', options: [2, 4, 6], selected: null },
	{ name: '前景广阔', options: [2, 4, 6], selected: null },
	{ name: '创新意义', options: [2, 4, 6, 8], selected: null },
]);
const clearParam = () => {
	criteria.value.forEach((item) => (item.selected = null));
	remark.value = '';
};
// **存储最终的总分**
const finalScore = ref(0);
const remark = ref('');
const giveScore = async () => {
	const param = projects.value.find((item) => item.id === currentItem.value);
	await contestApi
		.giveScoreApi({
			detailId: param.id,
			projectId: param.projectId,
			reviewType: '0', //打分类型院 0--院级打分  1--校级打分
			reviewScore: finalScore.value,
			reviewDetail: JSON.stringify(criteria.value),
			reviewDescribe: remark.value,
		})
		.then(() => {
			ElMessage.success('打分成功');
			getProjectList();
		});
};

// 返回首页S
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => {
	router.push('/home');
};
</script>

<template>
	<div class="expert-review-container">
		<el-row :gutter="10">
			<el-col :span="12">
				<h1 class="expert-review-title">专家盲审项目</h1>
			</el-col>
			<el-col :span="6" align="end">评审结束时间：{{ collegeEndTime }}</el-col>
			<el-col :span="6" align="end">
				<el-button type="primary" @click="goHome">返回首页</el-button>
			</el-col>
		</el-row>

		<el-row :gutter="40" class="custom-row">
			<el-col :span="4">
				<el-table
					:data="projects"
					style="min-width: 200px; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2)"
					:height="maxHeight"
					:row-class-name="getRowClass"
					@cell-click="changeItem"
				>
					<el-table-column prop="projectName" label="项目名称" min-width="100">
						<template #default="scope">
							<div style="text-wrap: nowrap">
								<el-icon
									v-show="currentItem === scope.row.id"
									style="color: green"
								>
									<DArrowRight />
								</el-icon>
								&nbsp;
								<el-icon v-show="scope.row.isScore" style="color: green">
									<SuccessFilled />
								</el-icon>
								<el-icon v-show="!scope.row.isScore" style="color: red">
									<CircleCloseFilled />
								</el-icon>
								&nbsp;
								<span>{{ scope.row.projectName }}</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					style="margin-top: 10px"
					:total="pageTotal"
					:current-page="projectParams.pagnNum"
					:page-size="projectParams.pageSize"
					@current-change="handlePageChange"
				/>
			</el-col>
			<el-col :span="15">
				<div class="image-container" :style="{ height: maxHeight }">
					<div style="width: 200px; overflow: hidden">
						{{ currentItemPdf }}
					</div>

					<VuePdfEmbed :source="currentItemPdf" />
				</div>
			</el-col>
			<el-col :span="5">
				<el-row :gutter="10">
					<TableIntefrals
						:criteria="criteria"
						:base-score="baseScore"
						@update:criteria="criteria = $event"
						@update:total-score="finalScore = $event"
					/>
				</el-row>
				<el-row :gutter="10">
					<el-input
						v-model="remark"
						:rows="10"
						type="textarea"
						placeholder="输入项目评阅建议"
					/>
					<div class="button-container">
						<el-button type="success" @click="giveScore()">
							保存评阅结果
						</el-button>
					</div>
				</el-row>
			</el-col>
		</el-row>

		<footer></footer>
	</div>
</template>

<style scoped lang="less">
.expert-review-container {
	height: 100%;
	width: 100%;
	padding: 20px;
	background-color: #e6f4ea;
	.expert-review-title {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 20px;
	}
	.custom-row {
		margin-bottom: 20px;
	}

	.image-container {
		width: 100%; /* 限定外容器宽度为100% */
		overflow-y: auto; /* 允许超出部分滚动 */
		// box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
		.vue-pdf-embed {
			width: 98%;
		}
	}
	.button-container {
		padding: 20px;
		width: 100%;
		display: flex;
		justify-content: space-evenly;
	}
}

::v-deep .current-item {
	background-color: #e0f7fa; /* 当前项的背景色 */
	font-weight: bold; /* 当前项加粗 */
}

::v-deep .approved {
	background-color: #dff0d8; /* 审核通过的背景色 */
	color: #3c763d; /* 审核通过的文字颜色 */
}

::v-deep .rejected {
	background-color: #f2dede; /* 不通过的背景色 */
	color: #a94442; /* 不通过的文字颜色 */
}
/* 去除表格的焦点效果 */
::v-deep .el-table {
	outline: none;
}
</style>
