import { defineStore } from 'pinia';
import { watch } from 'vue';
export const useMyLoginStore = defineStore('myLogin', {
	state: () => ({
		token: '',
		role: '',
		permissions: [],
		userName: '',
		id: '',
	}),
	persist: true,
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
		// 输出存储的数据
		toString() {
			let output = [];
			if (this.token) output.push(`Token: ${this.token}`);
			if (this.role) output.push(`用户角色: ${this.role}`);
			if (this.permissions.length)
				output.push(`权限: ${this.permissions.join(', ')}`);
			if (this.userName) output.push(`用户名: ${this.userName}`);
			if (this.id) output.push(`ID: ${this.id}`);
			return output.join('\n');
		},
	},
});
