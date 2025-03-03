import { createApp } from 'vue';
import router from '@/router/index.js';
import pinia from '@/stores/index.js';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import permission from './directives/permission';
import { setupInterceptors } from './api/interceptors';
import VuePdfEmbed from 'vue-pdf-embed';
import { createOverflowDetector } from '@/utils/index.js';
// 样式导入
import 'vue-pdf-embed/dist/styles/annotationLayer.css';
import 'vue-pdf-embed/dist/styles/textLayer.css';

const app = createApp(App);
// 方式2：自定义配置
const heightDetector = createOverflowDetector({
	direction: 'height',
	onOverflow: (isOverflow) => {
		console.log('Height overflow:', isOverflow);
	},
});
const widthDetector = createOverflowDetector({
	direction: 'width',
	onOverflow: (isOverflow) => {
		console.log('Width overflow:', isOverflow);
	},
});
app.directive('width-overflow', widthDetector);
app.directive('height-overflow', heightDetector);
app.component('VuePdfEmbed', VuePdfEmbed);
app.directive('permission', permission);

app.use(router)
	.use(ElementPlus, {
		locale: zhCn,
	})
	.use(pinia)
	.mount('#app');

setupInterceptors(router);
export { pinia };
