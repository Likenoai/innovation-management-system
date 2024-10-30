<script setup>
import { ref, computed, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as ElementPlusIcons from '@element-plus/icons-vue';
import { menuConfig } from '../config/menu';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);
const username = ref(localStorage.getItem('username') || '用户');

// 添加侧边栏显示状态控制
const isAsideVisible = ref(true);

const toggleAside = () => {
	isAsideVisible.value = !isAsideVisible.value;
	isCollapse.value = !isAsideVisible.value; // 同步折叠状态
};

// 优化权限相关逻辑
const getUserPermissions = () => {
	try {
		const permissions = localStorage.getItem('permissions');
		return permissions ? JSON.parse(permissions) : [];
	} catch (error) {
		console.error('权限解析错误:', error);
		return [];
	}
};

const userPermissions = computed(getUserPermissions);

// 优化登出逻辑
const handleLogout = () => {
	const keysToRemove = ['token', 'permissions', 'userRole', 'username'];
	keysToRemove.forEach((key) => localStorage.removeItem(key));
	router.push('/login');
};

// 过滤有权限的菜单
const filterMenus = (menus) => {
	return menus.filter((menu) => {
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
};

const authorizedMenus = computed(() => filterMenus(menuConfig));

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

const handleCommand = (command) => {
	switch (command) {
		case 'profile':
			router.push('/profile');
			break;
		case 'logout':
			handleLogout();
			break;
	}
};
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
								<component :is="menu.icon" />
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
							<component :is="menu.icon" />
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
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</el-header>

			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
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
	position: fixed;
	top: 0;
	right: 0;
	left: 200px;
	z-index: 999;
	// 调整为更亮的背景色
	background: linear-gradient(
		135deg,
		rgba(65, 65, 95, 0.95) 0%,
		rgba(55, 65, 95, 0.95) 100%
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
	padding: 0 0 0 0 !important;
	background-color: #f0f2f5;
	min-height: 100vh;
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
