import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/login/login.vue';
import Layout from '../layout/index.vue';
import { ElMessage } from 'element-plus';
import { useLoginStore } from '../stores/loginStore';

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/',
		component: Layout,
		redirect: '/home',
		children: [
			{
				path: 'home',
				name: 'Home',
				component: HomeView,
				meta: { requiresAuth: true },
			},
			{
				path: 'competitions',
				name: 'Competitions',
				component: () => import('../views/competitions/index.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_competitions',
				},
			},
			{
				path: 'competitions/my-competitions',
				name: 'MyCompetitions',
				component: () =>
					import('../views/competitions/MyCompetitions.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_my_competitions',
				},
			},
			{
				path: 'innovation',
				name: 'Innovation',
				component: () => import('../views/innovation/index.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_innovation_projects',
				},
			},
			{
				path: 'project-library',
				name: 'ProjectLibrary',
				component: () => import('../views/project-library/index.vue'),
				meta: {
					requiresAuth: true,
					permission: 'view_project_library',
				},
			},
			{
				path: 'users-manage',
				name: 'UsersManage',
				component: () => import('../views/usersMag/UsersMessage.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
	const loginStore = useLoginStore();
	const token = localStorage.getItem('token');
	const permissions = loginStore.permissions;

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

	next();
});

export default router;
