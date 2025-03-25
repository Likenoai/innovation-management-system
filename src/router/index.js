import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useMyLoginStore } from '../stores/myLoginStore.js';
import { defineAsyncComponent } from 'vue';
import { getDataByKeyApi } from '@/api/staticApi.js';
import { isAfterCurrentTime } from '../utils/dateUtils.js';
import routes from './routes.js';

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// // 路由守卫
router.beforeEach((to, from, next) => {
	const loginStore = useMyLoginStore();
	const token = loginStore.token;
	const permissions = loginStore.permissions;
	const college = loginStore.userInfo.college;
	if (to.path === '/login') {
		if (token) {
			next('/');
		} else {
			next();
		}
		return;
	}

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!token) {
			next('/login');
			return;
		}

		// 检查权限
		if (to.meta.permission) {
			if (!permissions || !permissions.includes(to.meta.permission)) {
				ElMessage.error('没有访问权限');
				next(false);
				return;
			}
		}
	}

	if (to.path === '/expert-review') {
		// 检查是否有项目
		getDataByKeyApi('college_review_start_time' + college).then((res) => {
			if (!isAfterCurrentTime(res.data)) {
				ElMessage.error('评审时间未开始');
			} else {
				next();
			}
		});
		return;
	}

	next();
});

export default router;
