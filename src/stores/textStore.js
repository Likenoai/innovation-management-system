import { defineStore } from 'pinia';

export const useTextStore = defineStore('text', {
	state: () => ({
		text: 'Hello, Pinia!',
	}),
	persist: true,
});
