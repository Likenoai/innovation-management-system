import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from '@/router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { permission } from './directives/permission';
// 注册全局自定义指令 v-log

const pinia = createPinia();
const app = createApp(App);
app.directive('log', {
	mounted: (el) => {
		// setTimeout(() => {
		el.addEventListener('click', () => {
			console.log('点击了');
			console.log(el);
		});
		// }, 0);
	},
});
app.use(pinia).use(router).use(ElementPlus).use(permission).mount('#app');
