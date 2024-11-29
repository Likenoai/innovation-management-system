import { defineStore } from 'pinia';
import { watch } from 'vue';

export const useLoginStore = defineStore('login', {
	state: () => ({
		token: '',
		userRole: '',
		permissions: [],
		userName: '',
		id: '',
	}),
	actions: {
		logout() {
			this.token = '';
			this.userRole = '';
			this.permissions = [];
			this.userName = '';
			this.id = '';
		},
		// 自定义 $watch 方法
		$watch(source, callback) {
			return watch(source, callback, { deep: true });
		},
	},
	persist: true, // 启用持久化
});
