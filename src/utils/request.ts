import axios, { type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import type { ApiResponse } from '@/types/api'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, message, data } = response.data
    
    if (code === 200) {
      // 返回处理后的数据，保持原有的 AxiosResponse 结构
      return {
        ...response,
        data: {
          data,
          message
        }
      }
    } else if (code === 401) {
      ElMessage.error('登录已过期，请重新登录')
      const userStore = useUserStore()
      userStore.logout()
      router.push('/login')
      return Promise.reject(new Error(message))
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    console.error('请求错误:', error)
    
    if (error.response?.status === 401) {
      ElMessage.error('登录已过期，请重新登录')
      const userStore = useUserStore()
      userStore.logout()
      router.push('/login')
    } else if (error.response?.status >= 500) {
      ElMessage.error('服务器错误，请稍后重试')
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请稍后重试')
    } else {
      ElMessage.error('网络错误，请检查网络连接')
    }
    
    return Promise.reject(error)
  }
)

// 定义请求参数类型
type RequestParams = Record<string, unknown>
type RequestData = Record<string, unknown>

// 创建一个简化的请求函数
export const apiRequest = {
  async get<T>(url: string, params?: RequestParams): Promise<{ data: T; message: string }> {
    const response = await request.get(url, { params })
    return response.data
  },

  async post<T>(url: string, data?: RequestData): Promise<{ data: T; message: string }> {
    const response = await request.post(url, data)
    return response.data
  },

  async put<T>(url: string, data?: RequestData): Promise<{ data: T; message: string }> {
    const response = await request.put(url, data)
    return response.data
  },

  async delete<T>(url: string): Promise<{ data: T; message: string }> {
    const response = await request.delete(url)
    return response.data
  }
}

export default request