import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useMyLoginStore } from '../stores/myLoginStore.js';
import { defineAsyncComponent } from 'vue';
import routes from './routes.js';
const router = createRouter({
	history: createWebHistory(),
	routes,
});

// // 路由守卫
// router.beforeEach((to, from, next) => {
// 	const loginStore = useMyLoginStore();
// 	const token = loginStore.token;
// 	const permissions = loginStore.permissions;

// 	// console.log('router token:', token);
// 	// console.log('loginStore.role:', loginStore.role);

// 	if (to.path === '/login') {
// 		if (token) {
// 			next('/');
// 		} else {
// 			next();
// 		}
// 		return;
// 	}

// 	if (to.matched.some((record) => record.meta.requiresAuth)) {
// 		if (!token) {
// 			next('/login');
// 			return;
// 		}

// 		// 检查权限
// 		if (to.meta.permission) {
// 			if (!permissions || !permissions.includes(to.meta.permission)) {
// 				ElMessage.error('没有访问权限');
// 				next(false);
// 				return;
// 			}
// 		}
// 	}

// 	next();
// });

export default router;
