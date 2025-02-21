import { defineStore } from 'pinia';
import { watch } from 'vue';

export const useMyLoginStore = defineStore('myLogin', {
	state: () => ({
		token: '',
		role: '',
		permissions: [],
		account: '',
		id: '',
	}),
	persist: true,
	actions: {
		logout() {
			this.token = '';
			this.role = '';
			this.permissions = [];
			this.account = '';
			this.id = '';
		},

		// 自定义 $watch 方法
		$watch(source, callback) {
			return watch(source, callback, { deep: true });
		},

		// 设置用户信息
		setUserInfo({ id, roleId, token, username }) {
			this.id = id;
			this.token = token;
			this.role = roleId;
			this.account = username;
		},

		// 输出存储的数据
		toString() {
			let output = [];
			if (this.token) output.push(`Token: ${this.token}`);
			if (this.role) output.push(`用户角色: ${this.role}`);
			if (this.permissions.length)
				output.push(`权限: ${this.permissions.join(', ')}`);
			if (this.account) output.push(`用户名: ${this.account}`);
			if (this.id) output.push(`ID: ${this.id}`);
			return output.join('\n');
		},
		logSelt() {
			console.log(this.toString());
		},
	},
});
