<script setup>
import { ref, reactive, onMounted } from 'vue';
import * as projectApi from '@/api/projectApi.js';
import {
	ElButton,
	ElInput,
	ElSelect,
	ElOption,
	ElTable,
	ElTableColumn,
	ElDialog,
	ElForm,
	ElFormItem,
	ElTag,
	ElTooltip,
	ElUpload,
	ElMessageBox,
	ElMessage,
} from 'element-plus';
import axios from 'axios';

const projects = ref([]);
const searchKeyword = ref('');
const searchCategory = ref('');
const dialogVisible = ref(false);
const loading = ref(false);
console.log(projectApi);
const categoryOptions = [
	'学生项目',
	'教师项目',
	'企业项目',
	'成果转化',
	'AI生成',
];

const getAllProjects = async () => {
	console.log('111');
	let res = await projectApi
		.getProjectsApi()
		.then((response) => {
			console.log('response:', response);
			projects.value = response.data;
		})
		.catch((error) => {
			ElMessage.error('获取项目列表失败');
			console.error(error);
		});
};

const searchProjects = async () => {
	const params = new URLSearchParams();
	if (searchKeyword.value) {
		params.append('keyword', searchKeyword.value);
	}
	if (searchCategory.value) {
		params.append('category', searchCategory.value);
	}
	await projectApi
		.searchProjectsApi(params)
		.then((response) => {
			projects.value = response.data;
		})
		.catch((error) => {
			ElMessage.error('搜索失败：' + error.message);
		});
};

const showProjectDialog = (project = null) => {
	dialogVisible.value = true;
	if (project) {
		Object.assign(newProject, project);
	} else {
		Object.assign(newProject, {
			projectName: '',
			projectNumber: '',
			category: '学生项目',
			contactPerson: '',
			contactInfo: '',
			projectDescription: '',
			projectKeywords: '',
		});
	}
};
// 新增项目Api
const newProject = reactive({
	projectName: '',
	projectNumber: '',
	category: '',
	contactPerson: '',
	contactInfo: '',
	projectDescription: '',
	projectKeywords: '',
	isAiGenerated: false,
});
const createProject = () => {
	projectApi
		.createProjectApi(newProject)
		.then(() => {
			ElMessage.success('创建成功');
			dialogVisible.value = false;
			getAllProjects();
		})
		.catch((error) => {
			ElMessage.error('创建失败');
			console.error(error);
		});
};

const formatDate = (dateString) => {
	if (!dateString) return '';
	const date = new Date(dateString);
	return date.toLocaleString('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});
};

const generateAIProject = () => {
	ElMessageBox.prompt('请输入关键词生成项目', 'AI项目生成', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		inputPattern: /.+/,
		inputErrorMessage: '关键词不能为空',
		customClass: 'custom-dialog',
		message: `
			<div style="margin-bottom: 15px;">
				<label>生成数量：</label>
				<input id="numProjects" type="number"
					style="width: 100px; padding: 5px; border: 1px solid #dcdfe6; border-radius: 4px;"
					min="1" max="10" value="1">
			</div>
		`,
		dangerouslyUseHTMLString: true,
	})
		.then(({ value }) => {
			const numProjects = document.getElementById('numProjects').value;
			const keyword = value.trim();

			if (numProjects < 1 || numProjects > 10) {
				ElMessage.error('生成数量必须在1-10之间');
				return;
			}

			loading.value = true;
			ElMessage.info('正在生成项目，请稍候...');
			console.log(keyword);
			console.log(parseInt(numProjects));
			projectApi
				.generateProjectsApi({
					keyword: keyword,
					numProjects: parseInt(numProjects),
				})
				.then((response) => {
					if (response.data && response.data.projects) {
						ElMessage.success(
							`成功生成 ${response.data.projects.length} 个项目`
						);
						getAllProjects();
					} else {
						throw new Error('生成项目失败');
					}
				})
				.catch((error) => {
					console.error('生成项目错误:', error);
					ElMessage.error(error.response?.data || '生成失败，请重试');
				})
				.finally(() => {
					loading.value = false;
				});
		})
		.catch(() => {
			ElMessage.info('已取消生成');
		});
};

function handleImportSuccess(response) {
	this.$message.success(`成功导入 ${response.count} 条数据`);
	this.getAllProjects();
}
function handleImportError(error) {
	this.$message.error('导入失败：' + (error.message || '未知错误'));
}

const viewProject = (project) => {
	ElMessageBox.alert(
		`
		<div style="text-align: left">
			<p><strong>项目名称：</strong>${project.projectName}</p>
			<p><strong>项目编号：</strong>${project.projectNumber}</p>
			<p><strong>项目类别：</strong>${project.category}</p>
			<p><strong>联系人：</strong>${project.contactPerson}</p>
			<p><strong>联系方式：</strong>${project.contactInfo}</p>
			<p><strong>创建时间：</strong>${formatDate(project.initiationDate)}</p>
			<p><strong>项目描述：</strong>${project.projectDescription || '无'}</p>
			<p><strong>关键词：</strong>${project.projectKeywords || '无'}</p>
		</div>
		`,
		'项目详情',
		{
			dangerouslyUseHTMLString: true,
			customClass: 'project-detail-dialog',
		}
	);
};
let isRedact = ref(false);
let currentProjectId = ref(null);
const editProject = (project) => {
	console.log(project);
	dialogVisible.value = true;
	isRedact.value = true;
	currentProjectId.value = project.id;
	newProject.projectName = project.projectName;
	newProject.projectNumber = project.projectNumber;
	newProject.category = project.category;
	newProject.contactPerson = project.contactPerson;
	newProject.contactInfo = project.contactInfo;
	newProject.projectDescription = project.projectDescription;
	newProject.projectKeywords = project.projectKeywords;
};
const updateProject = async () => {
	let res = await projectApi
		.updateProjectApi({
			id: currentProjectId.value,
			...newProject,
		})
		.then(() => {
			getAllProjects();
		});

	dialogVisible.value = false;
};

const getTagType = (category) => {
	const typeMap = {
		学生项目: 'success',
		教师项目: 'warning',
		企业项目: 'danger',
		成果转化: 'primary',
		AI生成: 'info',
	};
	return typeMap[category] || '';
};

const downloadTemplate = () => {
	const link = document.createElement('a');
	link.href = '/导入模板.xlsx';
	link.download = 'project_template.xlsx';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

onMounted(() => {
	getAllProjects();
});
</script>

<template>
	<div class="project-library-container">
		<h1 class="title">项目库</h1>
		<div class="button-group">
			<el-button type="primary" @click="showProjectDialog"
				>新增项目</el-button
			>
			<el-upload
				action="/api/project/import"
				:show-file-list="false"
				:on-success="handleImportSuccess"
				:on-error="handleImportError"
			>
				<el-button type="warning">导入Excel</el-button>
			</el-upload>
			<el-button
				type="success"
				class="button-item"
				@click="generateAIProject"
				>AI生成项目</el-button
			>
			<el-button type="info" @click="downloadTemplate"
				>下载模板</el-button
			>
		</div>

		<div class="search-container">
			<el-input
				v-model="searchKeyword"
				placeholder="请输入关键词"
				clearable
				class="input-item"
			>
			</el-input>

			<el-select
				v-model="searchCategory"
				placeholder="项目类型"
				clearable
				class="input-item"
			>
				<el-option label="学生项目" value="学生项目"></el-option>
				<el-option label="教师项目" value="教师项目"></el-option>
				<el-option label="企业项目" value="企业项目"></el-option>
				<el-option label="成果转化" value="成果转化"></el-option>
				<el-option label="AI生成" value="AI生成"></el-option>
			</el-select>

			<el-button type="primary" @click="searchProjects">搜索</el-button>
		</div>

		<el-table :data="projects" style="width: 100%" border stripe>
			<el-table-column
				label="序号"
				width="60"
				header-align="center"
				align="center"
			>
				<template #default="{ $index }">
					{{ $index + 1 }}
				</template>
			</el-table-column>

			<el-table-column
				prop="projectNumber"
				label="项目编号"
				header-align="center"
				align="center"
			></el-table-column>

			<el-table-column prop="projectName" label="项目名称">
				<template #default="{ row }">
					<div>
						{{ row.projectName }}
						<el-tag size="mini" style="margin-left: 5px">{{
							row.category
						}}</el-tag>
						<el-tag
							size="mini"
							type="success"
							v-if="row.isAiGenerated"
							>AI生成</el-tag
						>
					</div>
				</template>
			</el-table-column>

			<el-table-column
				prop="category"
				label="项目类型"
				width="120"
				header-align="center"
				align="center"
			>
				<template #default="{ row }">
					<el-tag :type="getTagType(row.category)">
						{{ row.category }}
					</el-tag>
				</template>
			</el-table-column>

			<el-table-column
				prop="contactPerson"
				label="联系人"
				width="100"
				header-align="center"
				align="center"
			></el-table-column>

			<el-table-column
				prop="contactInfo"
				label="联系方式"
				header-align="center"
				align="center"
			></el-table-column>

			<!-- <el-table-column prop="projectDescription" label="项目描述">
				<template #default="{ row }">
					<el-tooltip
						class="item"
						effect="dark"
						:content="row.projectDescription"
						placement="top-start"
					>
						<div class="description-cell">
							{{ row.projectDescription }}
						</div>
					</el-tooltip>
				</template>
			</el-table-column> -->

			<el-table-column
				prop="projectKeywords"
				label="关键词"
				width="120"
				header-align="center"
				align="center"
			>
				<template #default="{ row }">
					<el-tag size="mini" v-if="row.projectKeywords">{{
						row.projectKeywords
					}}</el-tag>
				</template>
			</el-table-column>

			<el-table-column
				prop="initiationDate"
				label="创建时间"
				width="160"
				header-align="center"
				align="center"
			>
				<template #default="{ row }">
					{{ formatDate(row.initiationDate) }}
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				width="180"
				fixed="right"
				header-align="center"
				align="center"
			>
				<template #default="{ row }">
					<el-button
						type="text"
						size="small"
						@click="viewProject(row)"
						>查看</el-button
					>
					<el-button
						type="text"
						size="small"
						@click="editProject(row)"
						>编辑</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="新增项目" v-model="dialogVisible">
			<el-form :model="newProject" label-width="100px">
				<el-form-item label="项目名称">
					<el-input v-model="newProject.projectName"></el-input>
				</el-form-item>
				<el-form-item label="项目编号">
					<el-input v-model="newProject.projectNumber"></el-input>
				</el-form-item>
				<el-form-item label="项目类型">
					<el-select
						v-model="newProject.category"
						placeholder="请选择项目类型"
					>
						<el-option
							label="学生项目"
							value="学生项目"
						></el-option>
						<el-option
							label="教师项目"
							value="教师项目"
						></el-option>
						<el-option
							label="企业项目"
							value="企业项目"
						></el-option>
						<el-option
							label="成果转化"
							value="成果转化"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系人">
					<el-input v-model="newProject.contactPerson"></el-input>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-input v-model="newProject.contactInfo"></el-input>
				</el-form-item>
				<el-form-item label="项目描述">
					<el-input
						type="textarea"
						v-model="newProject.projectDescription"
					></el-input>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input v-model="newProject.projectKeywords"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button
					type="primary"
					@click="createProject"
					v-show="!isRedact"
					>确定</el-button
				>
				<el-button
					type="primary"
					@click="updateProject"
					v-show="isRedact"
					>更新</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<style>
.project-library-container {
	padding: 20px;
}
.button-group {
	margin-top: 20px;
	max-width: 500px;
	display: flex;
	justify-content: space-between;
}
.search-container {
	margin-top: 20px;
	.input-item {
		max-width: 200px;
		margin-right: 12px;
	}
}
.description-cell {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 200px;
}
.el-table {
	margin-top: 20px;
}
.el-tag {
	margin-right: 5px;
}
</style>
