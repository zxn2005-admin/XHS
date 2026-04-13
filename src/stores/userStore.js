import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    id: null,
    username: '',
    nickname: '',
    avatar: '',
    bio: '',
    followers: 0,
    following: 0,
    likes: 0
  })

  const isLoggedIn = ref(false)
  const token = ref('')

  const initUser = () => {
    const savedToken = localStorage.getItem('xhs_token')
    const savedUser = localStorage.getItem('xhs_user')
    
    if (savedToken) {
      token.value = savedToken
      isLoggedIn.value = true
    }
    
    if (savedUser) {
      userInfo.value = JSON.parse(savedUser)
    }
  }

  const login = (user, tokenStr) => {
    userInfo.value = user
    token.value = tokenStr
    isLoggedIn.value = true
    
    localStorage.setItem('xhs_token', tokenStr)
    localStorage.setItem('xhs_user', JSON.stringify(user))
  }

  const logout = () => {
    userInfo.value = {
      id: null,
      username: '',
      nickname: '',
      avatar: '',
      bio: '',
      followers: 0,
      following: 0,
      likes: 0
    }
    token.value = ''
    isLoggedIn.value = false
    
    localStorage.removeItem('xhs_token')
    localStorage.removeItem('xhs_user')
  }

  const updateUser = (data) => {
    userInfo.value = { ...userInfo.value, ...data }
    localStorage.setItem('xhs_user', JSON.stringify(userInfo.value))
  }

  return {
    userInfo,
    isLoggedIn,
    token,
    initUser,
    login,
    logout,
    updateUser
  }
})
