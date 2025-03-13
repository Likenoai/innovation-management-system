import dayjs from 'dayjs';

export const formateTime = (isoTime) => {
	if (!isoTime) return '--';
	return dayjs(isoTime).format('YYYY-MM-DD');
};
