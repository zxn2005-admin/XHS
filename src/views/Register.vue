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
        <h2 class="auth-title">创建账号</h2>
        <p class="auth-subtitle">加入小红书，分享你的生活</p>
      </div>
      
      <el-form :model="form" class="auth-form" size="large" @submit.prevent="handleRegister">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入账号"
            prefix-icon="User"
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        
        <el-form-item prop="nickname">
          <el-input
            v-model="form.nickname"
            placeholder="请输入昵称"
            prefix-icon="User"
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请设置密码"
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请确认密码"
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        
        <el-form-item>
          <label class="agreement">
            <el-checkbox v-model="form.agreed" size="large" />
            <span>我已阅读并同意 <a href="#">《用户协议》</a> 和 <a href="#">《隐私政策》</a></span>
          </label>
        </el-form-item>
        
        <el-form-item>
          <button type="button" class="btn btn-primary submit-btn" @click="handleRegister" :disabled="loading">
            <span v-if="loading">注册中...</span>
            <span v-else>注册</span>
          </button>
        </el-form-item>
      </el-form>
      
      <div class="auth-footer">
        <span>已有账号？</span>
        <router-link to="/login" class="link">立即登录</router-link>
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
  nickname: '',
  password: '',
  confirmPassword: '',
  agreed: false
})

const handleRegister = () => {
  if (!form.value.username) {
    ElMessage.warning('请输入账号')
    return
  }
  if (!form.value.nickname) {
    ElMessage.warning('请输入昵称')
    return
  }
  if (!form.value.password) {
    ElMessage.warning('请设置密码')
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }
  if (!form.value.agreed) {
    ElMessage.warning('请同意用户协议和隐私政策')
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    const user = {
      id: 1,
      username: form.value.username,
      nickname: form.value.nickname,
      avatar: 'https://picsum.photos/100/100?random=newuser',
      bio: '热爱生活，记录美好',
      followers: 0,
      following: 0,
      likes: 0
    }
    
    userStore.login(user, 'mock_token_' + Date.now())
    ElMessage.success('注册成功！')
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

.agreement {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.agreement a {
  color: var(--primary-color);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
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
