/**
 * 处理文件下载
 *
 * @param {string} src - 文件的 URL 地址，指向要下载的文件。
 * @param {string} name - 下载时显示的文件名。
 */
export const handleDownload = (src, name) => {
	const link = document.createElement('a');
	link.href = src;
	link.download = name;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

/**
 * Validator 类用于验证输入数据的规则集合。
 */
export class Validator {
	/**
	 * 创建一个 Validator 实例。
	 * @param {Array} rules - 验证规则数组，默认为空数组。
	 */
	constructor(rules = []) {
		this.rules = rules; // 存储验证规则
	}

	/**
	 * 添加新的验证规则
	 * @param {string} field - 要验证的字段名
	 * @param {function} validator - 验证函数，接收值返回boolean
	 * @param {string} message - 验证失败时的错误信息
	 */
	addRule(field, validator, message) {
		this.rules.push({
			field,
			validate: validator,
			message,
		});
	}

	/**
	 * 执行验证
	 * @param {object} params - 要验证的参数对象
	 * @returns {object} 包含验证错误信息的对象（字段为键，错误数组为值）
	 */
	validate(params) {
		const errors = {};
		for (const rule of this.rules) {
			const value = params[rule.field];
			const isValid = rule.validate(value);

			if (!isValid) {
				if (!errors[rule.field]) {
					errors[rule.field] = [];
				}
				errors[rule.field].push(rule.message);
			}
		}
		return errors;
	}
}

export const Validators = {
	// 必填验证
	required: (message = '必填字段') => ({
		validate: (value) => !!value?.trim(),
		message,
	}),

	// 最小长度验证
	minLength: (min, message) => ({
		validate: (value) => value?.length >= min,
		message: message || `长度不能小于${min}个字符`,
	}),

	// 最大长度验证
	maxLength: (max, message) => ({
		validate: (value) => value?.length <= max,
		message: message || `长度不能超过${max}个字符`,
	}),

	// 正则表达式验证
	pattern: (regex, message) => ({
		validate: (value) => regex.test(value),
		message: message || '格式不符合要求',
	}),
};
