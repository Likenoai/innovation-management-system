<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
	getDataPageApi,
	getDataByKeyApi,
	addDataApi,
	updateDataApi,
} from '@/api/staticApi.js';
// 响应式数据
const tableData = ref([]);
const total = ref(0);
const dialogVisible = ref(false);
const dialogStatus = ref('新增');

const listQuery = reactive({
	pageNum: 1,
	pageSize: 10,
	key: '',
});

const temp = reactive({
	id: undefined,
	codeName: '',
	codeKey: '',
	codeValue: '',
	codeDesc: '',
});

const rules = reactive({});

// 方法声明
const getList = async () => {
	const res = await getDataPageApi(listQuery);
	tableData.value = res.data.recordList;
	total.value = res.data.total;
};

onMounted(() => {
	getList();
});

const handleFilter = async () => {
	if (listQuery.key) {
		const res = await getDataByKeyApi(listQuery.key);
		tableData.value = [res.data];
		total.value = 1;
	} else {
		getList();
	}
};

const handlePageChange = (newPage) => {
	listQuery.pageNum = newPage;
	getList();
};

// 新增以下方法
const dataForm = ref(null); // 表单引用

// 打开新建对话框
const handleCreate = () => {
	Object.assign(temp, {
		id: undefined,
		codeName: '',
		codeKey: '',
		codeValue: '',
		codeDesc: '',
	});
	dialogStatus.value = '新增';
	dialogVisible.value = true;
};

// 打开编辑对话框
const handleUpdate = (row) => {
	Object.assign(temp, row);
	dialogStatus.value = '编辑';
	dialogVisible.value = true;
};

// 提交新增
const createData = () => {
	dataForm.value.validate((valid) => {
		if (valid) {
			addDataApi(temp).then(() => {
				dialogVisible.value = false;
				getList();
			});
		}
	});
};

// 提交更新
const updateData = () => {
	dataForm.value.validate((valid) => {
		if (valid) {
			updateDataApi(temp).then(() => {
				dialogVisible.value = false;
				getList();
			});
		}
	});
};
import { useDynamicHeight } from '@/utils/index.js';
const tableHeight = useDynamicHeight(240);
</script>

<template>
	<div class="static-mge-container">
		<!-- 搜索和新增按钮 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.key"
				placeholder="参数key"
				style="width: 200px"
				@keyup.enter="handleFilter"
			/>
			<el-button type="primary" @click="handleFilter">搜索</el-button>
			<el-button type="success" @click="handleCreate">新增</el-button>
		</div>

		<!-- 数据表格 -->
		<el-table
			:data="tableData"
			border
			fit
			highlight-current-row
			:height="tableHeight"
		>
			<el-table-column prop="id" label="ID" width="80" />
			<el-table-column prop="codeName" label="参数名称" />
			<el-table-column prop="codeKey" label="参数KEY" />
			<el-table-column prop="codeValue" label="参数值" />
			<el-table-column prop="codeDesc" label="参数描述" />
			<el-table-column prop="createTime" label="创建时间" width="160" />
			<el-table-column prop="updateTime" label="更新时间" width="160" />
			<el-table-column label="操作" width="150">
				<template #default="{ row }">
					<el-button size="mini" @click="handleUpdate(row)"
						>编辑</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<!-- 修改后的分页组件 -->
		<el-pagination
			v-model:current-page="listQuery.pageNum"
			v-model:page-size="listQuery.pageSize"
			:page-sizes="[10, 20, 30, 50]"
			:total="total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="handlePageChange"
			@current-change="handlePageChange"
		/>

		<!-- 新增/编辑对话框 -->
		<el-dialog :title="dialogStatus" v-model="dialogVisible">
			<el-form
				ref="dataForm"
				:model="temp"
				:rules="rules"
				label-width="100px"
			>
				<el-form-item label="参数名称" prop="codeName">
					<el-input v-model="temp.codeName" />
				</el-form-item>
				<el-form-item label="参数KEY" prop="codeKey">
					<el-input v-model="temp.codeKey" />
				</el-form-item>
				<el-form-item label="参数值" prop="codeValue">
					<el-input v-model="temp.codeValue" />
				</el-form-item>
				<el-form-item label="参数描述">
					<el-input v-model="temp.codeDesc" type="textarea" />
				</el-form-item>
			</el-form>

			<template #footer>
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button
					type="primary"
					@click="
						dialogStatus === '新增' ? createData() : updateData()
					"
				>
					确认
				</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="less" scoped>
.static-mge-container {
	padding: 20px;
}
/* 添加组件样式 */
.filter-container {
	margin-bottom: 20px;
}
.el-pagination {
	margin-top: 20px;
	justify-content: flex-end;
}
</style>
