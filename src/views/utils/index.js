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
