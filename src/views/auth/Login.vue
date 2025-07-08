<template>
    <div class="login-container">
      <div class="login-background">
        <div class="bg-overlay"></div>
      </div>
      
      <div class="login-content">
        <div class="login-box">
          <!-- Logo 和标题 -->
          <div class="login-header">
            <div class="logo">
              <el-icon size="40" color="#409eff">
                <Brush />
              </el-icon>
            </div>
            <h1>星澜校园创意工坊</h1>
            <p class="subtitle">发现创意，分享艺术</p>
          </div>
  
          <!-- 登录表单 -->
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            size="large"
            @submit.prevent="handleLogin"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                prefix-icon="User"
                clearable
              />
            </el-form-item>
  
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                prefix-icon="Lock"
                show-password
                clearable
                @keyup.enter="handleLogin"
              />
            </el-form-item>
  
            <el-form-item>
              <div class="form-actions">
                <el-checkbox v-model="rememberMe">记住我</el-checkbox>
                <el-link type="primary" :underline="false">忘记密码？</el-link>
              </div>
            </el-form-item>
  
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="loading"
                @click="handleLogin"
                class="login-btn"
              >
                <template v-if="!loading">
                  <el-icon><Key /></el-icon>
                  登录
                </template>
                <template v-else>
                  登录中...
                </template>
              </el-button>
            </el-form-item>
          </el-form>
  
          <!-- 注册链接 -->
          <div class="login-footer">
            <span>还没有账号？</span>
            <el-link 
              type="primary" 
              :underline="false"
              @click="$router.push('/register')"
            >
              立即注册
            </el-link>
          </div>
  
          <!-- 快速登录（演示用） -->
          <div class="quick-login">
            <el-divider>快速体验</el-divider>
            <div class="quick-btns">
              <el-button @click="quickLogin('admin')" size="small">
                管理员登录
              </el-button>
              <el-button @click="quickLogin('user')" size="small">
                普通用户登录
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  import { Brush, Key } from '@element-plus/icons-vue'  // 只导入实际使用的图标
  import { useUserStore } from '@/stores/user'
  
  // 组件名称设置为多词
  defineOptions({
    name: 'UserLogin'  // 多词组件名
  })
  
  const router = useRouter()
  const route = useRoute()
  const userStore = useUserStore()
  
  const loginFormRef = ref<FormInstance>()
  const loading = ref(false)
  const rememberMe = ref(false)
  
  const loginForm = reactive({
    username: '',
    password: ''
  })
  
  const loginRules: FormRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 50, message: '密码长度在 6 到 50 个字符', trigger: 'blur' }
    ]
  }
  
  // 登录处理
  const handleLogin = async () => {
    if (!loginFormRef.value) return
    
    await loginFormRef.value.validate(async (valid) => {
      if (valid) {
        loading.value = true
        try {
          await userStore.login(loginForm.username, loginForm.password)
          
          ElMessage.success('登录成功！')
          
          // 记住登录状态
          if (rememberMe.value) {
            localStorage.setItem('rememberMe', 'true')
          }
          
          // 跳转到目标页面或首页
          const redirect = (route.query.redirect as string) || '/'
          router.push(redirect)
          
        } catch (error) {
          console.error('登录失败:', error)
        } finally {
          loading.value = false
        }
      }
    })
  }
  
  // 快速登录（演示功能）
  const quickLogin = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      loginForm.username = 'admin'
      loginForm.password = '123456'
    } else {
      loginForm.username = 'user1'
      loginForm.password = '123456'
    }
    
    ElMessage.info(`已填入${type === 'admin' ? '管理员' : '普通用户'}账号信息`)
  }
  
  // 页面加载时检查记住登录状态
  onMounted(() => {
    // 如果已经登录，直接跳转
    if (userStore.token) {
      const redirect = (route.query.redirect as string) || '/'
      router.replace(redirect)
      return
    }
    
    // 检查是否记住登录状态
    const remembered = localStorage.getItem('rememberMe')
    if (remembered) {
      rememberMe.value = true
    }
  })
  </script>
  
  <style scoped>
  .login-container {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .login-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 1;
  }
  
  .bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.1;
  }
  
  .login-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 400px;
    padding: 20px;
  }
  
  .login-box {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 40px 32px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .logo {
    margin-bottom: 16px;
  }
  
  .login-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 8px;
  }
  
  .subtitle {
    color: #909399;
    font-size: 14px;
    margin: 0;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .login-btn {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
  }
  
  .login-footer {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: #666;
  }
  
  .login-footer .el-link {
    margin-left: 8px;
    font-weight: 500;
  }
  
  .quick-login {
    margin-top: 24px;
  }
  
  .quick-btns {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
  
  .quick-btns .el-button {
    flex: 1;
  }
  
  /* 响应式设计 */
  @media (max-width: 480px) {
    .login-content {
      padding: 15px;
    }
    
    .login-box {
      padding: 24px 20px;
    }
    
    .login-header h1 {
      font-size: 20px;
    }
    
    .quick-btns {
      flex-direction: column;
    }
  }
  
  /* 表单动画 */
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .el-input__inner {
    border-radius: 8px;
  }
  
  /* 加载动画 */
  .login-btn.is-loading {
    position: relative;
  }
  
  /* hover 效果 */
  .login-box:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }
  </style>