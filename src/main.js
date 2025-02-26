import { createApp } from 'vue';
import pinia from '@/stores/index.js';
import './style.css';
import App from './App.vue';
import router from '@/router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import permission from './directives/permission';
import { setupInterceptors } from './api/interceptors';
import VuePdfEmbed from 'vue-pdf-embed';

// 样式导入
import 'vue-pdf-embed/dist/styles/annotationLayer.css';
import 'vue-pdf-embed/dist/styles/textLayer.css';

const app = createApp(App);

// ✅ 安全设置表格默认对齐方式
// if (!ElTable.props.align) {
// 	ElTable.props.align = { type: String };
// }
// ElTable.props.align.default = 'center';

app.component('VuePdfEmbed', VuePdfEmbed);
app.directive('permission', permission);

app.use(pinia)
	.use(router)
	.use(ElementPlus, {
		locale: zhCn,
	})
	.mount('#app');

setupInterceptors();
export { pinia };
