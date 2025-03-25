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
		setDetailUserInfo(data) {
			this.userInfo = {
				id: data.id,
				name: data.name,
				account: data.account || data.personnelCode || data.studentId,
				role: data.role, // 根据角色动态设置
				college: data.college || data.currentUnit,
				unit: data.currentUnit || '',
				majorName: data.majorName || '',
				studentId: data.studentId || '',
				personnelCode: data.personnelCode || '',
				gender: data.gender || '',
				ethnicity: data.ethnicity || '',
				birthDate: data.birthDate || '',
				highestDegree: data.highestDegree || '',
				highestEducation: data.highestEducation || '',
				professionalTitle: data.professionalTitle || '',
				rankLevel: data.rankLevel || '',
				className: data.className || '',
				educationLevel: data.educationLevel || '',
				grade: data.grade || '',
				registerFlag: data.registerFlag,
				createTime: data.createTime,
				updateTime: data.updateTime,
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
