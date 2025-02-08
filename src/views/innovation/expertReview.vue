<script setup>
import { ref, computed } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import VuePdfEmbed from 'vue-pdf-embed';

// 模拟生成20条项目数据
const projects = ref(
	Array.from({ length: 20 }, (_, index) => ({
		id: `${index}`,
		batch: `批次 ${index + 1}`, // 批次时间
		projectName: `项目名称 ${index + 1}`, // 项目名称
		projectLevel: `级别 ${
			index % 3 === 0 ? '校级' : index % 3 === 1 ? '省级' : '国家级'
		}`, // 项目级别
		projectType: `类型 ${index % 2 === 0 ? '类型A' : '类型B'}`, // 项目类型
		projectCategory: `类别 ${index % 4}`, // 项目类别
		primaryDiscipline: `学科 ${index % 5}`, // 所属学科
		state: 0, // 0 没有评审 1 通过评审 2 未通过评审
	}))
);

const maxHeight = computed(() => {
	const height = window.innerHeight;
	return height - 260 + 'px';
});
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
	let state = val.row.state;
	if (currentItem.value == val.row.id) {
		return 'current-item'; // 当前项样式
	} else if (state == '1') {
		return 'approved'; // 审核通过样式
	} else if (state == '2') {
		return 'rejected'; // 不通过样式
	}
	return ''; // 默认样式
};
</script>

<template>
	<div class="expert-review-container">
		<h1 class="expert-review-title">专家盲审项目</h1>
		<div class="main-container">
			<el-table
				:data="projects"
				style="width: 200px; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2)"
				:max-height="maxHeight"
				@cell-click="changeItem"
				:row-class-name="getRowClass"
				:key="tableKey"
			>
				<el-table-column
					prop="projectName"
					label="项目名称"
					width="200"
				/>
			</el-table>
			<div class="image-container" :style="{ height: maxHeight }">
				<VuePdfEmbed ref="pdfRef" :source="igpath"> </VuePdfEmbed>
			</div>
		</div>
		<footer>
			<div class="button-container">
				<el-button type="success" plain @click="handleAudits(1)"
					>通过</el-button
				>
				<el-button type="danger" plain @click="handleAudits(2)"
					>驳回</el-button
				>
			</div>
		</footer>
	</div>
</template>

<style scoped lang="less">
.expert-review-container {
	padding: 20px;
}

.expert-review-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
}

.el-table {
	margin-top: 20px;
}

.main-container {
	display: flex; /* 使用flex布局 */
	justify-content: space-around;
}
.image-container {
	width: 75%; /* 限定外容器宽度为100% */
	margin-top: 20px;
	overflow-y: auto; /* 允许超出部分滚动 */
	box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
	.vue-pdf-embed {
		width: 98%;
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
footer {
	display: flex;
	justify-content: end;
	padding: 20px;
	.button-container {
		width: 75%;
		display: flex;
		justify-content: space-evenly;
	}
}
/* 去除表格的焦点效果 */
::v-deep .el-table {
	outline: none;
}
</style>
