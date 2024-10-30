<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as ElementPlusIcons from '@element-plus/icons-vue';
import { menuConfig } from '../config/menu';

const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);
const username = ref(localStorage.getItem('username') || '用户');

// 获取当前用户权限
const userPermissions = computed(() => {
	const permissions = localStorage.getItem('permissions');
	return permissions ? JSON.parse(permissions) : [];
});

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
			// 处理个人信息
			router.push('/profile');
			break;
		case 'logout':
			// 处理退出登录
			localStorage.removeItem('token');
			localStorage.removeItem('permissions');
			localStorage.removeItem('userRole');
			localStorage.removeItem('username');
			router.push('/login');
			break;
	}
};
</script>

<template>
	<el-container class="layout-container">
		<el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
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

		<el-container>
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
	height: 100vh;
}

.aside {
	background-color: #304156;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	padding: 0 20px;
	background-color: #fff;
	border-bottom: 1px solid #dcdfe6;

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
	background-color: #f0f2f5;
}

.project-title {
	display: flex;
	align-items: center;
	height: 60px;
	padding: 0 20px;
	background-color: #8eb9ee;
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
</style>
