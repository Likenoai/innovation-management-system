import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from '@/router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { permission } from './directives/permission';
import zhCn from 'element-plus/es/locale/lang/zh-cn'; // 引入中文语言包
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
app.use(pinia)
	.use(router)
	.use(ElementPlus, {
		locale: zhCn, // 设置语言为中文
	})
	.use(permission)
	.mount('#app');
