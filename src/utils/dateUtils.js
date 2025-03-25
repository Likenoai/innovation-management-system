import dayjs from 'dayjs';

export const formateTime = (isoTime) => {
	if (!isoTime) return '--';
	return dayjs(isoTime).format('YYYY-MM-DD');
};

/**
 * 判断当前时间是否在指定时间之后
 * @function
 * @param {string|null} timeString - 目标时间字符串，格式应为YYYY-MM-DD HH:mm:ss
 * @returns {boolean} 返回判断结果：
 *   - true: 当前时间在目标时间之后，或时间字符串无效/为空
 *   - false: 当前时间在目标时间之前
 * @example
 * // 有效时间判断
 * isAfterCurrentTime('2024-03-01 12:00:00'); // 根据当前时间返回true或false
 * @example
 * // 无效情况处理
 * isAfterCurrentTime(null);       // 返回true
 * isAfterCurrentTime('invalid');  // 返回true
 */
export const isAfterCurrentTime = (timeString) => {
	if (!timeString) return true; // 空值视为已过期
	try {
		const targetTime = new Date(timeString);
		return Date.now() > targetTime.getTime();
	} catch {
		return true; // 无效时间视为已过期
	}
};
