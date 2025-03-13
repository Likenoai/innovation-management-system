// src/mock/mockData.js
function generateRandomString(length) {
	// 生成随机字符串
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return result;
}

function generateRandomDate(startYear, endYear) {
	// 生成随机日期
	const year =
		Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
	const month = Math.floor(Math.random() * 12) + 1;
	const day = Math.floor(Math.random() * 28) + 1; // 避免日期无效
	return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
		2,
		'0'
	)}`;
}

function generateRandomPhone() {
	// 生成随机手机号
	return `1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
}

export function generateProjectData(numProjects = 10) {
	const projects = [];
	const projectTypes = ['一般项目', '重点领域项目'];
	const projectCategories = ['创新训练项目', '创业训练项目', '创新实践项目'];
	const projectLevels = ['国家级', '省级', '校级'];
	const primaryDisciplines = ['计算机科学与技术', '数学', '物理学', '化学'];
	const secondaryDisciplines = [
		'人工智能',
		'软件工程',
		'数据分析',
		'量子计算',
	];
	const dutySexOptions = [0, 1]; // 假设0表示男性，1表示女性

	for (let i = 0; i < numProjects; i++) {
		const project = {
			id: i + 1,
			projectId: generateRandomString(10),
			projectType:
				projectTypes[Math.floor(Math.random() * projectTypes.length)],
			projectCategory:
				projectCategories[
					Math.floor(Math.random() * projectCategories.length)
				],
			keyField: generateRandomString(8),
			projectName: `项目${generateRandomString(5)}`,
			projectLevel:
				projectLevels[Math.floor(Math.random() * projectLevels.length)],
			primaryDiscipline:
				primaryDisciplines[
					Math.floor(Math.random() * primaryDisciplines.length)
				],
			secondaryDiscipline:
				secondaryDisciplines[
					Math.floor(Math.random() * secondaryDisciplines.length)
				],
			requestedFunding: Math.floor(Math.random() * 1000000), // 随机生成请求经费
			approvedFunding: Math.floor(Math.random() * 1000000), // 随机生成批准经费
			projectDuration: Math.floor(Math.random() * 5) + 1, // 随机生成项目周期（1-5年）
			projectDescription: `这是一个关于${generateRandomString(
				10
			)}的项目，旨在研究${generateRandomString(15)}。`,
			sourceName: generateRandomString(10),
			approvalTime: generateRandomDate(2018, 2025),
			dutyName: generateRandomString(6),
			dutySex:
				dutySexOptions[
					Math.floor(Math.random() * dutySexOptions.length)
				],
			dutyNation: '汉族',
			dutyBirth: generateRandomDate(1970, 1995),
			dutyId: generateRandomString(18),
			dutyCollege: '计算机与信息科学',
			dutyRelation: '负责人',
			dutyExperience: `曾在${generateRandomString(
				5
			)}公司担任${generateRandomString(
				5
			)}职位，负责${generateRandomString(10)}项目。`,
			enterpriseAdvisorName: generateRandomString(6),
			enterpriseAdvisorContact: generateRandomPhone(),
			enterpriseAdvisorPosition: generateRandomString(8),
			enterpriseAdvisorExperience: `在${generateRandomString(
				10
			)}领域有丰富经验，曾主导${generateRandomString(10)}项目。`,
			attachment: `https://example.com/attachment/${generateRandomString(
				10
			)}.pdf`,
			createTime: generateRandomDate(2020, 2025),
			updateTime: generateRandomDate(2020, 2025),
			dutyFlag: (() => Math.random() > 0.5)(),
		};
		projects.push(project);
	}
	return projects;
}

export function generateExpertData(numExperts) {
	const experts = [];
	for (let i = 0; i < numExperts; i++) {
		const expert = {
			id: i + 1, // 专家ID从1开始
			name: generateRandomString(5), // 随机生成5个字符作为名字
			roleId: Math.floor(Math.random() * 10) + 1, // 随机生成1到10的角色ID
			personnelCode: generateRandomString(8), // 随机生成8个字符作为人员代码
			college: '计算机与信息科学', // 统一学院名称
			unit: null, // 单位字段为空
			schoolFlag: null, // 学校标志字段为空
			studentFlag: null, // 学生标志字段为空
			account: null, // 账户字段为空
			subject: null, // 学科字段为空
		};
		experts.push(expert);
	}
	return experts;
}

export const mockProjects = [
	{ id: 101, name: '智能机器人研究', category: '计算机与信息学院' },
	{ id: 102, name: '计算机视觉应用', category: '计算机与信息学院' },
	{ id: 103, name: '5G通信技术', category: '计算机与信息学院' },
	{ id: 104, name: '自动驾驶系统', category: '计算机与信息学院' },
	{ id: 105, name: '大数据处理', category: '计算机与信息学院' },
];
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
export const mockFormData = {
	projectDetail: {
		projectType: '一般项目',
		projectCategory: '创新训练项目',
		keyField: '测试重点领域',
		projectName: '测试项目名称',
		projectLevel: '国家级',
		primaryDiscipline: '哲学',
		secondaryDiscipline: '马克思主义哲学',
		requestedFunding: 500000.0, // 申请经费
		// approvedFunding: 450000.0, // 批准经费
		projectDuration: 24, // 项目周期（月）
		projectDescription:
			'本项目旨在研究智能机器人在医疗领域的应用，通过开发智能辅助诊断系统，提高医疗效率和准确性。',
		sourceName: '国家自然科学基金',
		approvalTime: '2025-03-01T10:00:00',
		dutyName: '测试姓名',
		dutySex: 1,
		dutyNation: '汉族',
		dutyBirth: '2000-05-15',
		dutyId: '202201005007',
		dutyCollege: '计算机与信息学院',
		dutyRelation: '17862635781',
		dutyExperience: '长期从事人工智能领域的研究，主持多项国家级科研项目。',
		enterpriseAdvisorName: '李四',
		enterpriseAdvisorContact: '13800138000',
		enterpriseAdvisorPosition: '技术总监',
		enterpriseAdvisorExperience:
			'在智能机器人领域拥有10年行业经验，曾参与多个国家级科研项目。',
		attachment: '项目申请书.pdf',
	},
	projectMembers: [
		{
			studentId: '20231001',
			mainWork: '后端开发',
		},
		{
			studentId: '20231002',
			mainWork: '前端开发',
		},
	],
	projectAdvisors: [
		{
			name: '张教授',
			personnelCode: 'T1001',
			college: '计算机学院',
			position: '第一导师',
			researchTopic: '网络安全攻防技术',
			supportStatus: '提供实验设备支持',
			suggestion: '加强对 AI 生成安全策略的研究',
		},
		{
			name: '王教授',
			personnelCode: 'T1002',
			college: '软件学院',
			position: '第二导师',
			researchTopic: '人工智能安全',
			supportStatus: '提供科研指导',
			suggestion: '建议引入更多 AI 训练数据',
		},
	],
};
