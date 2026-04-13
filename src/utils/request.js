import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('xhs_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    
    if (res.code === 200 || res.success) {
      return res
    }
    
    ElMessage({
      message: res.message || '请求失败',
      type: 'error',
      duration: 3 * 1000
    })
    
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  error => {
    console.error('Response error:', error)
    
    if (error.response) {
      const { status } = error.response
      
      switch (status) {
        case 401:
          ElMessage.error('登录已过期，请重新登录')
          localStorage.removeItem('xhs_token')
          localStorage.removeItem('xhs_user')
          router.push('/login')
          break
        case 403:
          ElMessage.error('没有权限执行此操作')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器错误，请稍后重试')
          break
        default:
          ElMessage.error(error.response.data?.message || '请求失败')
      }
    } else if (error.message.includes('timeout')) {
      ElMessage.error('请求超时，请检查网络')
    } else {
      ElMessage.error('网络错误，请检查网络连接')
    }
    
    return Promise.reject(error)
  }
)

export default service
