import { defineStore } from 'pinia';
import { getDataByKeyApi } from '@/api/staticApi.js';
export const usePubliceStore = defineStore('publice', {
	state: () => ({
		allCollege: [],
	}),
	persist: true,
	actions: {
		async getAllCollege() {
			try {
				const response = await getDataByKeyApi('all_college');
				// 将逗号分隔的字符串转换为数组
				this.allCollege = response.data.split('，');
				console.log('Colleges fetched successfully:', this.allCollege);
			} catch (error) {
				console.error('Failed to fetch colleges:', error);
			}
		},
	},
});
