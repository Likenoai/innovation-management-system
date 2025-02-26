/**
 * 分页搜索类
 */
export class pagingSearch {
	constructor(pageNum, pageSize) {
		this.pageNum = pageNum || 1;
		this.pageSize = pageSize || 10;
		this.total = 0;
	}

	/**
	 * 将参数转换为URL查询字符串
	 * @returns {string} 查询字符串
	 */
	toQueryString() {
		const params = new URLSearchParams();
		params.append('pageNum', this.pageNum);
		params.append('pageSize', this.pageSize);
		return params.toString();
	}

	toString() {
		return `pageNum:${this.pageNum}\npageSize:${this.pageSize}`;
	}
}
