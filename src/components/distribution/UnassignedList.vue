<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['experts', 'projects']);
const emit = defineEmits(['assign']);

// 分配专家到项目
const assignExpert = (expert, project) => {
	emit('assign', { expert, project });
};
</script>

<template>
	<el-row :gutter="20" class="table-container">
		<!-- 待分配专家 -->
		<el-col :span="12" class="table-col">
			<el-card>
				<h3>待分配专家</h3>
				<el-table :data="props.experts" border>
					<el-table-column prop="name" label="姓名" width="150" />
					<el-table-column
						prop="personnelCode"
						label="工号"
						width="120"
					/>
					<el-table-column prop="college" label="学院" width="180" />
					<el-table-column prop="subject" label="学科" width="180" />
					<el-table-column label="操作" width="120" fixed="right">
						<template #default="{ row }">
							<el-button
								type="primary"
								size="small"
								@click="assignExpert(row, null)"
								>分配</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</el-col>

		<!-- 待分配项目 -->
		<el-col :span="12" class="table-col">
			<el-card>
				<h3>待分配项目</h3>
				<el-table :data="props.projects" border>
					<el-table-column
						prop="projectName"
						label="项目名称"
						width="200"
					/>
					<el-table-column
						prop="projectType"
						label="类型"
						width="120"
					/>
					<el-table-column
						prop="projectCategory"
						label="类别"
						width="150"
					/>
					<el-table-column
						prop="projectLevel"
						label="级别"
						width="120"
					/>
					<el-table-column
						prop="primaryDiscipline"
						label="一级学科"
						width="150"
					/>
					<el-table-column
						prop="secondaryDiscipline"
						label="二级学科"
						width="150"
					/>
					<el-table-column
						prop="requestedFunding"
						label="申请金额 (元)"
						width="150"
					/>
					<el-table-column
						prop="approvedFunding"
						label="获批金额 (元)"
						width="150"
					/>
					<el-table-column
						prop="projectDuration"
						label="周期 (月)"
						width="120"
					/>
					<el-table-column
						prop="dutyName"
						label="负责人"
						width="120"
					/>
					<el-table-column
						prop="dutyCollege"
						label="负责人学院"
						width="180"
					/>
					<el-table-column
						prop="sourceName"
						label="项目来源"
						width="200"
					/>
					<el-table-column label="操作" width="120" fixed="right">
						<template #default="{ row }">
							<el-button
								type="success"
								size="small"
								@click="assignExpert(null, row)"
								>分配</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</el-col>
	</el-row>
</template>

<style scoped>
/* 默认情况下，表格左右并排 */
.table-container {
	display: flex;
	flex-wrap: wrap;
}

/* 小屏幕（最大宽度 < 768px）时，表格改为一列 */
@media (max-width: 768px) {
	.table-col {
		flex: 0 0 100%;
		max-width: 100%;
	}
}
</style>
