<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <div class="logo" @click="$router.push('/home')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FF2442"/>
            <path d="M2 17L12 22L22 17" stroke="#FF2442" stroke-width="2"/>
            <path d="M2 12L12 17L22 12" stroke="#FF2442" stroke-width="2"/>
          </svg>
          <span>小红书</span>
        </div>
        <h2 class="auth-title">欢迎回来</h2>
        <p class="auth-subtitle">登录后开启精彩内容</p>
      </div>
      
      <el-form :model="form" class="auth-form" size="large" @submit.prevent="handleLogin">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入账号"
            prefix-icon="User"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        
        <el-form-item>
          <button type="button" class="btn btn-primary submit-btn" @click="handleLogin" :disabled="loading">
            <span v-if="loading">登录中...</span>
            <span v-else>登录</span>
          </button>
        </el-form-item>
      </el-form>
      
      <div class="divider">
        <span>其他登录方式</span>
      </div>
      
      <div class="social-login">
        <button class="social-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 13.45 4.7 10.98c.87-1.24 2.44-2.02 4.12-2.07 1.28-.04 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.8zM13.5 7.5c.46-.59.75-1.39.64-2.24-.13-1.07-.9-1.97-1.88-2.26-.88-.26-1.81-.08-2.52.46-.47.36-.82.89-1 1.5-.2 1.09.19 2.23 1.05 3 1.01.9 2.52 1.07 3.71.54z"/>
          </svg>
        </button>
        <button class="social-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>
        <button class="social-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </button>
      </div>
      
      <div class="auth-footer">
        <span>还没有账号？</span>
        <router-link to="/register" class="link">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const form = ref({
  username: '',
  password: ''
})

const handleLogin = () => {
  if (!form.value.username) {
    ElMessage.warning('请输入账号')
    return
  }
  if (!form.value.password) {
    ElMessage.warning('请输入密码')
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    const user = {
      id: 1,
      username: form.value.username,
      nickname: '小红书用户',
      avatar: 'https://picsum.photos/100/100?random=user',
      bio: '热爱生活，记录美好',
      followers: 86,
      following: 12,
      likes: 520
    }
    
    userStore.login(user, 'mock_token_' + Date.now())
    ElMessage.success('登录成功！')
    loading.value = false
    router.push('/home')
  }, 1000)
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFF5F7 0%, #FFE8EB 100%);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 48px 40px;
}

.auth-header {
  text-align: center;
  margin-bottom: 36px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  cursor: pointer;
}

.logo svg {
  width: 40px;
  height: 40px;
}

.logo span {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
}

.auth-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.auth-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.auth-form {
  margin-bottom: 24px;
}

:deep(.auth-form .el-input__wrapper) {
  border-radius: var(--radius-md);
  box-shadow: 0 0 0 1px var(--border-color);
  padding: 10px 16px;
  transition: var(--transition);
}

:deep(.auth-form .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--primary-light);
}

:deep(.auth-form .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px var(--primary-light);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
}

.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: var(--text-light);
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

.divider span {
  padding: 0 16px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

.social-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: var(--transition);
}

.social-btn:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.social-btn svg {
  width: 20px;
  height: 20px;
}

.auth-footer {
  text-align: center;
  font-size: 14px;
  color: var(--text-secondary);
}

.auth-footer .link {
  color: var(--primary-color);
  font-weight: 500;
  margin-left: 4px;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 32px 24px;
  }
}
</style>
