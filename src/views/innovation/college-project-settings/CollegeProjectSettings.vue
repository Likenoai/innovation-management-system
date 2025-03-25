<script setup>
import { useDynamicHeight } from '@/utils/tableUtils.js';
import { ref } from 'vue';
let tableHeight = useDynamicHeight(100);
import { useMyLoginStore } from '../../../stores/myLoginStore';
const myLoginStore = useMyLoginStore();
const currentCollege = myLoginStore.userInfo.college;
</script>

<template>
	<div class="college-project-settings">
		<el-header>
			<el-row :gutter="10">
				<el-col :span="6"
					><h1>{{ currentCollege }}项目表</h1></el-col
				>
			</el-row>
		</el-header>
		<el-main :style="`height: ${tableHeight}px;`">
			<router-view />
		</el-main>
	</div>
</template>

<style scoped>
.el-header {
	height: 26px;
}
.el-main {
	height: calc(100% - 26px);
}
.college-project-settings {
	padding: 20px;
	height: 100%;
}
</style>
