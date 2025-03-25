// overflow-detector.js
import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * 创建溢出检测指令
 * @param {Object} options 配置选项
 * @param {Function} [options.onOverflow] 溢出状态变化回调
 * @param {string} [options.direction='width'] 检测方向 (width/height)
 * @returns {Object} Vue自定义指令对象
 */
export function createOverflowDetector(options = {}) {
	// 参数校验
	if (typeof options !== 'object') {
		throw new Error('Options must be an object');
	}

	const { onOverflow = () => {}, direction = 'width' } = options;

	// 浏览器兼容性检测
	const isResizeObserverSupported = typeof ResizeObserver !== 'undefined';
	if (!isResizeObserverSupported) {
		console.warn('ResizeObserver is not supported in this browser');
	}

	// 检测逻辑抽象
	const checkOverflow = (el) => {
		try {
			if (direction === 'width') {
				return el.scrollWidth > el.clientWidth;
			}
			return el.scrollHeight > el.clientHeight;
		} catch (error) {
			console.error('Overflow check failed:', error);
			return false;
		}
	};

	return {
		mounted(el, binding) {
			if (!isResizeObserverSupported) return;

			const callback = binding.value || onOverflow;
			let observer;
			// 初始化状态记录
			el._lastOverflowState = null;
			const safeCheck = () => {
				try {
					const isOverflow = checkOverflow(el);
					// 仅当状态变化时触发回调
					if (el._lastOverflowState !== isOverflow) {
						callback(isOverflow);
						el._lastOverflowState = isOverflow;
					}
				} catch (error) {
					console.error('Overflow callback error:', error);
				}
			};

			// 初始检测
			safeCheck();

			// 创建观察器
			try {
				observer = new ResizeObserver(safeCheck);
				observer.observe(el);
				el._overflowObserver = observer;
			} catch (error) {
				console.error('ResizeObserver initialization failed:', error);
			}
		},
		updated(el, binding) {
			if (!isResizeObserverSupported) return;

			const callback = binding.value || onOverflow;
			try {
				const isOverflow = checkOverflow(el);
				// 检查状态变化
				if (el._lastOverflowState !== isOverflow) {
					callback(isOverflow);
					el._lastOverflowState = isOverflow;
				}
			} catch (error) {
				console.error('Update check failed:', error);
			}
		},

		beforeUnmount(el) {
			if (el._overflowObserver) {
				el._overflowObserver.disconnect();
				delete el._overflowObserver;
			}
		},
	};
}

// 默认导出指令（宽度检测）
export const vOverflow = createOverflowDetector();

// 获取表格的高度
export const handleTableHeight = (val = 200) => {
	return window.innerHeight - val;
};

export function useDynamicHeight(offset = 320) {
	const height = ref('0px');

	function updateHeight() {
		const windowHeight = window.innerHeight;
		height.value = `${windowHeight - offset}px`;
	}

	onMounted(() => {
		updateHeight();
		window.addEventListener('resize', updateHeight);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', updateHeight);
	});

	return height;
}

/**
 * 创建带有首次调用标记的高阶函数
 * @param {Function} originalFunc - 需要包装的原始函数
 * @returns {Function} 包装后的新函数，带有isFirstCall属性
 */
export function withFirstCall(originalFunc) {
	let isFirstCall = true;
	return function (...args) {
		const result = originalFunc.call(this, isFirstCall, ...args);
		isFirstCall = false;
		return result;
	};
}
