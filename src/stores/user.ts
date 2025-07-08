import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginResponse } from '@/types/api'
import { apiRequest } from '@/utils/request'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<User | null>(null)

  // 初始化用户信息
  const initUser = async () => {
    if (token.value && !userInfo.value) {
      try {
        await getUserProfile()
      } catch {
        // Token无效，清除本地存储
        logout()
      }
    }
  }

  // 登录
  const login = async (username: string, password: string) => {
    const { data } = await apiRequest.post<LoginResponse>('/api/auth/login', {
      username,
      password
    })
    
    token.value = data.token
    localStorage.setItem('token', data.token)
    
    // 获取用户详细信息
    await getUserProfile()
    
    return data
  }

  // 注册
  const register = async (userData: { 
    username: string
    password: string
    email?: string 
  }) => {
    const { message } = await apiRequest.post<string>('/api/auth/register', userData)
    return message
  }

  // 获取用户信息
  const getUserProfile = async () => {
    const { data } = await apiRequest.get<User>('/api/user/profile')
    userInfo.value = data
    return data
  }

  // 更新用户信息
  const updateProfile = async (updateData: Partial<User>) => {
    const { data } = await apiRequest.put<User>('/api/user/profile', updateData)
    userInfo.value = data
    return data
  }

  // 登出
  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  // 检查是否为管理员
  const isAdmin = computed(() => userInfo.value?.role === 1)

  return {
    token,
    userInfo,
    isAdmin,
    login,
    register,
    getUserProfile,
    updateProfile,
    logout,
    initUser
  }
})