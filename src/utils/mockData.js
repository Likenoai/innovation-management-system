function generateRandomProjects(num) {
	const projectTypes = ['创新', '创业'];
	const projectCategories = ['科技', '人文', '艺术'];
	const levels = ['国家级', '省级', '大学级'];
	const names = [
		'项目 A',
		'项目 B',
		'项目 C',
		'项目 D',
		'项目 E',
		'项目 F',
		'项目 G',
		'项目 H',
		'项目 I',
		'项目 J',
		'项目 K',
		'项目 L',
		'项目 M',
		'项目 N',
		'项目 O',
		'项目 P',
		'项目 Q',
		'项目 R',
		'项目 S',
		'项目 T',
	];

	const projects = [];
	for (let i = 0; i < num; i++) {
		projects.push({
			id: i + 1,
			projectName: names[i % names.length],
			leader: `负责人 ${i + 1}`,
			level: levels[Math.floor(Math.random() * levels.length)],
			type: projectTypes[Math.floor(Math.random() * projectTypes.length)],
			category:
				projectCategories[
					Math.floor(Math.random() * projectCategories.length)
				],
			expert: [],
		});
	}
	return projects;
}

function generateRandomExperts(num) {
	const expertTypes = ['创新', '创业'];
	const expertCategories = ['科技', '人文', '艺术'];
	const names = [
		'专家 1',
		'专家 2',
		'专家 3',
		'专家 4',
		'专家 5',
		'专家 6',
		'专家 7',
		'专家 8',
		'专家 9',
		'专家 10',
	];

	const experts = [];
	for (let i = 0; i < num; i++) {
		experts.push({
			name: names[i % names.length],
			type: expertTypes[Math.floor(Math.random() * expertTypes.length)],
			category:
				expertCategories[
					Math.floor(Math.random() * expertCategories.length)
				],
		});
	}
	return experts;
}

// 导出生成的模拟数据
export const projects = generateRandomProjects(20);
export const experts = generateRandomExperts(10);
