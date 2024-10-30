<script setup>
import { onMounted, ref } from 'vue';

const particles = ref([]);
const stats = ref([
	{ title: '参与选手', count: 1200, icon: '🏃' },
	{ title: '进行中赛事', count: 25, icon: '🏆' },
	{ title: '累计项目', count: 3500, icon: '📊' },
	{ title: '合作机构', count: 150, icon: '🤝' },
]);

onMounted(() => {
	initParticles();
	animateNumbers();
});

const initParticles = () => {
	// 创建背景粒子
	for (let i = 0; i < 50; i++) {
		particles.value.push({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: Math.random() * 3 + 1,
			speedX: Math.random() * 2 - 1,
			speedY: Math.random() * 2 - 1,
		});
	}

	animateParticles();
};

const animateParticles = () => {
	particles.value.forEach((particle) => {
		particle.x += particle.speedX;
		particle.y += particle.speedY;

		if (particle.x < 0 || particle.x > window.innerWidth)
			particle.speedX *= -1;
		if (particle.y < 0 || particle.y > window.innerHeight)
			particle.speedY *= -1;
	});

	requestAnimationFrame(animateParticles);
};

const animateNumbers = () => {
	stats.value.forEach((stat) => {
		let start = 0;
		const increment = stat.count / 100;
		const timer = setInterval(() => {
			start += increment;
			if (start >= stat.count) {
				start = stat.count;
				clearInterval(timer);
			}
			stat.current = Math.floor(start);
		}, 20);
	});
};
</script>

<template>
	<div class="home-container">
		<!-- 背景粒子 -->
		<div class="particles-container">
			<div
				v-for="(particle, index) in particles"
				:key="index"
				class="particle"
				:style="{
					left: particle.x + 'px',
					top: particle.y + 'px',
					width: particle.size + 'px',
					height: particle.size + 'px',
				}"
			></div>
		</div>

		<!-- 主要内容 -->
		<div class="content">
			<div class="hero-section">
				<h1 class="title">创新竞赛管理平台</h1>
				<p class="subtitle">激发创新 • 追求卓越 • 成就未来</p>
			</div>

			<!-- 数据统计卡片 -->
			<div class="stats-container">
				<div
					v-for="(stat, index) in stats"
					:key="index"
					class="stat-card"
				>
					<div class="stat-icon">{{ stat.icon }}</div>
					<div class="stat-number">{{ stat.current || 0 }}</div>
					<div class="stat-title">{{ stat.title }}</div>
				</div>
			</div>

			<!-- 快捷入口 -->
			<div class="quick-access">
				<div class="access-card">
					<h3>竞赛报名</h3>
					<p>浏览最新竞赛信息</p>
				</div>
				<div class="access-card">
					<h3>项目提交</h3>
					<p>上传参赛作品</p>
				</div>
				<div class="access-card">
					<h3>结果查询</h3>
					<p>查看比赛成绩</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.home-container {
	height: 100%;
	width: 100%;
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	position: relative;
	overflow: hidden;
}

.particles-container {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

.particle {
	position: absolute;
	background: rgba(255, 255, 255, 0.5);
	border-radius: 50%;
	pointer-events: none;
}

.content {
	position: relative;
	z-index: 1;
	padding: 2rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}

.hero-section {
	text-align: center;
	margin-bottom: 2rem;

	.title {
		font-size: 3rem;
		color: #fff;
		margin-bottom: 1rem;
		text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
		animation: glow 2s ease-in-out infinite alternate;
	}

	.subtitle {
		font-size: 1.2rem;
		color: #8a8fa3;
	}
}

.stats-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2rem;
	margin-bottom: 2rem;
}

.stat-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	padding: 1.5rem;
	border-radius: 15px;
	text-align: center;
	min-width: 200px;
	transition: transform 0.3s ease;
	border: 1px solid rgba(255, 255, 255, 0.1);

	&:hover {
		transform: translateY(-10px);
	}

	.stat-icon {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: bold;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.stat-title {
		color: #8a8fa3;
	}
}

.quick-access {
	display: flex;
	gap: 2rem;
	flex-wrap: wrap;
	justify-content: center;
}

.access-card {
	background: rgba(255, 255, 255, 0.05);
	padding: 1.5rem;
	border-radius: 15px;
	width: 250px;
	text-align: center;
	cursor: pointer;
	transition: all 0.3s ease;
	border: 1px solid rgba(255, 255, 255, 0.1);

	&:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: scale(1.05);
	}

	h3 {
		color: #fff;
		margin-bottom: 0.5rem;
	}

	p {
		color: #8a8fa3;
	}
}

@keyframes glow {
	from {
		text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
	}
	to {
		text-shadow: 0 0 20px rgba(0, 255, 255, 0.8),
			0 0 30px rgba(0, 255, 255, 0.6);
	}
}
</style>
