<script setup>
import { ref, onMounted } from 'vue';
import { ElDatePicker, ElUpload } from 'element-plus'; // 引入Element Plus组件
import axios from 'axios';
const myCompetitions = ref([]);

// 获取竞赛数据
const fetchCompetitions = async () => {
	try {
		const response = await axios.get('./data.json');
		console.log(response);
		myCompetitions.value = response;
	} catch (error) {
		console.error('获取竞赛数据失败:', error);
	}
};

onMounted(() => {
	// 页面加载时获取数据
	fetchCompetitions();
});
// 上传文件的处理函数
const handleUpload = (file) => {
	// 处理文件上传逻辑
	console.log('上传文件:', file.name);
};

// 报名竞赛的处理函数
const handleRegister = (competition) => {
	// 处理报名逻辑
	console.log('报名竞赛:', competition.name);
};

// 上传文件的字段名称
const headers = [
	'竞赛名称',
	'获奖项目名称',
	'获奖等级',
	'参赛学生位次',
	'学生姓名',
	'学号',
	'学生所在学院',
	'学生专业',
	'学生年级',
	'本/专',
	'竞赛级别',
	'指导教师',
	'人员代码',
	'指导位次',
	'指导教师所在学院',
	'奖金金额（元）',
	'生效学年职称统计',
	'证书时间',
	'证书颁发部门',
	'是否证书等发',
	'成绩公示文件',
	'证书扫描件',
	'是否公示',
];

// 竞赛信息表单数据
const competitionForm = ref({
	证书时间: '', // 初始化证书时间
	成绩公示文件: null, // 初始化文件
	证书扫描件: null, // 初始化文件
	// ... 其他字段 ...
});

// 初始化表单字段
headers.forEach((header) => {
	competitionForm.value[header] = '';
});

// 提交表单的处理函数
const submitForm = () => {
	console.log('提交的竞赛信息:', competitionForm.value);
};

// 文件上传处理函数
const handleFileChange = (file, field) => {
	competitionForm.value[field] = file;
	console.log(`上传的文件(${field}):`, file.name);
};

const uploadRef = ref(null);

const uploadFiles = (field) => {
	const uploadComponent = uploadRef.value;
	if (uploadComponent) {
		uploadComponent.submit();
		console.log(`手动上传文件(${field})`);
	}
};
</script>

<template>
	<div class="my-competitions-container">
		<h2 v-permission="'view_competitions'">我的竞赛</h2>

		<!-- 竞赛信息表单 -->
		<el-form :model="competitionForm" label-width="150px" class="form-grid">
			<el-row :gutter="20">
				<el-col
					:span="12"
					v-for="(header, index) in headers"
					:key="index"
				>
					<el-form-item :label="header" class="form-item">
						<template
							v-if="
								header !== '证书时间' &&
								header !== '成绩公示文件' &&
								header !== '证书扫描件'
							"
						>
							<el-input
								v-model="competitionForm[header]"
								class="input-field"
							/>
						</template>
						<template v-else-if="header === '证书时间'">
							<el-date-picker
								v-model="competitionForm[header]"
								type="date"
								placeholder="选择日期"
							/>
						</template>
						<template v-else>
							<el-upload
								class="upload-demo"
								drag
								action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
								multiple
								:auto-upload="false"
								:show-file-list="true"
								:before-upload="
									(file) => handleFileChange(file, header)
								"
								ref="uploadRef"
							>
								<el-icon class="el-icon--upload"
									><upload-filled
								/></el-icon>
								<div class="el-upload__text">
									在这里放下文件或<em>点击选择文件</em>
								</div>
								<template #tip>
									<div class="el-upload__tip">
										<!-- jpg/png files with a size less than 500kb -->
									</div>
								</template>
							</el-upload>
							<el-button
								type="primary"
								@click="uploadFiles(header)"
								>上传</el-button
							>
						</template>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item>
				<el-button type="primary" @click="submitForm">提交</el-button>
			</el-form-item>
		</el-form>

		<!-- 已上传竞赛信息展示 -->
		<el-table :data="myCompetitions" style="width: 100%">
			<el-table-column prop="竞赛名称" label="竞赛名称" width="180" />
			<el-table-column
				prop="获奖项目名称"
				label="获奖项目名称"
				width="180"
			/>
			<el-table-column prop="获奖等级" label="获奖等级" width="180" />
			<el-table-column
				prop="参赛学生位次"
				label="参赛学生位次"
				width="180"
			/>
			<el-table-column prop="学生姓名" label="学生姓名" width="180" />
			<el-table-column prop="学号" label="学号" width="180" />
			<el-table-column
				prop="学生所在学院"
				label="学生所在学院"
				width="180"
			/>
			<el-table-column prop="学生专业" label="学生专业" width="180" />
			<el-table-column prop="学生年级" label="学生年级" width="180" />
			<el-table-column prop="本/专" label="本/专" width="180" />
			<el-table-column prop="竞赛级别" label="竞赛级别" width="180" />
			<el-table-column prop="指导教师" label="指导教师" width="180" />
			<el-table-column prop="人员代码" label="人员代码" width="180" />
			<el-table-column prop="指导位次" label="指导位次" width="180" />
			<el-table-column
				prop="指导教师所在学院"
				label="指导教师所在学院"
				width="180"
			/>
			<el-table-column
				prop="奖金金额（元）"
				label="奖金金额（元）"
				width="180"
			/>
			<el-table-column
				prop="生效学年职称统计"
				label="生效学年职称统计"
				width="180"
			/>
			<el-table-column prop="证书时间" label="证书时间" width="180" />
			<el-table-column
				prop="证书颁发部门"
				label="证书颁发部门"
				width="180"
			/>
			<el-table-column
				prop="是否证书等发"
				label="是否证书等发"
				width="180"
			/>
			<el-table-column
				prop="成绩公示文件"
				label="成绩公示文件"
				width="180"
			/>
			<el-table-column prop="证书扫描件" label="证书扫描件" width="180" />
			<el-table-column prop="是否公示" label="是否公示" width="180" />
			<el-table-column prop="status" label="状态" width="180" />
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" @click="handleRegister(scope.row)"
						>报名</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
.my-competitions-container {
	padding: 20px;
}

.form-item {
	display: flex;
	align-items: center;
}

.input-field {
	width: 100%; /* 使输入框适应列宽 */
}

.form-grid {
	display: flex;
	flex-wrap: wrap;
}

.upload-demo {
	width: 100%;
}
</style>
