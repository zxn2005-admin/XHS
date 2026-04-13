<template>
  <div class="layout">
    <header class="header">
      <div class="container header-content">
        <div class="logo" @click="$router.push('/home')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FF2442"/>
            <path d="M2 17L12 22L22 17" stroke="#FF2442" stroke-width="2"/>
            <path d="M2 12L12 17L22 12" stroke="#FF2442" stroke-width="2"/>
          </svg>
          <span>小红书</span>
        </div>
        
        <SearchBar class="search-bar" />
        
        <nav class="nav">
          <router-link to="/home" class="nav-item" active-class="active">首页</router-link>
          <router-link to="/search" class="nav-item" active-class="active">发现</router-link>
        </nav>
        
        <div class="actions">
          <button class="publish-btn btn btn-primary" @click="handlePublish">
            <Plus />
            <span>发布</span>
          </button>
          
          <template v-if="userStore.isLoggedIn">
            <div class="user-dropdown">
              <img :src="userStore.userInfo.avatar || 'https://picsum.photos/40/40?random=avatar'" class="avatar-small" />
              <div class="dropdown-menu">
                <router-link to="/profile" class="dropdown-item">个人中心</router-link>
                <div class="dropdown-item" @click="handleLogout">退出登录</div>
              </div>
            </div>
          </template>
          <template v-else>
            <button class="login-btn" @click="$router.push('/login')">登录</button>
          </template>
        </div>
      </div>
    </header>
    
    <main class="main">
      <router-view />
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>© 2024 小红书 - 标记我的生活</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import SearchBar from '@/components/SearchBar.vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

const handlePublish = () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  router.push('/publish')
}

const handleLogout = () => {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/home')
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 1000;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 22px;
  font-weight: 700;
  color: var(--primary-color);
}

.logo svg {
  width: 32px;
  height: 32px;
}

.search-bar {
  flex: 1;
  max-width: 400px;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-item {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: var(--transition);
}

.nav-item:hover,
.nav-item.active {
  color: var(--primary-color);
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.publish-btn {
  gap: 6px;
  padding: 8px 20px;
  font-size: 14px;
}

.login-btn {
  padding: 8px 24px;
  border-radius: var(--radius-xl);
  background: var(--primary-gradient);
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.user-dropdown {
  position: relative;
  cursor: pointer;
}

.avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
  transition: var(--transition);
}

.avatar-small:hover {
  border-color: var(--primary-color);
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  min-width: 140px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: var(--transition);
}

.user-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  padding: 10px 20px;
  font-size: 14px;
  color: var(--text-secondary);
  transition: var(--transition);
  cursor: pointer;
}

.dropdown-item:hover {
  background: var(--bg-color);
  color: var(--primary-color);
}

.main {
  flex: 1;
  margin-top: 70px;
}

.footer {
  padding: 40px 0;
  background: white;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: var(--text-light);
  font-size: 14px;
  margin-top: 60px;
}

@media (max-width: 768px) {
  .header {
    height: 60px;
  }
  
  .header-content {
    gap: 16px;
  }
  
  .logo span {
    display: none;
  }
  
  .search-bar {
    max-width: 150px;
  }
  
  .nav {
    display: none;
  }
  
  .publish-btn span {
    display: none;
  }
  
  .publish-btn {
    padding: 8px;
  }
  
  .main {
    margin-top: 60px;
  }
}
</style>
