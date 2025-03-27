import * as staticApi from '@/api/staticApi.js';
import { isAfterCurrentTime } from './dateUtils';

// 将异步操作封装到函数中
export async function checkCollegeEndTime() {
	const collegeEndTime = await staticApi.getDataByKeyApi(
		'all_college_end_time',
	);
	return !isAfterCurrentTime(collegeEndTime);
}
export async function isExist(key) {
	return await staticApi
		.getDataByKeyApi(key, { display: false })
		.then((item) => {
			return item.code === 200 ? true : false;
		});
}

export async function initStatic({
	codeKey,
	codeName = 'codeName占位符',
	codeValue = null,
	codeDesc = null,
}) {
	const exist = await isExist(codeKey);
	if (!exist) {
		await staticApi.addDataApi({ codeName, codeKey, codeValue, codeDesc });
	}
}
