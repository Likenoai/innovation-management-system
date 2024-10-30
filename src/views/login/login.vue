<template>
	<div class="login-container">
		<!-- 3D背景容器 -->
		<div id="bg-animation"></div>

		<div class="login-content">
			<h1 class="glitch-text">竞赛管理系统</h1>

			<form @submit.prevent="handleLogin" class="login-form">
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
		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import * as THREE from 'three';
import gsap from 'gsap';

const username = ref('');
const password = ref('');
const router = useRouter();

async function handleLogin() {
	try {
		const response = await axios.post(
			'http://127.0.0.1:4523/m1/5366142-0-default/api/login',
			{
				username: username.value,
				password: password.value,
			}
		);

		if (response.data.token) {
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('userRole', response.data.user.role);
			localStorage.setItem(
				'permissions',
				JSON.stringify(response.data.user.permissions)
			);
			localStorage.setItem('username', response.data.user.username);
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

	// 创建粒子系统
	const geometry = new THREE.BufferGeometry();
	const vertices = [];

	for (let i = 0; i < 5000; i++) {
		vertices.push(
			THREE.MathUtils.randFloatSpread(2000),
			THREE.MathUtils.randFloatSpread(2000),
			THREE.MathUtils.randFloatSpread(2000)
		);
	}

	geometry.setAttribute(
		'position',
		new THREE.Float32BufferAttribute(vertices, 3)
	);

	const particles = new THREE.Points(
		geometry,
		new THREE.PointsMaterial({ color: 0x00bfff, size: 2 })
	);

	scene.add(particles);
	camera.position.z = 500;

	function animate() {
		requestAnimationFrame(animate);
		particles.rotation.x += 0.0001;
		particles.rotation.y += 0.0001;
		renderer.render(scene, camera);
	}

	animate();
}
</script>

<style scoped>
.login-container {
	position: relative;
	min-height: 100vh;
	overflow: hidden;
	background: #000;
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

.glitch-text {
	font-size: 3rem;
	color: #fff;
	text-shadow: 0 0 10px rgba(0, 191, 255, 0.8);
	margin-bottom: 2rem;
	animation: glitch 1s infinite;
}

.login-form {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	padding: 2rem;
	border-radius: 15px;
	width: 320px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
}

.form-group {
	position: relative;
	margin-bottom: 1.5rem;
}

label {
	color: #fff;
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
	display: block;
}

input {
	width: 100%;
	padding: 0.75rem;
	background: rgba(255, 255, 255, 0.1);
	border: none;
	border-radius: 5px;
	color: #fff;
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

@keyframes glitch {
	0% {
		text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
			-0.05em -0.025em 0 rgba(0, 191, 255, 0.75),
			-0.025em 0.05em 0 rgba(0, 128, 255, 0.75);
	}
	14% {
		text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
			-0.05em -0.025em 0 rgba(0, 191, 255, 0.75),
			-0.025em 0.05em 0 rgba(0, 128, 255, 0.75);
	}
	15% {
		text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
			0.025em 0.025em 0 rgba(0, 191, 255, 0.75),
			-0.05em -0.05em 0 rgba(0, 128, 255, 0.75);
	}
	49% {
		text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
			0.025em 0.025em 0 rgba(0, 191, 255, 0.75),
			-0.05em -0.05em 0 rgba(0, 128, 255, 0.75);
	}
	50% {
		text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
			0.05em 0 0 rgba(0, 191, 255, 0.75),
			0 -0.05em 0 rgba(0, 128, 255, 0.75);
	}
	99% {
		text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
			0.05em 0 0 rgba(0, 191, 255, 0.75),
			0 -0.05em 0 rgba(0, 128, 255, 0.75);
	}
	100% {
		text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
			-0.025em -0.025em 0 rgba(0, 191, 255, 0.75),
			-0.025em -0.05em 0 rgba(0, 128, 255, 0.75);
	}
}

input:focus {
	box-shadow: 0 0 10px rgba(0, 191, 255, 0.3);
}

.login-button:hover {
	box-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
}
</style>
