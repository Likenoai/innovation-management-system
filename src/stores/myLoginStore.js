import { defineStore } from 'pinia';
import { watch } from 'vue';

export const useMyLoginStore = defineStore('myLogin', {
	state: () => ({
		token: '',
		role: '',
		permissions: [],
		account: '',
		id: '',
		userInfo: {
			// 使用对象集中管理用户信息
			id: '',
			account: '',
			name: '',
			personnelCode: '',
			college: null,
			subject: '',
			unit: '',
			schoolFlag: null,
			studentFlag: null,
		},
	}),
	persist: true,
	actions: {
		// 设置完整的用户信息
		setDetailUserInfo(payload) {
			this.userInfo = {
				id: payload.id,
				account: payload.account || '',
				name: payload.name || '',
				personnelCode: payload.personnelCode || '',
				college: payload.college || null,
				subject: payload.subject || '',
				unit: payload.unit || '',
				schoolFlag: payload.schoolFlag ?? null,
				studentFlag: payload.studentFlag ?? null,
			};
		},
		// 设置用户信息
		async setUserInfo({ id, roleId, token, username }) {
			this.id = id;
			this.token = token;
			this.role = roleId;
			this.account = username;
		},
		// 清除所有状态
		logout() {
			this.$reset(); // 使用 Pinia 内置重置方法
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
			if (this.account) output.push(`用户名: ${this.account}`);
			if (this.id) output.push(`ID: ${this.id}`);
			return output.join('\n');
		},
		logSelt() {
			console.log(this.toString());
		},
	},
});
