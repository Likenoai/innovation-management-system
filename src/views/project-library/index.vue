<script setup>
import { ref, reactive, onMounted, shallowRef } from 'vue';
import * as projectApi from '@/api/projectApi.js';
import { produce } from 'immer'; // 和shallowRef搭配使用
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
	ElDescriptions,
	ElDescriptionsItem,
	ElRow,
	ElCol,
} from 'element-plus';
import { pagingSearch } from '../../utils/api';
import { handleTableHeight } from '@/utils/index.js';
import { debounce } from 'lodash';
const dialogVisible = ref(false);
const loading = ref(false);
// const projects = shallowRef([]);
const projects = ref([]);
const projectDetails = ref({});

/**
 * 项目搜索参数类
 */
class projectSearchParams extends pagingSearch {
	constructor(keyword = '', category = '', pageNum, pageSize) {
		super(pageNum, pageSize); // 调用父类构造函数
		this.keyword = keyword; // 搜索关键词
		this.category = category; // 项目类别
	}
	toQueryString() {
		const params = new URLSearchParams(super.toQueryString());
		params.append('keyword', this.keyword);
		params.append('category', this.category);
		return params.toString();
	}
}
const params = ref(new projectSearchParams('', '', 1, 30));
const categoryOptions = [
	'学生项目',
	'教师项目',
	'企业项目',
	'成果转化',
	'AI生成',
];
// 处理项目类型清空
const handleClear = () => {
	params.value.category = '';
};

/**
 * 搜索项目/获取全部信息
 */
const searchProjects = async () => {
	tableLoading.value = true;
	await projectApi
		.searchProjectsApi(params.value.toQueryString())
		.then((response) => {
			projects.value = response.data.recordList;
			params.value.total = response.data.total;
			tableLoading.value = false;
			if (response.code === 200) {
				ElMessage.success('获取数据成功');
			}
		})
		.catch((error) => {
			ElMessage.error('获取数据失败：' + error.message);
		});
};

/**
 * 处理分页变化
 * @param {number} page - 当前页码
 */
const handlePageChange = (page) => {
	params.value.pageNum = page;
	// 这里可以根据当前页码和每页大小来更新表格数据
	searchProjects();
};

onMounted(() => {
	searchProjects();
});

const tableHeight = handleTableHeight(325);
/**
 * 显示项目对话框
 */
const showProjectDialog = () => {
	dialogVisible.value = true;
};
// 新增项目Api
const newProject = ref({
	projectName: '',
	projectNumber: '',
	category: '',
	contactPerson: '',
	contactInfo: '',
	projectDescription: '',
	projectKeywords: '',
	isAiGenerated: false,
});
const rules = {
	projectName: [
		{ required: true, message: '请输入项目名称', trigger: 'blur' },
		{
			min: 2,
			max: 50,
			message: '长度在 2 到 50 个字符之间',
			trigger: 'blur',
		},
	],
	projectNumber: [
		{ required: true, message: '请输入项目编号', trigger: 'blur' },
		{
			pattern: /^[A-Za-z0-9]+$/,
			message: '项目编号只能包含字母和数字',
			trigger: 'blur',
		},
	],
	category: [
		{ required: true, message: '请选择项目类型', trigger: 'change' },
	],
	contactPerson: [
		{ required: true, message: '请输入联系人', trigger: 'blur' },
	],
	contactInfo: [
		{ required: true, message: '请输入联系方式', trigger: 'blur' },
		{
			pattern: /^1[3-9]\d{9}$/,
			message: '请输入有效的手机号码',
			trigger: 'blur',
		},
	],
	projectDescription: [
		{ required: true, message: '请输入项目描述', trigger: 'blur' },
		{ min: 10, message: '项目描述至少需要 10 个字符', trigger: 'blur' },
	],
	projectKeywords: [
		{ required: true, message: '请输入关键词', trigger: 'blur' },
	],
};
const projectForm = ref(null); // 用于引用 el-form 实例
/**
 * 创建新项目
 */
const createProject = () => {
	projectForm.value.validate(async (valid) => {
		if (valid) {
			console.log('表单验证通过，提交数据:', newProject.value);
			// 调用 createProject 方法或其他逻辑
			await projectApi
				.createProjectApi(newProject.value)
				.then(() => {
					ElMessage.success('创建成功');
					dialogVisible.value = false;
					searchProjects();
				})
				.catch((error) => {
					ElMessage.error('创建失败');
					console.error(error);
				});
		} else {
			console.log('表单验证失败');
			return;
		}
	});
};
// 查看项目对话框S
let dialogVisibleLook = ref(false);
/**
 * 查看项目详情
 * @param {Object} project - 项目对象
 */
const viewProject = (project) => {
	projectDetails.value = project;
	dialogVisibleLook.value = true;
};
let isRedact = ref(false);
let currentProjectId = ref(null);
// 查看项目对话框E

// 编辑项目S
const updateProjectParams = ref({
	projectName: '',
	projectNumber: '',
	category: '',
	contactPerson: '',
	contactInfo: '',
	projectDescription: '',
	projectKeywords: '',
	isAiGenerated: false,
});
let dialogEdit = ref(false);
/**
 * 编辑项目
 * @param {Object} project - 要编辑的项目对象
 */
const editProject = (project) => {
	console.log(project);
	dialogEdit.value = true;
	isRedact.value = true;
	currentProjectId.value = project.id;
	Object.keys(updateProjectParams.value).forEach((key) => {
		if (key in project) {
			updateProjectParams.value[key] = project[key];
		}
	});
};
const editProjectForm = ref(null); // 用于引用 el-form 实例

/**
 * 更新项目
 */
const updateProject = () => {
	editProjectForm.value.validate(async (valid) => {
		if (valid) {
			console.log('表单验证通过，提交数据:', newProject.value);
			ElMessage.success('表单验证通过，提交数据');
			// 调用 createProject 方法或其他逻辑
			dialogEdit.value = false;
			let res = await projectApi
				.updateProjectApi({
					id: currentProjectId.value,
					...updateProjectParams.value,
				})
				.then(() => {
					ElMessage.success('更新成功');
					searchProjects();
				})
				.catch((error) => {
					ElMessage.error('更新失败');
					console.error(error);
				});
		} else {
			console.log('表单验证失败');
			return;
		}
	});
};
// 编辑项目E

/**
 * 格式化日期
 * @param {string} dateString - 日期字符串
 * @returns {string} 格式化后的日期
 */
const formatDate = (dateString) => {
	if (!dateString) return '';
	const date = new Date(dateString);
	return date.toLocaleString('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
};

/**
 * 生成AI项目
 */
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
						searchProjects();
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

/**
 * 处理导入专家信息
 * @param {File} file - 导入的文件
 */
const handleImportExpert = async (file) => {
	console.log(file);
	ElMessage.info('正在导入信息');
	const formData = new FormData();
	formData.append('file', file);
	const response = await projectApi.importProjectApi(formData);
	if (response.code === 200) {
		searchProjects();
		ElMessage.success('导入成功');
	} else {
		ElMessage.error(response.msg);
		downloadErrorFile(response.msg);
	}
	return false;
};
/**
 * 导入成功处理
 * @param {Object} response - 导入响应
 */
function handleImportSuccess(response) {
	this.$message.success(`成功导入 ${response.count} 条数据`);
	this.searchProjects();
}
/**
 * 导入错误处理
 * @param {Error} error - 错误对象
 */
function handleImportError(error) {
	this.$message.error('导入失败：' + (error.message || '未知错误'));
}

/**
 * 获取标签类型
 * @param {string} category - 项目类别
 * @returns {string} 标签类型
 */
const getTagType = (category) => {
	const typeMap = {
		学生项目: 'success',
		教师项目: 'warning',
		企业项目: 'danger',
		成果转化: 'primary',
		AI生成: 'info',
	};
	return typeMap[category] || 'success';
};
import { handleDownload } from '../utils';
/**
 * 下载模板
 */
const downloadTemplate = async () => {
	let res = await projectApi.downloadTemplateApi();
	if (handleDownload(res.data, 'project_template.xlsx')) {
		ElMessage.success('下载成功');
	} else {
		ElMessage.error('下载失败');
	}
};
let tableLoading = ref(false);
</script>

<template>
	<div class="project-library-container">
		<h1 class="title">项目库</h1>

		<div class="button-group">
			<el-button
				type="primary"
				@click="showProjectDialog"
				v-permission="'project_add_project'"
				>新增项目</el-button
			>
			<el-upload
				action="#"
				:show-file-list="true"
				:before-upload="handleImportExpert"
				:on-success="handleImportSuccess"
				:on-error="handleImportError"
				accept=".xlsx, .xls"
				v-permission="'project_import_excel'"
			>
				<el-button type="warning">导入Excel</el-button>
			</el-upload>
			<el-button
				type="success"
				class="button-item"
				@click="generateAIProject"
				v-permission="'project_ai'"
				>AI生成项目</el-button
			>
			<el-button
				type="info"
				@click="downloadTemplate"
				v-permission="'project_template'"
				>下载模板</el-button
			>
		</div>
		<div class="search-container">
			<el-input
				v-model="params.keyword"
				placeholder="请输入关键词"
				clearable
				class="input-item"
			>
			</el-input>

			<el-select
				v-model="params.category"
				placeholder="项目类型"
				clearable
				class="input-item"
				@clear="handleClear"
			>
				<el-option
					v-for="item in categoryOptions"
					:label="item"
					:value="item"
				></el-option>
			</el-select>

			<el-button type="primary" @click="debounce(searchProjects, 300)()"
				>搜索</el-button
			>
		</div>

		<el-table
			:data="projects"
			style="width: 100%"
			:height="tableHeight"
			v-loading="tableLoading"
			border
			stripe
			lazy
		>
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

			<el-table-column
				prop="projectName"
				label="项目名称"
				min-width="200"
			>
				<template #default="{ row }">
					<div>
						<el-tooltip
							:content="row.projectName"
							placement="top-start"
							:disabled="!row.isOverflow"
						>
							<div class="project-info">
								<div
									class="project-name"
									v-height-overflow="
										(val) => (row.isOverflow = val)
									"
								>
									{{ row.projectName }}
								</div>
								<!-- 其他标签 -->
							</div>
						</el-tooltip>
					</div>
				</template>
			</el-table-column>

			<el-table-column
				prop="category"
				label="项目类型"
				width="100"
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

			<el-table-column
				prop="projectKeywords"
				label="关键词"
				header-align="center"
				align="center"
			>
				<template #default="{ row }">
					<div>
						<!-- <el-tag size="small" v-if="row.projectKeywords">{{
							row.projectKeywords
						}}</el-tag> -->
						<el-tooltip
							:content="row.projectKeywords"
							placement="top-start"
							:disabled="!row.isOverflow"
						>
							<div class="project-info">
								<div
									class="project-name-keywords"
									v-width-overflow="
										(val) => (row.isOverflow = val)
									"
								>
									<el-tag
										size="small"
										v-if="row.projectKeywords"
										>{{ row.projectKeywords }}</el-tag
									>
								</div>
							</div>
						</el-tooltip>
					</div>
				</template>
			</el-table-column>

			<el-table-column
				prop="initiationDate"
				label="创建时间"
				width="120"
				header-align="center"
				align="center"
			>
				<template #default="{ row }">
					{{ formatDate(row.initiationDate) }}
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				width="140"
				fixed="right"
				header-align="center"
				align="center"
			>
				<template #default="{ row }">
					<el-button link size="small" @click="viewProject(row)"
						>查看</el-button
					>
					<el-button
						link
						size="small"
						@click="editProject(row)"
						v-permission="'project_edit_project'"
						>编辑</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page="params.pageNum"
			:page-size="params.pageSize"
			:total="params.total"
			@current-change="handlePageChange"
			layout="total, prev, pager, next, jumper"
			class="pagination"
		></el-pagination>
		<el-dialog title="新增项目" v-model="dialogVisible">
			<el-form
				:model="newProject"
				:rules="rules"
				ref="projectForm"
				label-width="100px"
			>
				<el-form-item label="项目名称" prop="projectName">
					<el-input v-model="newProject.projectName"></el-input>
				</el-form-item>
				<el-form-item label="项目编号" prop="projectNumber">
					<el-input v-model="newProject.projectNumber"></el-input>
				</el-form-item>
				<el-form-item label="项目类型" prop="category">
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
				<el-form-item label="联系人" prop="contactPerson">
					<el-input v-model="newProject.contactPerson"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="contactInfo">
					<el-input v-model="newProject.contactInfo"></el-input>
				</el-form-item>
				<el-form-item label="项目描述" prop="projectDescription">
					<el-input
						type="textarea"
						v-model="newProject.projectDescription"
					></el-input>
				</el-form-item>
				<el-form-item label="关键词" prop="projectKeywords">
					<el-input v-model="newProject.projectKeywords"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="createProject"
					>确定</el-button
				>
			</div>
		</el-dialog>

		<el-dialog title="编辑项目" v-model="dialogEdit">
			<el-form
				:model="updateProjectParams"
				:rules="rules"
				ref="editProjectForm"
				label-width="100px"
			>
				<el-form-item label="项目名称" prop="projectName">
					<el-input
						v-model="updateProjectParams.projectName"
					></el-input>
				</el-form-item>
				<el-form-item label="项目编号" prop="projectNumber">
					<el-input
						v-model="updateProjectParams.projectNumber"
					></el-input>
				</el-form-item>
				<el-form-item label="项目类型" prop="category">
					<el-select
						v-model="updateProjectParams.category"
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
				<el-form-item label="联系人" prop="contactPerson">
					<el-input
						v-model="updateProjectParams.contactPerson"
					></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="contactInfo">
					<el-input
						v-model="updateProjectParams.contactInfo"
					></el-input>
				</el-form-item>
				<el-form-item label="项目描述" prop="projectDescription">
					<el-input
						type="textarea"
						v-model="updateProjectParams.projectDescription"
					></el-input>
				</el-form-item>
				<el-form-item label="关键词" prop="projectKeywords">
					<el-input
						v-model="updateProjectParams.projectKeywords"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogEdit = false">取消</el-button>
				<el-button type="primary" @click="updateProject"
					>更新</el-button
				>
			</div>
		</el-dialog>
		<!-- 项目详情对话框 -->
		<el-dialog
			v-model="dialogVisibleLook"
			title="项目详情"
			:custom-class="'project-detail-dialog'"
		>
			<el-descriptions>
				<el-descriptions-item label="项目名称">{{
					projectDetails.projectName
				}}</el-descriptions-item>
			</el-descriptions>
			<el-descriptions column="2">
				<el-descriptions-item label="项目编号">{{
					projectDetails.projectNumber
				}}</el-descriptions-item>
				<el-descriptions-item label="项目类别">{{
					projectDetails.category
				}}</el-descriptions-item>
				<el-descriptions-item label="联系人">{{
					projectDetails.contactPerson || '无'
				}}</el-descriptions-item>
				<el-descriptions-item label="联系方式">{{
					projectDetails.contactInfo || '无'
				}}</el-descriptions-item>
				<el-descriptions-item label="创建时间">{{
					formatDate(projectDetails.initiationDate)
				}}</el-descriptions-item>

				<el-descriptions-item label="关键词">{{
					projectDetails.projectKeywords || '无'
				}}</el-descriptions-item>
			</el-descriptions>
			<el-descriptions>
				<el-descriptions-item label="项目描述">
					<div
						style="
							max-height: 40vh;
							overflow-x: auto;
							overflow-y: scroll;
						"
					>
						{{ projectDetails.projectDescription || '无' }}
					</div>
				</el-descriptions-item>
			</el-descriptions>
			<template #footer>
				<el-button @click="dialogVisibleLook = false">关闭</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="less">
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
.pagination {
	margin-top: 20px;
	display: flex;
	justify-content: center;
}
.project-info {
	/* display: flex; */
	align-items: flex-start;
}

.project-name {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3; /* 超过3行显示省略号 */
	-webkit-box-orient: vertical;
}

.project-name-keywords {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* 超过1行显示省略号 */
	-webkit-box-orient: vertical;
}
</style>
