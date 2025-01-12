import { useMyLoginStore } from '@/stores/myLoginStore.js';

export default {
	mounted(el, binding) {
		const loginStore = useMyLoginStore();
		const permission = binding.value;

		// 初始检查权限
		checkPermission();

		// 监听权限变化
		const unwatch = loginStore.$watch(
			() => loginStore.permissions,
			() => {
				checkPermission();
			}
		);

		// 检查权限的函数
		function checkPermission() {
			if (loginStore.permissions.includes(permission)) {
				// 如果有权限，确保元素在DOM中
				// console.log('el.parentNode;:', el.parentNode);
				if (el.parentNode) {
					// el.parentNode.appendChild(el);
					el.parentNode.insertBefore(el, el.parentNode.firstChild);
				} else if (el.__originalParent__) {
					// el.__originalParent__.appendChild(el);
					el.__originalParent__.insertBefore(
						el,
						el.__originalParent__.firstChild
					);
				} else {
					document.body.appendChild(el); // 假设要添加到body中
				}
			} else {
				// 如果没有权限，移除元素并存储父元素
				if (el.parentNode) {
					el.__originalParent__ = el.parentNode;
					el.parentNode.removeChild(el);
				}
			}
		}

		// 在元素卸载时停止监听
		el.__vueUnwatch__ = unwatch;
	},
	unmounted(el) {
		// 清理监听器
		el.__vueUnwatch__ && el.__vueUnwatch__();
	},
};
