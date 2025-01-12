<script setup>
import { defineProps, ref, defineEmits, watch, toRef, computed } from 'vue';
import { Close } from '@element-plus/icons-vue';

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	visible: {
		type: Boolean,
		default: false,
	},
	singlePageMode: {
		type: Boolean,
		default: true,
	},
});

const emits = defineEmits(['update:visible']);

const bodyClass = ref('show-flex');
const visibleRef = toRef(props, 'visible');

// 计算样式
const cardStyle = computed(() => ({
	transition: props.singlePageMode ? '0s' : '0.3s ease',
}));

function hideCard() {
	bodyClass.value = 'hide-flex';
	setTimeout(() => {
		emits('update:visible', false);
	}, 300);
}

watch(visibleRef, (newVal) => {
	bodyClass.value = newVal ? 'show-flex' : 'hide-flex';
});
</script>

<template>
	<el-card class="user-manage-card" :class="bodyClass" :style="cardStyle">
		<el-icon v-if="visible" @click="hideCard" class="close-button"
			><Close
		/></el-icon>
		<div class="user-manage-card-title">
			{{ title }}
		</div>
		<div class="user-manage-actions">
			<slot name="actions"></slot>
		</div>
		<slot name="table"></slot>
	</el-card>
</template>

<style scoped>
.show-flex {
	flex: 1;
}
.hide-flex {
	height: 10px;
	border: 10px solid #ffffff;
	flex: 0;
}
.user-manage-card {
	max-width: 100%;
	overflow: hidden;
	position: relative;
	.user-manage-card-title {
		font-size: 18px;
		font-weight: bold;
		padding: 10px;
		width: 100%;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.close-button {
		position: absolute;
		right: 10px;
		top: 10px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 24px;
		color: #9999998a;
		&:hover {
			color: rgb(121, 187, 255);
		}
	}
	.user-manage-actions {
		width: 100%;
		padding: 10px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-bottom: 20px;
		height: 80px;
		transition: all 0.3s ease;
	}
}
::v-deep(.user-content) {
	margin: 0 auto;
	max-width: 420px;
}
</style>
