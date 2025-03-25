<script setup lang="js">
import { useDynamicHeight } from '@/utils/tableUtils.js';
let tableHeight = useDynamicHeight(100);
</script>
<template>
	<div class="school-project-settings-container">
		<el-header>
			<el-row :gutter="10">
				<el-col :span="6"> <h1>校级评审</h1></el-col>
			</el-row>
		</el-header>
		<el-main :style="`height: ${tableHeight}px;`">
			<router-view />
		</el-main>
	</div>
</template>

<style lang="less" scoped>
.school-project-settings-container {
	height: 100%;
	width: 100%;
	padding: 20px;
}
.el-header {
	height: 26px;
}
.el-main {
	height: calc(100% - 26px);
}
</style>
