<template>
	<div class="login-container">
		<h1>Innovation Management System</h1>
		<form @submit.prevent="handleLogin" class="login-form">
			<div class="form-group">
				<label for="username">Username</label>
				<input type="text" id="username" v-model="username" required />
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					v-model="password"
					required
				/>
			</div>
			<button type="submit" class="login-button">Login</button>
		</form>
	</div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

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
</script>

<style scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

h1 {
	font-size: 2.5rem;
	margin-bottom: 2rem;
	color: #333;
}

.login-form {
	display: flex;
	flex-direction: column;
	width: 300px;
	padding: 2rem;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
}

label {
	font-size: 1rem;
	margin-bottom: 0.5rem;
	color: #555;
}

input {
	padding: 0.75rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 1rem;
}

.login-button {
	padding: 0.75rem;
	background: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	font-size: 1rem;
	cursor: pointer;
	transition: background 0.3s ease;
}

.login-button:hover {
	background: #0056b3;
}
</style>
