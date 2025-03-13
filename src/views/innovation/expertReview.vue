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
// 基础数据S
const myLoginStore = useMyLoginStore();
const projects = ref();
projects.value = generateProjectData(30);
const maxHeight = useDynamicHeight(200);
const projectParams = ref({
	pagnNum: 1,
	pageSize: 10,
	college: '',
});
projectParams.value.college = myLoginStore.userInfo.college;
let pageTotal = ref(0);
const getProjectList = () => {
	console.log('projectParams:', projectParams);

	contestApi.getProjectsByCollege(projectParams.value).then((res) => {
		projects.value = res.data.recordList;
		pageTotal.value = res.data.total;
	});
};
onMounted(() => {
	getProjectList();
});
// pdf文件S
import igpath from '@/assets/基于改进CBAM注意力机制风扇异常状况的识别.pdf';
const pdfRef = ref(null); // 引用 VuePdfEmbed 组件
let currentItem = ref(0);
currentItem.value = projects.value[0].id;
let currentItemPdf = ref(igpath);
function changeItem(row) {
	currentItem.value = row.id;
	projects.value.forEach((item) => {
		if (item.id == currentItem.value) {
			pdfRef.value = item.state;
			return;
		}
	});
}

function handleAudits(selece) {
	projects.value.forEach((item) => {
		if (item.id == currentItem.value) {
			item.state = selece;
			return;
		}
	});
}

const getRowClass = (val) => {
	console.log('val:', val);
	let state = val.row.projectVersion?.reviewStatus;
	if (currentItem.value == val.row.projectDetail?.id) {
		return 'current-item'; // 当前项样式
	} else if (state == '1') {
		return 'approved'; // 审核通过样式
	} else if (state == '2') {
		return 'rejected'; // 不通过样式
	}
	return ''; // 默认样式
};
import TableIntefrals from '../../components/innovation/TableIntefrals.vue';
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

// **存储最终的总分**
const finalScore = ref(baseScore.value);
</script>

<template>
	<div class="expert-review-container">
		<h1 class="expert-review-title">专家盲审项目</h1>
		<el-row :gutter="40" class="custom-row">
			<el-col :span="6"
				><el-table
					:data="projects"
					style="
						min-width: 200px;
						box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
					"
					:max-height="maxHeight"
					@cell-click="changeItem"
					:row-class-name="getRowClass"
					:key="tableKey"
				>
					<el-table-column
						prop="projectDetail.projectName"
						label="项目名称"
						min-width="200"
					/> </el-table
			></el-col>
			<el-col :span="18">
				<div class="image-container" :style="{ height: maxHeight }">
					<VuePdfEmbed ref="pdfRef" :source="igpath"> </VuePdfEmbed>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" class="custom-row">
			<el-col :span="12">
				<TableIntefrals
					:criteria="criteria"
					:baseScore="baseScore"
					@update:criteria="criteria = $event"
					@update:totalScore="finalScore = $event"
				></TableIntefrals
			></el-col>
			<el-col :span="12">
				<el-input
					v-model="textarea"
					:rows="10"
					type="textarea"
					placeholder="输入项目评阅建议"
				/>
				<div class="button-container">
					<el-button type="success" @click="handleAudits(1)"
						>保存评阅结果</el-button
					>
				</div>
			</el-col>
		</el-row>

		<footer></footer>
	</div>
</template>

<style scoped lang="less">
.expert-review-container {
	padding: 20px;
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
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
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
