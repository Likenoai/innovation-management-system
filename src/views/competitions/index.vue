<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Search, Upload, Download, Filter } from '@element-plus/icons-vue';
import { fetchTableData, fetchMockData } from '@/api/competition'; // 导入封装的请求方法
const tableData = ref([]);
const page = ref(1); // 当前页码
const pageSize = ref(20); // 每页显示的条数
const totalItems = ref(0); // 总条目数

const loading = ref(false); // 添加 loading 状态

const loadTableData = async () => {
	try {
		loading.value = true; // 开始请求时设置 loading 为 true
		const response = await fetchMockData(page.value, pageSize.value);
		tableData.value = response.data;
		totalItems.value = response.pagination.total;
	} catch (error) {
		console.error('加载数据失败:', error);
	} finally {
		loading.value = false; // 请求完成后无论成功或失败都设置 loading 为 false
	}
};

onMounted(() => {
	loadTableData();
	updateTableHeight();
	window.addEventListener('resize', updateTableHeight);
});

const tableHeight = ref('70vh'); // 设置表格高度为视口高度的70%

const updateTableHeight = () => {
	const windowHeight = window.innerHeight;
	const heightMap = [
		{ min: 4320, value: '90vh' }, // 8K
		{ min: 2880, value: '85vh' }, // 5K
		{ min: 2160, value: '80vh' }, // 4K
		{ min: 1600, value: '76vh' }, // 1600p
		{ min: 1440, value: '75vh' }, // 1440p
		{ min: 1080, value: '74vh' }, // 1080p
		{ min: 900, value: '64vh' }, // 900p
		{ min: 768, value: '62vh' }, // 768p
		{ min: 720, value: '60vh' }, // 720p
	];

	const matchedHeight = heightMap.find((item) => windowHeight >= item.min);
	tableHeight.value = matchedHeight ? matchedHeight.value : '60vh';
};

// Remember to remove the event listener when the component is unmounted
onUnmounted(() => {
	window.removeEventListener('resize', updateTableHeight);
});

const searchQuery = ref('');

const handleAdd = () => {
	// 添加竞赛逻辑
};

const handleEdit = (row) => {
	// 编辑竞赛逻辑
};

const handleDelete = (row) => {
	// 删除竞赛逻辑
};

// 竞赛类型选项
const competitionTypes = ref([
	{ value: '创新创业类', label: '创新创业类' },
	{ value: '科技创新类', label: '科技创新类' },
	{ value: '学科竞赛', label: '学科竞赛' },
	{ value: '工程技术类', label: '工程技术类' },
	{ value: '人文艺术类', label: '人文艺术类' },
]);

// 筛选条件
const filterForm = ref({
	college: '',
	type: '',
	dateRange: '',
	keyword: '',
});

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

// 根据竞赛类型筛选显示相关学院
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

// 处理搜索
const handleSearch = () => {
	// 处理搜索逻辑
};

// 处理导入
const handleImport = (file) => {
	// 处理文件导入逻辑
};

// 处理导出
const exportDialogVisible = ref(false);
const exportColumns = ref([]); // 存储选择的列名

const handleExport = () => {
	// 处理数据导出逻辑
	exportDialogVisible.value = true;

	// 将选择的列名传递给后端
	console.log('选择的列名:', exportColumns.value);
	// 这里可以添加调用后端接口的逻辑，传递 exportColumns.value
};

const dialogVisible = ref(false);
const selectedRow = ref(null);

const showDetails = (row) => {
	console.log(row);
	selectedRow.value = row;
	dialogVisible.value = true;
};

const handlePageChange = (newPage) => {
	page.value = newPage;
	loadTableData();
};

const showHint = ref(true);
const showCloseButton = ref(false);

const descriptionItems = [
	{ label: '序号', prop: '序号' },
	{ label: '竞赛名称', prop: '竞赛名称' },
	{ label: '获奖项目名称', prop: '获奖项目名称' },
	{ label: '获奖等级', prop: '获奖等级' },
	{ label: '参赛学生位次', prop: '参赛学生位次' },
	{ label: '学生姓名', prop: '学生姓名' },
	{ label: '学号', prop: '学号' },
	{ label: '学生所在学院', prop: '学生所在学院' },
	{ label: '学生专业', prop: '学生专业' },
	{ label: '学生年级', prop: '学生年级' },
	{ label: '本/专', prop: '本/专' },
	{ label: '竞赛级别', prop: '竞赛级别' },
	{ label: '竞赛类别', prop: '竞赛类别' },
	{ label: '指导教师', prop: '指导教师' },
	{ label: '人员代码', prop: '人员代码' },
	{ label: '指导位次', prop: '指导位次' },
	{ label: '指导教师所在学院', prop: '指导教师所在学院' },
	{ label: '耳队奖金（元）', prop: '耳队奖金（元）' },
	{ label: '证书颁发时间', prop: '证书发时间' },
	{ label: '证书颁发部门', prop: '证书颁发部门' },
	{ label: '是否证书寄发', prop: '是否证书寄发' },
	{ label: '是否公示', prop: '是否公示' },
	{ label: '成绩公示文件', prop: '成绩公示文件' },
	{ label: '证书扫描件', prop: '证书扫描件' },
];

// 导出数据
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
</script>

<template>
	<div class="competitions-container">
		<!-- 功能区 -->
		<div class="function-area">
			<!-- 筛选表单 -->
			<el-form :model="filterForm" inline class="filter-form">
				<el-form-item label="竞赛类型">
					<el-select
						v-model="filterForm.type"
						placeholder="选择竞赛类型"
						class="competition-type-select"
					>
						<el-option
							v-for="item in competitionTypes"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>

				<el-form-item label="学院">
					<el-select
						v-model="filterForm.college"
						placeholder="选择学院"
						class="competition-type-select"
					>
						<el-option
							v-for="item in filteredColleges"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>

				<el-form-item label="时间范围">
					<el-date-picker
						v-model="filterForm.dateRange"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
					/>
				</el-form-item>

				<el-form-item>
					<el-input
						v-model="filterForm.keyword"
						placeholder="搜索关键词"
						:prefix-icon="Search"
						style="padding-left: 10px"
					>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSearch">
						搜索
					</el-button>
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
						action="#"
						:before-upload="handleImport"
						:show-file-list="false"
					>
						<el-button type="primary" class="styled-button">
							<el-icon><Upload /></el-icon>&nbsp;&nbsp;导入数据
						</el-button>
					</el-upload>

					<el-button
						type="success"
						@click="handleExport"
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
			<el-table-column prop="序号" label="序号" width="60" />
			<el-table-column
				prop="竞赛名称"
				label="竞名称"
				width="200"
				show-overflow-tooltip
			/>
			<el-table-column
				prop="获奖项目名称"
				label="获奖项目名称"
				width="200"
				show-overflow-tooltip
			/>
			<el-table-column prop="获奖等级" label="获奖等级" width="100" />
			<el-table-column
				prop="参赛学生位次"
				label="参赛学生位次"
				width="120"
			/>
			<el-table-column prop="学生姓名" label="学生姓名" width="100" />
			<el-table-column prop="学号" label="学号" width="150" />
			<el-table-column
				prop="学生所在学院"
				label="学生所在学院"
				width="150"
			/>
			<el-table-column prop="学生专业" label="学生专业" width="150" />
			<el-table-column prop="学生年级" label="学生年级" width="100" />
			<el-table-column prop="本/专" label="本/专" width="80" />
			<el-table-column prop="竞赛级别" label="竞赛级别" width="100" />
			<el-table-column prop="竞赛类别" label="竞赛类别" width="100" />
			<el-table-column prop="指导教师" label="指导教师" width="120" />
			<el-table-column prop="人员代码" label="人员代码" width="120" />
			<el-table-column prop="指导位次" label="指导位次" width="100" />
			<el-table-column
				prop="指导教师所在学院"
				label="指导教师所在学院"
				width="150"
			/>
			<el-table-column
				prop="耳队奖金（元）"
				label="耳队奖金（元）"
				width="130"
			/>
			<el-table-column
				prop="证书颁发时间"
				label="证书颁发时间"
				width="120"
			/>
			<el-table-column
				prop="证书颁发部门"
				label="证书颁发部门"
				width="200"
				show-overflow-tooltip
			/>
			<el-table-column
				prop="是否证书寄发"
				label="是否证书寄发"
				width="120"
			/>
			<el-table-column prop="是否公示" label="是否公示" width="100" />
			<el-table-column
				prop="成绩公示文件"
				label="成绩公示文件"
				width="150"
				show-overflow-tooltip
			/>
			<el-table-column
				prop="证书扫描件"
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
				:current-page="page"
				:page-size="pageSize"
				:total="totalItems"
				layout="total, prev, pager, next, jumper"
				@current-change="handlePageChange"
			/>
		</div>

		<!-- 详情弹窗 -->
		<el-dialog v-model="dialogVisible" title="详情">
			<el-descriptions :column="2" border>
				<el-descriptions-item
					v-for="(item, index) in descriptionItems"
					:key="index"
					:label="item.label"
				>
					{{ selectedRow[item.prop] }}
				</el-descriptions-item>
			</el-descriptions>
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
					<el-button type="primary" @click="handleExport">
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

.styled-button {
	background: linear-gradient(135deg, #575786, #464c66); /* 更亮的渐变背景 */
	color: #fff;
	padding: 1rem 1.5rem;
	border-radius: 15px;
	text-align: center;
	transition: transform 0.3s ease, background 0.3s ease;
	border: 1px solid #2f4560; /* 较亮的边框 */
	font-weight: bold;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

	&:hover {
		background: linear-gradient(
			135deg,
			#2a314e,
			#1f3a60
		); /* 悬停时较亮的渐变 */
		transform: translateY(-5px);
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
	}
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
