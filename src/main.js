import { createApp } from 'vue';
import pinia from '@/stores/index.js';
import './style.css';
import App from './App.vue';
import router from '@/router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'; // 引入中文语言包
import permission from './directives/permission';
import { setupInterceptors } from './api/interceptors';

// 使用pdf
import VuePdfEmbed from 'vue-pdf-embed';

// optional styles
import 'vue-pdf-embed/dist/styles/annotationLayer.css';
import 'vue-pdf-embed/dist/styles/textLayer.css';

const app = createApp(App);
app.component('VuePdfEmbed', VuePdfEmbed);
app.directive('permission', permission);
app.use(pinia)
	.use(router)
	.use(ElementPlus, {
		locale: zhCn, // 设置语言为中文
	})
	.mount('#app');
setupInterceptors();
export { pinia }; // 导出 pinia 实例
