<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Search, Upload, Download } from '@element-plus/icons-vue';
import { fetchTableData, fetchMockData } from '@/api/competition';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import '@/Styles/index.css';
// 数据和状态
// 表格数据
const tableData = ref([
	{
		compName: '',
		awardProjName: '',
		awardLvl: '',
		stuPos: '',
		stuName: '',
		stuId: '',
		stuCollege: '',
		stuMajor: '',
		stuGrade: '',
		eduLvl: '',
		compLvl: '',
		compCate: '',
		instrName: '',
		persCode: '',
		instrPos: '',
		instrCollege: '',
		teamAward: '',
		certDate: '',
		issueDept: '',
		specialAward: '',
		isReviewed: '',
		resultUrl: '',
		instrScore: '',
	},
]);
const searchParams = ref({
	page: 1,
	pageSize: 20,
});
// 总条目数
const totalItems = ref(0);
// 加载状态
const loading = ref(false);
// 搜索查询
const searchQuery = ref('');
// 导出对话框可见性
const exportDialogVisible = ref(false);
// 导出列
const exportColumns = ref([]);
// 详情对话框可见性
const dialogVisible = ref(false);
// 选中的行数据
const selectedRow = ref(null);
// 显示提示信息
const showHint = ref(true);
// 显示关闭按钮
const showCloseButton = ref(false);
// 表格高度
const tableHeight = ref('70vh');

// 表单和选项
// 过滤表单
const filterForm = ref({
	college: '',
	type: '',
	dateRange: '',
	keyword: '',
	awardLvl: '',
	awardProjName: '',
	certDate: '',
	compLvl: '',
	compName: '',
	eduLvl: '',
	importTime: '',
	instrCollege: '',
	instrName: '',
	instrScore: '',
	issueDept: '',
	persCode: '',
	resultUrl: '',
	specialAward: '',
	stuCollege: '',
	stuCredits: '',
	stuGrade: '',
	stuId: '',
	stuMajor: '',
	stuName: '',
	teamAward: '',
});

// 竞赛类型选项
const competitionTypes = ref([
	{ value: '创新创业类', label: '创新创业类' },
	{ value: '科技创新类', label: '科技创新类' },
	{ value: '学科竞赛', label: '学科竞赛' },
	{ value: '工程技术类', label: '工程技术类' },
	{ value: '人文艺术类', label: '人文艺术类' },
]);

// 学院选项
const colleges = ref([
	{ value: 'computer', label: '计算机与软件学院' },
	{ value: 'electronic', label: '电子信息学院' },
	{ value: 'mechanical', label: '机械工程学院' },
	{ value: 'management', label: '管理学院' },
	{ value: 'economics', label: '经济学院' },
	{ value: 'science', label: '理学院' },
	{ value: 'literature', label: '文学院' },
	{ value: 'art', label: '艺术学院' },
	{ value: 'foreign', label: '外国语学院' },
]);

// 根据竞赛类型过滤学院
const filteredColleges = computed(() => {
	if (!filterForm.value.type) return colleges.value;

	const typeCollegeMap = {
		创新创业类: ['management', 'economics', 'computer'],
		科技创新类: ['computer', 'electronic', 'mechanical', 'science'],
		学科竞赛: ['science', 'computer', 'management', 'literature'],
		工程技术类: ['mechanical', 'electronic', 'computer'],
		人文艺术类: ['literature', 'art', 'foreign'],
	};

	return colleges.value.filter((college) =>
		typeCollegeMap[filterForm.value.type]?.includes(college.value)
	);
});

// 生命周期钩子
onMounted(() => {
	// 加载表格数据
	loadTableData();
	// 更新表格高度
	updateTableHeight();
	// 监听窗口大小变化
	window.addEventListener('resize', updateTableHeight);
});

onUnmounted(() => {
	// 移除窗口大小变化监听
	window.removeEventListener('resize', updateTableHeight);
});

// 方法
// 加载表格数据
const loadTableData = async () => {
	try {
		loading.value = true;
		// const response = await fetchMockData(page.value, pageSize.value);
		const response = await axios.post(
			'/scgl/liGongCompetition/SelectCompetition',
			searchParams.value
		);
		// console.log('response:', response);
		tableData.value = response.data.records;
		totalItems.value = response.data.total;
	} catch (error) {
		console.error('加载数据失败:', error);
	} finally {
		loading.value = false;
	}
};

// 对表格原始数据进行格式化
const booleanFormatter = (row, column, cellValue) => {
	return cellValue ? '是' : '否';
};

// 更新表格高度
const updateTableHeight = () => {
	const windowHeight = window.innerHeight;
	const heightMap = [
		{ min: 4320, value: '90vh' },
		{ min: 2880, value: '85vh' },
		{ min: 2160, value: '80vh' },
		{ min: 1600, value: '76vh' },
		{ min: 1440, value: '75vh' },
		{ min: 1080, value: '74vh' },
		{ min: 900, value: '64vh' },
		{ min: 768, value: '62vh' },
		{ min: 720, value: '60vh' },
	];

	const matchedHeight = heightMap.find((item) => windowHeight >= item.min);
	tableHeight.value = matchedHeight ? matchedHeight.value : '60vh';
};

// 处理搜索
const handleSearch = async () => {
	// 处理搜索逻辑
	let res = await axios
		.post('/scgl/liGongCompetition/SelectCompetition', {
			...filterForm.value,
		})
		.then((item) => {
			console.log(item);
			tableData.value;
		})
		.catch((error) => {
			console.log(error);
		});
};

// 处理文件导入
const handleImport = async (file) => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await axios.post(
		'/scgl/liGongCompetition/importCompetitionMessage',
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);

	if (response.code === 200) {
		ElMessage.success('导入成功');
	} else {
		ElMessage.error(response.msg);
		downloadErrorFile(response.msg);
	}
	return false;
};

const downloadErrorFile = (errorMsg) => {
	// 创建一个Blob对象，类型为text/plain
	const blob = new Blob([errorMsg], { type: 'text/plain' });
	// 创建一个URL对象
	const url = window.URL.createObjectURL(blob);
	// 创建一个a元素
	const a = document.createElement('a');
	a.href = url;
	a.download = '导入错误信息.txt'; // 设置下载文件的名称
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	// 释放URL对象
	window.URL.revokeObjectURL(url);
};

// 显示导出对话框
const showExportDialog = () => {
	exportDialogVisible.value = true;
};

// 导出数据
const exportDataFunc = async () => {
	console.log(exportColumns.value);

	try {
		const response = await axios.get(
			'/scgl/liGongCompetition/exportCompetition',
			{
				params: {
					// columns: exportColumns.value,
				},
				responseType: 'blob',
			}
		);
		const url = window.URL.createObjectURL(new Blob([response]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', '竞赛信息.xlsx');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
		ElMessage.success('导出成功');
	} catch (error) {
		console.error('导出失败:', error);
		ElMessage.error('导出失败');
	}
};

// 显示详情
const showDetails = (row) => {
	selectedRow.value = row;
	console.log('selectedRow:', selectedRow.value);
	dialogVisible.value = true;
};

// 处理分页变化
const handlePageChange = (newPage) => {
	searchParams.value.page = newPage;
	loadTableData();
};

// 描述项和导出数据
// 描述项
const descriptionItems = [
	{ label: '竞赛名称', prop: 'compName' },
	{ label: '获奖项目名称', prop: 'awardProjName' },
	{ label: '获奖等级', prop: 'awardLvl' },
	{ label: '参赛学生位次', prop: 'stuPos' },
	{ label: '学生姓名', prop: 'stuName' },
	{ label: '学号', prop: 'stuId' },
	{ label: '学生所在学院', prop: 'stuCollege' },
	{ label: '学生专业', prop: 'stuMajor' },
	{ label: '学生年级', prop: 'stuGrade' },
	{ label: '本/专', prop: 'eduLvl' },
	{ label: '竞赛级别', prop: 'compLvl' },
	{ label: '竞赛类别', prop: 'compCate' },
	{ label: '指导教师', prop: 'instrName' },
	{ label: '人员代码', prop: 'persCode' },
	{ label: '指导位次', prop: 'instrPos' },
	{ label: '指导教师所在学院', prop: 'instrCollege' },
	{ label: '团队奖金（元）', prop: 'teamAward' },
	{ label: '证书颁发时间', prop: 'certDate' },
	{ label: '证书颁发部门', prop: 'issueDept' },
	{ label: '是否证书寄发', prop: 'specialAward' },
	{ label: '是否公示', prop: 'isReviewed' },
	{ label: '成绩公示文件', prop: 'resultUrl' },
	{ label: '证书扫描件', prop: 'instrScore' },
];

// 导出数据选项
const exportData = [
	{ value: '序号', desc: '序号' },
	{ value: '竞赛名称', desc: '竞赛名称' },
	{ value: '获奖项目名称', desc: '获奖项目名称' },
	{ value: '获奖等级', desc: '获奖等级' },
	{ value: '参赛学生位次', desc: '参赛学生位次' },
	{ value: '学生姓名', desc: '学生姓名' },
	{ value: '学号', desc: '学号' },
	{ value: '学生所在学院', desc: '学生所在学院' },
	{ value: '学生专业', desc: '学生专业' },
	{ value: '学生年级', desc: '学生年级' },
	{ value: '本/专', desc: '本/专' },
	{ value: '竞赛级别', desc: '竞赛级别' },
	{ value: '竞赛类别', desc: '竞赛类别' },
	{ value: '指导教师', desc: '指导教师' },
	{ value: '人员代码', desc: '人员代码' },
	{ value: '指导位次', desc: '指导位次' },
	{ value: '指导教师所在学院', desc: '指导教师所在学院' },
	{ value: '耳队奖金（元）', desc: '耳队奖金（元）' },
	{ value: '证书颁发时间', desc: '证书颁发时间' },
	{ value: '证书颁发部门', desc: '证书颁发部门' },
	{ value: '是否证书寄发', desc: '是否证书寄发' },
	{ value: '是否公示', desc: '是否公示' },
	{ value: '成绩公示文件', desc: '成绩公示文件' },
	{ value: '证书扫描件', desc: '证书扫描件' },
];

// 格式化值
const formatValue = (value, prop, index) => {
	if (prop === 'index') {
		return index + 1;
	}
	if (prop === 'specialAward' || prop === 'isReviewed') {
		return value ? '是' : '否';
	}
	return value;
};
</script>

<template>
	<div class="competitions-container">
		<!-- 功能区 -->
		<div class="function-area">
			<!-- 筛选表单 -->
			<el-form :model="filterForm" inline class="filter-form">
				<el-form-item label="竞赛名称">
					<el-input
						v-model="filterForm.compName"
						placeholder="请输入竞赛名称"
					/>
				</el-form-item>
				<el-form-item label="获奖项目名称">
					<el-input
						v-model="filterForm.awardProjName"
						placeholder="请输入获奖项目名称"
					/>
				</el-form-item>
				<el-form-item label="获奖等级">
					<el-input
						v-model="filterForm.awardLvl"
						placeholder="请输入获奖等级"
					/>
				</el-form-item>
				<el-form-item label="证书颁发时间">
					<el-input
						v-model="filterForm.certDate"
						placeholder="请输入证书颁发时间"
					/>
				</el-form-item>
				<el-form-item label="竞赛级别">
					<el-input
						v-model="filterForm.compLvl"
						placeholder="请输入竞赛级别"
					/>
				</el-form-item>
				<el-form-item label="学历">
					<el-input
						v-model="filterForm.eduLvl"
						placeholder="请输入学历"
					/>
				</el-form-item>
				<el-form-item label="导入时间">
					<el-input
						v-model="filterForm.importTime"
						placeholder="请输入导入时间"
					/>
				</el-form-item>
				<el-form-item label="指导教师所在学院">
					<el-input
						v-model="filterForm.instrCollege"
						placeholder="请输入指导教师所在学院"
					/>
				</el-form-item>
				<el-form-item label="指导教师">
					<el-input
						v-model="filterForm.instrName"
						placeholder="请输入指导教师"
					/>
				</el-form-item>
				<el-form-item label="指导教师评分">
					<el-input
						v-model="filterForm.instrScore"
						placeholder="请输入指导教师评分"
					/>
				</el-form-item>
				<el-form-item label="颁发部门">
					<el-input
						v-model="filterForm.issueDept"
						placeholder="请输入颁发部门"
					/>
				</el-form-item>
				<el-form-item label="人员代码">
					<el-input
						v-model="filterForm.persCode"
						placeholder="请输入人员代码"
					/>
				</el-form-item>
				<el-form-item label="成绩公示文件">
					<el-input
						v-model="filterForm.resultUrl"
						placeholder="请输入成绩公示文件"
					/>
				</el-form-item>
				<el-form-item label="是否特殊奖">
					<el-input
						v-model="filterForm.specialAward"
						placeholder="请输入是否特殊奖"
					/>
				</el-form-item>
				<el-form-item label="学生所在学院">
					<el-input
						v-model="filterForm.stuCollege"
						placeholder="请输入学生所在学院"
					/>
				</el-form-item>
				<el-form-item label="学生学分">
					<el-input
						v-model="filterForm.stuCredits"
						placeholder="请输入学生学分"
					/>
				</el-form-item>
				<el-form-item label="学生年级">
					<el-input
						v-model="filterForm.stuGrade"
						placeholder="请输入学生年级"
					/>
				</el-form-item>
				<el-form-item label="学号">
					<el-input
						v-model="filterForm.stuId"
						placeholder="请输入学号"
					/>
				</el-form-item>
				<el-form-item label="专业">
					<el-input
						v-model="filterForm.stuMajor"
						placeholder="请输入专业"
					/>
				</el-form-item>
				<el-form-item label="学生姓名">
					<el-input
						v-model="filterForm.stuName"
						placeholder="请输入学生姓名"
					/>
				</el-form-item>
				<el-form-item label="团队奖金">
					<el-input
						v-model="filterForm.teamAward"
						placeholder="请输入团队奖金"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSearch"
						>搜索</el-button
					>
				</el-form-item>
			</el-form>

			<!-- 操作按钮组 -->
			<div
				class="operation-buttons"
				style="
					display: flex;
					justify-content: space-between;
					align-items: center;
				"
			>
				<div style="display: flex; gap: 10px">
					<el-upload
						v-permission="'import_competition'"
						action="#"
						:before-upload="handleImport"
						:show-file-list="true"
						accept=".xlsx, .xls"
					>
						<el-button type="primary" class="styled-button">
							<el-icon><Upload /></el-icon>&nbsp;&nbsp;导入数据
						</el-button>
					</el-upload>

					<el-button
						v-permission="'export_competition'"
						type="success"
						@click="showExportDialog"
						class="styled-button"
					>
						<el-icon><Download /></el-icon>&nbsp;&nbsp;导出数据
					</el-button>
				</div>
				<!-- 添加提示文字 -->
				<div
					v-if="showHint"
					style="
						color: #999;
						font-size: 12px;
						margin-bottom: -40px;
						position: relative;
						cursor: default;
					"
					@mouseover="showCloseButton = true"
					@mouseleave="showCloseButton = false"
				>
					按住shift可横向滚动表格&nbsp;&nbsp;&nbsp;&nbsp;
					<button
						v-if="showCloseButton"
						@click="showHint = false"
						style="
							position: absolute;
							right: 0;
							top: 0;
							background-color: transparent;
							border: none;
							color: #999;
							font-size: 14px;
							cursor: pointer;
							transition: color 0.3s ease;
						"
						@mouseover="event.target.style.color = '#333'"
						@mouseleave="event.target.style.color = '#999'"
					>
						x
					</button>
				</div>
			</div>
		</div>

		<!-- 数据表格区域 -->
		<el-table
			:data="tableData"
			style="width: 100%"
			border
			:height="tableHeight"
			v-loading="loading"
		>
			<el-table-column type="index" label="序号" width="60" />
			<el-table-column
				prop="compName"
				label="竞赛名称"
				width="200"
				show-overflow-tooltip
			/>
			<el-table-column
				prop="awardProjName"
				label="获奖项目名称"
				width="200"
				show-overflow-tooltip
			/>
			<el-table-column prop="awardLvl" label="获奖等级" width="100" />
			<el-table-column prop="stuPos" label="参赛学生位次" width="120" />
			<el-table-column prop="stuName" label="学生姓名" width="100" />
			<el-table-column prop="stuId" label="学号" width="150" />
			<el-table-column
				prop="stuCollege"
				label="学生所在学院"
				width="150"
			/>
			<el-table-column prop="stuMajor" label="学生专业" width="150" />
			<el-table-column prop="stuGrade" label="学生年级" width="100" />
			<el-table-column prop="eduLvl" label="本/专" width="80" />
			<el-table-column prop="compLvl" label="竞赛级别" width="100" />
			<el-table-column prop="compCate" label="竞赛类别" width="100" />
			<el-table-column prop="instrName" label="指导教师" width="120" />
			<el-table-column prop="persCode" label="人员代码" width="120" />
			<el-table-column prop="instrPos" label="指导位次" width="100" />
			<el-table-column
				prop="instrCollege"
				label="指导教师所在学院"
				width="150"
			/>
			<el-table-column
				prop="teamAward"
				label="团队奖金（元）"
				width="130"
			/>
			<el-table-column prop="certDate" label="证书颁发时间" width="120" />
			<el-table-column
				prop="issueDept"
				label="证书颁发部门"
				width="200"
				show-overflow-tooltip
			/>
			<el-table-column
				prop="specialAward"
				label="是否证书寄发"
				width="120"
				:formatter="booleanFormatter"
			/>
			<el-table-column
				prop="isReviewed"
				label="是否公示"
				width="100"
				:formatter="booleanFormatter"
			/>
			<el-table-column
				prop="resultUrl"
				label="成绩公示文件"
				width="150"
				show-overflow-tooltip
			/>
			<el-table-column
				prop="instrScore"
				label="证书扫描件"
				width="150"
				show-overflow-tooltip
			/>
			<el-table-column label="操作" width="80" fixed="right">
				<template #default="scope">
					<el-button type="text" @click="showDetails(scope.row)"
						>详情</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页区域 -->
		<div class="pagination-container">
			<el-pagination
				:current-page="searchParams.page"
				:page-size="searchParams.pageSize"
				:total="totalItems"
				layout="total, prev, pager, next, jumper"
				@current-change="handlePageChange"
			/>
		</div>

		<!-- 详情弹窗 -->
		<el-dialog v-model="dialogVisible" title="详情">
			<div>
				<!-- 描述列表 -->
				<el-descriptions :column="2" border>
					<el-descriptions-item
						v-for="(item, index) in descriptionItems"
						:key="index"
						:label="item.label"
					>
						{{
							formatValue(
								selectedRow[item.prop],
								item.prop,
								index
							)
						}}
					</el-descriptions-item>
				</el-descriptions>
			</div>
		</el-dialog>

		<!-- 导出弹窗 -->
		<el-dialog v-model="exportDialogVisible" title="导出数据">
			<div
				class="export-container"
				style="display: flex; justify-content: center"
			>
				<el-transfer
					v-model="exportColumns"
					:data="exportData"
					:titles="['可选列', '已选列']"
					:props="{ key: 'value', label: 'desc' }"
					target-order="push"
					filterable
					filter-placeholder="输入关键字进行过滤"
				/>
			</div>
			<template #footer>
				<div
					class="footer-button"
					style="display: flex; justify-content: center"
				>
					<el-button type="primary" @click="exportDataFunc">
						确认导出
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped>
.competitions-container {
	width: 100%;
	height: 100%;
	padding: 20px;
}
.export-container {
	min-height: 500px;
}
.function-area {
	background-color: #f5f7fa;
	padding: 20px;
	border-radius: 4px;
	margin-bottom: 20px;
}

.filter-form {
	margin-bottom: 20px;
}

.operation-buttons {
	display: flex;
	gap: 10px;
}

.el-table {
	margin-top: 20px;
}

.competition-type-select {
	width: 200px;
}

.pagination-container {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
</style>
