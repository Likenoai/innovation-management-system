<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useTextStore } from '@/stores/textStore.js';
import { useMyLoginStore } from '@/stores/myLoginStore.js';
import * as THREE from 'three';
import gsap from 'gsap';
import { rolePermissions } from '@/config/permissions';

const username = ref('');
const password = ref('');
const isLoginMode = ref(true);
const registerData = ref({
	username: '',
	password: '',
	confirmPassword: '',
	name: '',
	role: '5', // 默认身份为学生
});
const router = useRouter();
const loginStore = useMyLoginStore();
async function handleLogin() {
	try {
		const response = await axios.post('/scgl/CheckAndLogin/login', {
			username: username.value,
			password: password.value,
		});
		console.log('response:', response.code);

		if (response.code === 200) {
			let roleMap = {
				1: 'super_admin',
				2: 'school_admin',
				3: 'college_admin',
				4: 'expert',
				5: 'teacher',
				6: 'student',
			};
			// 将用户信息存储到 Pinia 仓库中
			loginStore.token = response.data.token;
			loginStore.userName = response.data.userName;
			loginStore.id = response.data.id;
			loginStore.role = roleMap[response.data.role];
			loginStore.permissions = rolePermissions[loginStore.role];
			ElMessage.success('登录成功');
			router.push('/');
		} else {
			ElMessage.error('登录失败');
		}
	} catch (error) {
		console.error('登录错误:', error);
		ElMessage.error('登录失败: ' + error.message);
	}
}

async function handleRegister() {
	if (registerData.value.password !== registerData.value.confirmPassword) {
		ElMessage.error('两次输入的密码不一致');
		return;
	}

	try {
		const response = await axios.post('/scgl/CheckAndLogin/check', {
			username: registerData.value.username,
			password: registerData.value.password,
			name: registerData.value.name,
			role: registerData.value.role,
		});

		if (response.code === 200) {
			ElMessage.success('注册成功');
			isLoginMode.value = true;
			router.push('/login');
		} else {
			ElMessage.error('注册失败');
		}
	} catch (error) {
		console.error('注册错误:', error);
		ElMessage.error('注册失败: ' + error.message);
	}
}

function toggleMode() {
	isLoginMode.value = !isLoginMode.value;
}

// 添加新的交互方法
const handleFocus = (e) => {
	gsap.to(e.target.nextElementSibling, {
		width: '100%',
		duration: 0.5,
		ease: 'power2.out',
	});
};

const handleBlur = (e) => {
	if (!e.target.value) {
		gsap.to(e.target.nextElementSibling, {
			width: '0%',
			duration: 0.5,
			ease: 'power2.out',
		});
	}
};

// 初始化3D背景
onMounted(() => {
	initThreeBackground();
});

function initThreeBackground() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	const renderer = new THREE.WebGLRenderer({ alpha: true });

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('bg-animation').appendChild(renderer.domElement);

	// 减少气泡数量
	const bubbles = [];
	const bubbleCount = 30; // 从50减少到30

	for (let i = 0; i < bubbleCount; i++) {
		const geometry = new THREE.SphereGeometry(
			Math.random() * 1.5 + 0.5,
			32,
			32
		); // 减小气泡大小
		const material = new THREE.MeshBasicMaterial({
			color: new THREE.Color(
				`hsl(${200 + Math.random() * 40}, 90%, 85%)`
			),
			transparent: true,
			opacity: 0.4, // 降低气泡不透明度
		});

		const bubble = new THREE.Mesh(geometry, material);
		bubble.position.set(
			Math.random() * 1200 - 600,
			Math.random() * 1200 - 600,
			Math.random() * 1200 - 600
		);

		bubble.userData = {
			floatSpeed: Math.random() * 0.3 + 0.2, // 降低浮动速度
			rotateSpeed: Math.random() * 0.01,
			yOffset: Math.random() * Math.PI * 2,
		};

		bubbles.push(bubble);
		scene.add(bubble);
	}

	camera.position.z = 500;

	function animate() {
		requestAnimationFrame(animate);
		bubbles.forEach((bubble) => {
			bubble.position.y += bubble.userData.floatSpeed;
			bubble.rotation.y += bubble.userData.rotateSpeed;
			if (bubble.position.y > 1000) {
				bubble.position.y = -1000;
			}
		});
		renderer.render(scene, camera);
	}

	animate();
}
</script>

<template>
	<div class="login-container">
		<!-- 3D背景容器 -->
		<div id="bg-animation"></div>

		<div class="bg-decoration">
			<div class="circle circle-1"></div>
			<div class="circle circle-2"></div>
			<div class="circle circle-3"></div>
			<div class="wave"></div>
		</div>

		<div class="login-content">
			<div class="title-container">
				<h1 class="title">竞赛管理系统</h1>
				<div class="title-decoration"></div>
			</div>

			<!-- 登录表单 -->
			<form
				v-if="isLoginMode"
				@submit.prevent="handleLogin"
				class="login-form"
			>
				<div class="form-group">
					<label for="username">用户名</label>
					<input
						type="text"
						id="username"
						v-model="username"
						required
						@focus="handleFocus"
						@blur="handleBlur"
					/>
					<div class="input-line"></div>
				</div>

				<div class="form-group">
					<label for="password">密码</label>
					<input
						type="password"
						id="password"
						v-model="password"
						required
						@focus="handleFocus"
						@blur="handleBlur"
					/>
					<div class="input-line"></div>
				</div>

				<button type="submit" class="login-button">
					<span class="button-text">登录</span>
					<div class="button-effect"></div>
				</button>
			</form>

			<!-- 注册表单 -->
			<form v-else @submit.prevent="handleRegister" class="login-form">
				<div class="form-group">
					<label for="register-username">注册用户名</label>
					<input
						type="text"
						id="register-username"
						v-model="registerData.username"
						required
						@focus="handleFocus"
						@blur="handleBlur"
					/>
					<div class="input-line"></div>
				</div>

				<div class="form-group">
					<label for="real-name">真实姓名</label>
					<input
						type="text"
						id="real-name"
						v-model="registerData.name"
						required
						@focus="handleFocus"
						@blur="handleBlur"
					/>
					<div class="input-line"></div>
				</div>

				<div class="form-group">
					<label for="register-password">注册密码</label>
					<input
						type="password"
						id="register-password"
						v-model="registerData.password"
						required
						@focus="handleFocus"
						@blur="handleBlur"
					/>
					<div class="input-line"></div>
				</div>

				<div class="form-group">
					<label for="confirm-password">确认密码</label>
					<input
						type="password"
						id="confirm-password"
						v-model="registerData.confirmPassword"
						required
						@focus="handleFocus"
						@blur="handleBlur"
					/>
					<div class="input-line"></div>
				</div>

				<div class="form-group">
					<label>身份选择</label>
					<el-radio-group v-model="registerData.role">
						<el-radio label="5">学生</el-radio>
						<el-radio label="4">教师</el-radio>
					</el-radio-group>
				</div>

				<button type="submit" class="login-button">
					<span class="button-text">注册</span>
					<div class="button-effect"></div>
				</button>
			</form>

			<!-- 切换按钮 -->
			<button @click="toggleMode" class="toggle-button">
				<span v-if="isLoginMode">没有账号？注册</span>
				<span v-else>已有账号？登录</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
.login-container {
	color: #1a85ef;
	position: relative;
	min-height: 100vh;
	background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%);
	overflow: hidden;
}

#bg-animation {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
}

.login-content {
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 20px;
}

.title-container {
	text-align: center;
	margin-bottom: 2.5rem;
}

.title {
	font-size: 2.5rem;
	color: #1a85ef;
	font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
	font-weight: 600;
	letter-spacing: 2px;
	margin-bottom: 0.5rem;
	position: relative;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.title-decoration {
	width: 60px;
	height: 3px;
	background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
	margin: 0 auto;
	border-radius: 3px;
	position: relative;
}

.title-decoration::before,
.title-decoration::after {
	content: '';
	position: absolute;
	width: 40px;
	height: 3px;
	background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
	border-radius: 3px;
	opacity: 0.6;
}

.title-decoration::before {
	left: -50px;
}

.title-decoration::after {
	right: -50px;
}

.login-form {
	background: rgba(255, 255, 255, 0.85);
	backdrop-filter: blur(10px);
	padding: 2rem;
	border-radius: 20px;
	width: 320px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.3);
	position: relative;
	z-index: 3;
}

.login-form:hover {
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.form-group {
	position: relative;
	margin-bottom: 1.5rem;
}

label {
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
	display: block;
}

input {
	width: 100%;
	padding: 0.75rem;
	background: rgba(255, 255, 255, 0.9);
	border: 2px solid rgba(79, 172, 254, 0.2);
	border-radius: 5px;
	font-size: 1rem;
	transition: all 0.3s ease;
}

.input-line {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 2px;
	background: #00bfff;
	transition: width 0.3s ease;
}

.login-button {
	position: relative;
	width: 100%;
	padding: 0.75rem;
	background: transparent;
	border: none;
	border-radius: 5px;
	overflow: hidden;
	cursor: pointer;
}

.button-text {
	position: relative;
	z-index: 1;
	color: #fff;
	font-size: 1rem;
}

.button-effect {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(45deg, #0066ff, #00bfff);
	opacity: 0.8;
	transition: transform 0.3s ease;
}

.login-button:hover .button-effect {
	transform: scale(1.1);
}

input:focus {
	background: #ffffff;
	border-color: #4facfe;
	box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
}

.login-button:hover {
	box-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
}

/* 添加背景装饰元素样式 */
.bg-decoration {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
}

.circle {
	position: absolute;
	border-radius: 50%;
	opacity: 0.1;
}

.circle-1 {
	width: 300px;
	height: 300px;
	background: linear-gradient(45deg, #4facfe, #00f2fe);
	top: -100px;
	right: -100px;
}

.circle-2 {
	width: 200px;
	height: 200px;
	background: linear-gradient(45deg, #00f2fe, #4facfe);
	bottom: 10%;
	left: -50px;
}

.circle-3 {
	width: 150px;
	height: 150px;
	background: linear-gradient(45deg, #4facfe, #00f2fe);
	top: 30%;
	right: 15%;
}

.wave {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100px;
	background: url('@/assets/images/wave.svg') repeat-x;
	background-size: 1000px 100px;
	opacity: 0.1;
	animation: wave 20s linear infinite;
}

@keyframes wave {
	0% {
		background-position-x: 0;
	}
	100% {
		background-position-x: 1000px;
	}
}

/* 加响应式调整 */
@media (max-width: 768px) {
	.circle-1 {
		width: 200px;
		height: 200px;
	}

	.circle-2 {
		width: 150px;
		height: 150px;
	}

	.circle-3 {
		width: 100px;
		height: 100px;
	}
}

.toggle-button {
	margin-top: 1rem;
	background: none;
	border: none;
	color: #1a85ef;
	cursor: pointer;
	font-size: 0.9rem;
	text-decoration: underline;
}
</style>
