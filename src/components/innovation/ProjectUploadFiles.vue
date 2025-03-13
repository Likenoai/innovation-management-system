<script setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMyLoginStore } from '@/stores/myLoginStore';
import { ElMessage, ElMessageBox } from 'element-plus';

const myLoginStore = useMyLoginStore();
const { token } = storeToRefs(myLoginStore);
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const route = useRoute();
const router = useRouter();

const uploadMessage = ref(null); // 用于存储上传中的提示消息引用
const isUploading = ref(false); // 标记是否正在上传文件

const handleUploadSuccess = (response) => {
	ElMessage.success('上传成功');
	emit(
		'update:modelValue',
		(() => {
			if (props.modelValue.attachment === '') {
				return response.data.fileName;
			} else {
				return (
					props.modelValue.attachment + ',' + response.data.fileName
				);
			}
		})()
	);

	// 关闭上传中的提示
	if (uploadMessage.value) {
		uploadMessage.value.close();
	}
	isUploading.value = false; // 重置上传状态
};

const handleUploadProgress = (event) => {
	console.log(event);
	// 创建一个可关闭的提示消息，并存储其引用
	uploadMessage.value = ElMessage({
		message: `上传中，禁止关闭或切换页面，请等待上传完成`,
		type: 'info',
		duration: 0, // 持续显示，直到手动关闭
	});
	isUploading.value = true; // 设置正在上传状态
};

const handleUploadError = (error) => {
	ElMessage.error('上传失败，请重试');
	if (uploadMessage.value) {
		uploadMessage.value.close();
	}
	isUploading.value = false; // 重置上传状态
};

const cancelUpload = () => {
	// 关闭上传中的提示
	if (uploadMessage.value) {
		uploadMessage.value.close();
	}
	isUploading.value = false; // 重置上传状态
};

// 监听路由变化
const beforeRouteLeave = (to, from, next) => {
	if (isUploading.value) {
		ElMessageBox.confirm('文件正在上传，确定要离开吗？', '提示', {
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: '确定',
			cancelButtonText: '取消',
		})
			.then(() => {
				cancelUpload(); // 取消上传
				next(); // 确认离开
			})
			.catch(() => {
				next(false); // 取消离开
			});
	} else {
		next(); // 没有上传，直接离开
	}
};

// 监听页面关闭
const beforeUnload = (event) => {
	if (isUploading.value) {
		event.preventDefault();
		event.returnValue = '文件正在上传，确定要离开吗？'; // 兼容浏览器的提示框
		cancelUpload(); // 取消上传
	}
};

onMounted(() => {
	// 监听路由变化
	router.beforeEach(beforeRouteLeave);
	// 监听页面关闭
	window.addEventListener('beforeunload', beforeUnload);
});

onUnmounted(() => {
	// 移除监听
	router.beforeEach(() => {});
	window.removeEventListener('beforeunload', beforeUnload);
});
</script>
<template>
	<el-form>
		<el-divider content-position="left">
			<h1>附件上传</h1>
		</el-divider>
		<el-form-item label="上传文件">
			<el-upload
				action="/api/file/upload"
				:on-success="handleUploadSuccess"
				:on-progress="handleUploadProgress"
				:on-error="handleUploadError"
				name="file"
				show-file-list
				:headers="{ 'SC-TOKEN': 'Bearer ' + token }"
			>
				<el-button type="primary">上传文件</el-button>
			</el-upload>
		</el-form-item>
	</el-form>
</template>
