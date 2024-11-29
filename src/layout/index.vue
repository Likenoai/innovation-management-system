<script setup>
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
import { useLoginStore } from '@/stores/loginStore';
import { CaretBottom, Management } from '@element-plus/icons-vue';

const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);
const username = ref(loginStore.userName || '用户');

// 添加侧边栏显示状态控制
const isAsideVisible = ref(true);

const toggleAside = () => {
	isAsideVisible.value = !isAsideVisible.value;
	isCollapse.value = !isAsideVisible.value; // 同步折叠状态
};

// 权限相关变量和函数
const userPermissions = computed(() => {
	try {
		// console.log('loginStore.permissions:', loginStore);

		const permissions = loginStore.permissions;
		return permissions ? permissions : [];
	} catch (error) {
		console.error('权限解析错误:', error);
		return [];
	}
});

const filterMenus = (menus) => {
	// console.log(userPermissions);
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
	loginStore.logout();
	localStorage.removeItem('token');
	router.push('/login');
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

const { proxy } = getCurrentInstance();

watch(selectedRole, (newRole) => {
	// console.log('selectedRole:', newRole);
	loginStore.userRole = newRole;
	loginStore.permissions = rolePermissions[newRole];
	authorizedMenus.value = filterMenus(menuConfig);
	// 强制更新组件以确保 v-permissions 重新判断
	proxy.$forceUpdate();
});

// 处理命令
const handleCommand = (command) => {
	switch (command) {
		case 'profile':
			router.push('/profile');
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
	// console.log('mounted menuConfig:', menuConfig);
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
				<span v-if="!isCollapse">双创管理系统</span>
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
							{{ username }}
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
								<el-dropdown-item command="roleSwitch"
									>角色切换</el-dropdown-item
								>
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
