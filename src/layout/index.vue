<script setup lang="jsx">
import {
	ref,
	computed,
	h,
	onMounted,
	onBeforeUnmount,
	watch,
	getCurrentInstance,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as ElementPlusIcons from '@element-plus/icons-vue';
import { menuConfig } from '../config/menu';
import { ArrowLeft, ArrowRight, Trophy } from '@element-plus/icons-vue';
import { useMyLoginStore } from '@/stores/myLoginStore';
import { CaretBottom, Management } from '@element-plus/icons-vue';

const loginStore = useMyLoginStore();
const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);
const userInfo = ref(loginStore.userInfo);
const isAsideVisible = ref(true);

const toggleAside = () => {
	isAsideVisible.value = !isAsideVisible.value;
	isCollapse.value = !isAsideVisible.value; // 同步折叠状态
};

// 权限相关变量和函数
const userPermissions = computed(() => {
	try {
		const permissions = loginStore.permissions;
		return permissions ? permissions : [];
	} catch (error) {
		console.error('权限解析错误:', error);
		return [];
	}
});

const filterMenus = (menus) => {
	let tempMenus = menus.filter((menu) => {
		if (
			menu.permission &&
			!userPermissions.value.includes(menu.permission)
		) {
			return false;
		}
		if (menu.children) {
			menu.children = filterMenus(menu.children);
			return menu.children.length > 0;
		}

		return true;
	});
	return tempMenus;
};

const authorizedMenus = ref(filterMenus(menuConfig));

// 优化登出逻辑
const handleLogout = () => {
	ElMessageBox.confirm('确定要退出登录吗？', '提示', {
		type: 'warning',
	}).then(() => {
		loginStore.logout();
		localStorage.removeItem('token');
		router.push('/login');
	});
};

// 获取当前激活的菜单
const activeMenu = computed(() => route.path);

// 处理菜单点击
const handleMenuClick = (path) => {
	if (path) {
		router.push(path);
	}
};

// 动态渲染图标组件
const renderIcon = (iconName) => {
	return iconName ? h(ElementPlusIcons[iconName]) : null;
};

// 角色切换详情对话框
const roleSwitchDialogVisible = ref(false);
const selectedRole = ref('student');
const roleData = [
	{
		label: '学生',
		value: 'student',
	},
	{
		label: '教师',
		value: 'teacher',
	},
	{
		label: '院级管理员',
		value: 'college_admin',
	},
	{
		label: '专家',
		value: 'expert',
	},
	{
		label: '校级管理员',
		value: 'school_admin',
	},
];
const roleLabelMap = {
	student: '学生',
	teacher: '教师',
	college_admin: '院级管理员',
	expert: '专家',
	school_admin: '校级管理员',
};
import { rolePermissions } from '@/config/permissions';
import { ElMessageBox } from 'element-plus';

const { proxy } = getCurrentInstance();

watch(selectedRole, (newRole) => {
	loginStore.userRole = newRole;
	loginStore.permissions = rolePermissions[newRole];
	authorizedMenus.value = filterMenus(menuConfig);
	// 强制更新组件以确保 v-permissions 重新判断
	proxy.$forceUpdate();
});

let dialogVisible = ref(false);
const handelInfo = () => {
	dialogVisible.value = true;
};
// 格式化字段标签
function formatLabel(key) {
	const labels = {
		id: 'ID',
		account: '账号',
		name: '姓名',
		personnelCode: '人员编号',
		college: '学院',
		subject: '学科',
		unit: '单位',
		schoolFlag: '学校标识',
		studentFlag: '学生标识',
		role: '角色',
	};
	return labels[key] || key;
}

// 格式化字段值
function formatValue(value) {
	if (typeof value === 'boolean' || typeof value === 'number') {
		return value.toString();
	}
	return value || '无';
}
// 处理命令
const handleCommand = (command) => {
	switch (command) {
		case 'profile':
			handelInfo();
			break;
		case 'logout':
			handleLogout();
			break;
		case 'roleSwitch':
			roleSwitchDialogVisible.value = true;
			break;
	}
};

// 添加计算属性判断是否为首页
const isHomePage = computed(() => route.path === '/home' || route.path === '/');

// 添加鼠标移动事件监听
const handleMouseMove = (event) => {
	const asideElement = document.querySelector('.aside');
	const toggleButtonElement = document.querySelector('.toggle-button');

	if (asideElement && toggleButtonElement) {
		const rect = asideElement.getBoundingClientRect();
		// 检查鼠标是否在aside的右侧60px范围内
		if (event.clientX <= rect.right + 60) {
			toggleButtonElement.style.opacity = '1';
		} else {
			toggleButtonElement.style.opacity = '0';
		}
	}
};

onMounted(() => {
	window.addEventListener('mousemove', handleMouseMove);
});

onBeforeUnmount(() => {
	window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
	<el-container
		class="layout-container"
		:class="{ 'aside-hidden': !isAsideVisible }"
	>
		<el-aside
			:width="'200px'"
			class="aside"
			:class="{ 'aside-hidden': !isAsideVisible }"
		>
			<div class="project-title">
				<el-icon><Management /></el-icon>
				<span v-if="!isCollapse">创新创业平台</span>
			</div>
			<el-menu
				:default-active="activeMenu"
				:collapse="isCollapse"
				background-color="#304156"
				text-color="#bfcbd9"
				active-text-color="#409EFF"
				router
			>
				<template v-for="menu in authorizedMenus" :key="menu.path">
					<!-- 子菜单 -->
					<el-sub-menu v-if="menu.children" :index="menu.path">
						<template #title>
							<el-icon v-if="menu.icon">
								<component :is="ElementPlusIcons[menu.icon]" />
							</el-icon>
							<span>{{ menu.title }}</span>
						</template>
						<el-menu-item
							v-for="child in menu.children"
							:key="child.path"
							:index="child.path"
							@click="handleMenuClick(child.path)"
						>
							{{ child.title }}
						</el-menu-item>
					</el-sub-menu>

					<!-- 普通菜单项 -->
					<el-menu-item
						v-else
						:index="menu.path"
						@click="handleMenuClick(menu.path)"
					>
						<el-icon v-if="menu.icon">
							<component :is="ElementPlusIcons[menu.icon]" />
						</el-icon>
						<template #title>{{ menu.title }}</template>
					</el-menu-item>
				</template>
			</el-menu>
		</el-aside>

		<!-- 添加悬浮箭头 -->
		<div
			class="toggle-button"
			:class="{ 'button-hidden': !isAsideVisible }"
			@click="toggleAside"
		>
			<el-icon>
				<component :is="isAsideVisible ? ArrowLeft : ArrowRight" />
			</el-icon>
		</div>

		<el-container class="main-container">
			<el-header class="header">
				<div class="header-left">
					<el-icon class="fold-btn" @click="isCollapse = !isCollapse">
						<component :is="isCollapse ? 'Expand' : 'Fold'" />
					</el-icon>
				</div>
				<div class="header-right">
					<el-dropdown @command="handleCommand">
						<span class="user-info">
							{{ userInfo.name || '用户' }}
							<el-icon><CaretBottom /></el-icon>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="profile"
									>个人信息</el-dropdown-item
								>
								<el-dropdown-item command="logout"
									>退出登录</el-dropdown-item
								>
								<!-- <el-dropdown-item command="roleSwitch"
									>角色切换</el-dropdown-item
								> -->
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</el-header>

			<el-main :class="{ 'no-padding-top': isHomePage }">
				<router-view></router-view>
			</el-main>
		</el-container>
		<!-- 角色切换对话框 -->
		<el-dialog
			v-model="roleSwitchDialogVisible"
			title="角色切换"
			width="30%"
			center
		>
			<el-radio-group v-model="selectedRole">
				<template
					v-for="(roleValue, roleKey) in roleLabelMap"
					:key="roleKey"
				>
					<el-radio-button :label="roleKey">
						{{ roleValue }}
					</el-radio-button>
				</template>
			</el-radio-group>
		</el-dialog>
	</el-container>
	<!-- 用户信息对话框 -->
	<el-dialog title="用户信息" v-model="dialogVisible" width="500px" center>
		<el-form label-width="100px">
			<!-- 姓名 -->
			<el-form-item label="姓名：">
				<span>{{ userInfo.name || '暂无' }}</span>
			</el-form-item>

			<!-- 账号 -->
			<el-form-item label="账号：">
				<span>{{ userInfo.account || '暂无' }}</span>
			</el-form-item>

			<!-- 学院 -->
			<el-form-item label="学院：">
				<span>{{ userInfo.college || '暂无' }}</span>
			</el-form-item>

			<!-- 所属单位 -->
			<el-form-item label="所属单位：">
				<span>{{ userInfo.unit || '暂无' }}</span>
			</el-form-item>

			<!-- 学科 -->
			<el-form-item label="学科：">
				<span>{{ userInfo.subject || '暂无' }}</span>
			</el-form-item>

			<!-- 人员类型 -->
			<el-form-item label="人员类型：">
				<span>
					{{ userInfo.studentFlag === 1 ? '学生' : '非学生' }} /
					{{ userInfo.schoolFlag === 1 ? '校内' : '校外' }}
				</span>
			</el-form-item>

			<!-- 人员编号 -->
			<el-form-item label="人员编号：">
				<span>{{ userInfo.personnelCode || '暂无' }}</span>
			</el-form-item>
		</el-form>

		<span
			slot="footer"
			class="dialog-footer"
			style="display: flex; justify-content: center"
		>
			<el-button @click="dialogVisible = false" type="primary" plain
				>关 闭</el-button
			>
		</span>
	</el-dialog>
</template>
<style scoped lang="less">
.layout-container {
	--primary-bg: #304156;
	--secondary-bg: #1a1c32;
	--header-bg: rgba(255, 255, 255, 0.8);
	--border-color: #dcdfe6;
	--title-bg: #8eb9ee;

	height: 100vh;
	position: relative;
	transition: padding-left 0.3s ease;
	padding-left: 200px;
	background-color: var(--secondary-bg);

	&.aside-hidden {
		padding-left: 0;
	}
}

.aside {
	background-color: var(--primary-bg);
	transition: transform 0.3s ease;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 1000;

	:deep(.el-menu) {
		border-right: none;
	}

	&.aside-hidden {
		transform: translateX(-100%);
	}
}

.main-container {
	width: 100%;
	position: relative;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	padding: 0 20px;
	// position: fixed;
	// top: 0;
	// right: 0;
	// left: 200px;
	z-index: 999;
	// 调整为更亮的背景色
	background: linear-gradient(
		135deg,
		rgb(65, 65, 95) 0%,
		rgba(55, 65, 95) 100%
	);
	backdrop-filter: blur(8px);
	border-bottom: 1px solid rgba(255, 255, 255, 0.12);
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
	transition: left 0.3s ease;

	// 优化文字样式
	.fold-btn {
		color: rgba(255, 255, 255, 0.95);
		transition: color 0.3s;

		&:hover {
			color: #fff;
		}
	}

	.user-info {
		color: rgba(255, 255, 255, 0.95);
		font-weight: 500;
		transition: color 0.3s;

		&:hover {
			color: #fff;
		}

		.el-icon {
			margin-left: 4px;
			font-size: 12px;
		}
	}

	.layout-container.aside-hidden & {
		left: 0;
	}

	&-left {
		.fold-btn {
			font-size: 20px;
			cursor: pointer;
		}
	}
}

.user-info {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.el-main {
	padding: 0 0 0 0;
	background-color: #f0f2f5;
	min-height: calc(100vh - 60px);
	overflow: scroll-y;
}

.project-title {
	display: flex;
	align-items: center;
	height: 60px;
	padding: 0 20px;
	background-color: var(--primary-bg);
	border-bottom: 1px solid #1f2d3d;
	color: #fff;
	font-size: 16px;
	font-weight: bold;

	.el-icon {
		margin-right: 12px;
		font-size: 20px;
	}

	span {
		white-space: nowrap;
		transition: opacity 0.3s;
	}
}

.toggle-button {
	position: fixed;
	left: 200px;
	top: 50%;
	transform: translateY(-50%);
	width: 24px;
	height: 60px;
	background: linear-gradient(
		135deg,
		rgba(65, 65, 95, 0.95) 0%,
		rgba(55, 65, 95, 0.95) 100%
	);
	backdrop-filter: blur(8px);
	box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
	border-radius: 0 8px 8px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 1001;
	transition: all 0.3s ease;
	opacity: 0; // 初始状态为透明

	&:hover {
		background: linear-gradient(
			135deg,
			rgba(75, 75, 105, 0.95) 0%,
			rgba(65, 75, 105, 0.95) 100%
		);
		width: 28px;
	}

	&.button-hidden {
		left: 0;
		opacity: 0;
	}

	.el-icon {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.9);
		transition: transform 0.3s ease;
	}

	&:hover .el-icon {
		transform: scale(1.1);
		color: #fff;
	}
}

// 添加鼠标悬浮在左侧时显示按钮的效果
.layout-container {
	&:hover {
		.toggle-button.button-hidden {
			opacity: 1;
		}
	}
}
</style>
