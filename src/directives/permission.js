import { rolePermissions } from '../config/permissions';

export const permission = {
	mounted(el, binding) {
		const { value } = binding;
		const permissions = localStorage.getItem('permissions');

		if (value && (!permissions || !permissions.includes(value))) {
			el.parentNode?.removeChild(el);
		}
	},
};
