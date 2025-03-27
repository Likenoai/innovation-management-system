<!-- eslint-disable vue/no-lone-template -->
<script setup>
import { ref, onMounted } from "vue";
import * as staffApi from "@/api/staffApi.js";
import { ElMessage } from "element-plus";
import { useMyLoginStore } from "../../../stores/myLoginStore";
import * as staticApi from "@/api/staticApi.js";
import * as contestApi from "@/api/contestApi.js";
// 时间管理数据

const myLoginStore = useMyLoginStore();
// 评审管理数据

const college = myLoginStore.userInfo.college;
const codeKeyApplyEnd = "apply_end_time" + college;
const codeKeyCollegeStart = "college_review_start_time" + college;
const applyEndTime = ref("");
const collegeStartTime = ref("");

// 初始化数据 S
const getApplyEndTime = async () => {
  const response = await staticApi.getDataByKeyApi(codeKeyApplyEnd);
  applyEndTime.value = response.data;
  return response;
};

const getCollegeStartTime = async () => {
  const response = await staticApi.getDataByKeyApi(codeKeyCollegeStart);
  collegeStartTime.value = response.data;
  return response;
};
onMounted(() => {
  getApplyEndTime();
  getCollegeStartTime();
});
// 初始化数据 E

// 时间管理方法 S
const updataApplyEndTime = async () => {
  // 添加时间比较
  if (new Date(applyEndTime.value) >= new Date(collegeStartTime.value)) {
    applyEndTime.value = "";
    ElMessage.error("申请截止时间必须早于院级评审开始时间");
    return;
  }
  await staticApi
    .updateDataApi(
      {
        codeKey: codeKeyApplyEnd,
        codeValue: applyEndTime.value,
      },
      {
        successMsg: "申请书截至时间修改成功",
      },
    )
    .then(() => {
      contestApi.assignApplyTimeApi({
        applyDateTime: applyEndTime.value,
      });
    });
};
const updateCollegeStartTime = async () => {
  // 添加时间比较
  if (new Date(collegeStartTime.value) <= new Date(applyEndTime.value)) {
    collegeStartTime.value = "";
    ElMessage.error("院级评审开始时间必须晚于申请截止时间");
    return;
  }
  await staticApi.updateDataApi(
    {
      codeKey: codeKeyCollegeStart,
      codeValue: collegeStartTime.value,
    },
    {
      successMsg: "院级评审开始时间修改成功",
    },
  );
};
// 时间管理方法 E

// 评审专家管理 S
// 处理分页
const expertPaging = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
const experts = ref([]); // 存储所有专家
const reviewExperts = ref([]); // 存储评审专家
const getExperts = async () => {
  const response = await staffApi.getCollegeExpertsApi({
    college: myLoginStore.userInfo.college,
  });

  expertPaging.value.total = response.data.length;
  const res = await contestApi.getAssignExpertScoreApi();
  // 处理 null 值并创建 ID 映射表
  const resData = res.data || [];
  const idMap = new Set(resData);
  // 通过映射表快速判断
  experts.value = response.data.map((expert) => ({
    ...expert,
    isCancel: !idMap.has(expert.personnelCode), // O(1) 时间复杂度查询
  }));
  reviewExperts.value = experts.value.filter((expert) => !expert.isCancel);
};
onMounted(() => {
  getExperts();
});

const assignToExpertScore = async (row) => {
  const res = await contestApi.assignToExpertScoreApi({
    personnelCode: row.personnelCode,
    isCancel: row.isCancel,
  });
  if (res.code === 500) {
    ElMessage.error(res.msg);
    row.isCancel = !row.isCancel;
  }
};

import { withFirstCall } from "@/utils/index.js";
const reviewProject = ref([]);
// 学院管理员获取院级/校级 打分/未打分的项目集合
const getScoreProject = withFirstCall(async (isFirstCall) => {
  staticApi.updateDataApi(
    {
      codeKey: "allot" + college,
      codeValue: "1",
    },
    {
      successMsg: null,
    },
  );
  const res1 = await contestApi.getScoreProjectsByCollegeApi({
    type: "0", // 0 院级 1 校级
    status: "1", // 0 未打分 1 已打分
    college: college,
  });
  const res2 = await contestApi.getScoreProjectsByCollegeApi({
    type: "0", // 0 院级 1 校级
    status: "0", // 0 未打分 1 已打分
    college: college,
  });
  const res1Data = res1.data.recordList || [];
  const res = res1Data.concat(res2.data.recordList);
  reviewProject.value = res;
  if (isAllot.value) {
    if (!isFirstCall) ElMessage.success("已分配");
    return;
  } else {
    ElMessage.success("分配成功");
  }
});
// 单元格合并
const handleSpan = ({ columnIndex, rowIndex }) => {
  // 只处理第二列
  if (columnIndex === 1) {
    // 首行合并所有行
    if (rowIndex === 0) {
      return {
        rowspan: reviewExperts.value.length,
        colspan: 1,
      };
    }
    // 其他行隐藏
    return { rowspan: 0, colspan: 0 };
  }
  // 其他列保持正常
  return { rowspan: 1, colspan: 1 };
};

import { useDynamicHeight } from "@/utils/tableUtils.js";
const tableHeight = useDynamicHeight(360);
const isAllot = ref(true);
// 除了是否分配
const getAllot = async () => {
  const key = "allot" + college;
   await staticApi.getDataByKeyApi(key).then((res) => {
    switch (res.data) {
      case null:
        staticApi
          .addDataApi({
            codeName: `${college}院级是否分配的标识`,
            codeKey: key,
            codeValue: "0",
            codeDesc: `${college}院级是否分配的标识`,
          })
          .then(() => {
            getAllot();
          });
        break;
      case "0":
        isAllot.value = false;
        break;
      case "1":
        isAllot.value = true;
        getScoreProject();
        break;
    }
  });
};
onMounted(() => {
  getAllot();
});
import { useRouter } from "vue-router";
const router = useRouter();
// 路由跳转
const goProjectTableMgs = () => {
  router.push({
    name: "project-table-Mges",
  });
};
</script>

<template>
	<div class="settings-container">
		<el-card shadow="never" style="height: 100%">
			<el-tabs
				type="border-card"
				style="height: 100%"
				@tab-click="
					(tab) => {
						tab.props.label === '返回' && goProjectTableMgs();
					}
				"
			>
				<!-- 时间管理 -->
				<el-tab-pane label="时间管理">
					<el-form label-width="160px">
						<el-form-item label="申请书截止时间">
							<el-date-picker
								v-model="applyEndTime"
								type="datetime"
								placeholder="选择截止时间"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
							<el-button
								style="margin-left: 10px"
								type="primary"
								plain
								@click="updataApplyEndTime"
							>确定</el-button
							>
						</el-form-item>

						<el-form-item label="院级评审开始时间">
							<el-date-picker
								v-model="collegeStartTime"
								type="datetime"
								placeholder="选择开始时间"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
							<el-button
								style="margin-left: 10px"
								type="primary"
								plain
								@click="updateCollegeStartTime"
							>确定</el-button
							>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<!-- 评审管理 -->
				<el-tab-pane label="评审专家管理">
					<div class="expert-management">
						<el-table :data="experts" :min-height="tableHeight" class="mt-20">
							<el-table-column prop="name" label="专家姓名" />
							<el-table-column label="评审" width="120">
								<template #default="scope">
									<el-switch
										:model-value="!scope.row.isCancel"
										style="
                      --el-switch-off-color: #dcdfe6;
                      --el-switch-on-color: #13ce66;
                      --el-color-primary: #13ce66;
                    "
										@update:model-value="
											(val) => {
												scope.row.isCancel = !val;
												assignToExpertScore(scope.row);
											}
										"
									/>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-tab-pane>
				<!-- 评审项目分配 -->
				<el-tab-pane label="评审项目分配">
					<el-button
						type="primary"
						style="margin-bottom: 10px; margin-left: 20px"
						@click="getScoreProject"
					>自动分配</el-button
					>
					<div class="expert-management">
						<el-table
							:data="reviewExperts"
							:span-method="handleSpan"
							stripe
							:height="tableHeight"
						>
							<el-table-column prop="name" label="专家姓名" />
							<el-table-column label="评审项目">
								<template #default> <!-- 添加插槽指令 -->
									<div 
										style="
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            height: 100px;
                            overflow-y: scroll;
                        ">
										<div v-for="(item, index) in reviewProject" :key="item.projectName">
											{{ index + 1 }} {{ item.projectName }}
										</div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-tab-pane>
				<el-tab-pane label="返回" />
			</el-tabs>
		</el-card>
	</div>
</template>

<style scoped>
.settings-container {
  padding: 20px;
  height: 100%;
  background: #f5f7fa;
  :deep(.el-card__body) {
    height: 100%;
  }
  :deep(.el-tabs__content) {
    padding: 20px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .expert-management {
    padding: 0 20px;
  }
}
</style>
