// 自动配置 views 文件夹下的路由文件
const path = import.meta.glob('../views/**/page.js', {
	eager: true,
	import: 'default',
});
const componentVue = import.meta.glob('../views/**/*.vue');

const children = Object.entries(path).map(([path, meta], index, arr) => {
	const pathVue = path.replace('page.js', 'index.vue');
	console.log(pathVue);
	path = path.replace('../views', '').replace('/page.js', '');
	const name = path.split('/').filter(Boolean).join('-');
	const component = componentVue[pathVue];
	console.log(index);
	console.log(arr);
	return {
		path,
		meta,
		name,
		component,
	};
});
export const routes = [];
routes.push({
	path: '/',
	component: () => import('../layout/index.vue'),
	redirect: '/home',
	children,
});
routes.push({
	path: '/login',
	component: () => import('../views/login/index.vue'),
	meta: {
		requiresAuth: false,
	},
});
