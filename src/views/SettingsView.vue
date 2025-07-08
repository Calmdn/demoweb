<template>
  <div class="settings-page">
    <div class="container">
      <div class="page-header">
        <h1>设置</h1>
        <p>管理您的账户设置</p>
      </div>
      
      <div class="settings-content">
        <div class="settings-sidebar">
          <div class="settings-menu">
            <div 
              class="menu-item" 
              :class="{ active: activeTab === 'profile' }"
              @click="activeTab = 'profile'"
            >
              <el-icon><User /></el-icon>
              <span>个人信息</span>
            </div>
            <div 
              class="menu-item" 
              :class="{ active: activeTab === 'security' }"
              @click="activeTab = 'security'"
            >
              <el-icon><Lock /></el-icon>
              <span>安全设置</span>
            </div>
            <div 
              class="menu-item" 
              :class="{ active: activeTab === 'privacy' }"
              @click="activeTab = 'privacy'"
            >
              <el-icon><View /></el-icon>
              <span>隐私设置</span>
            </div>
            <div 
              class="menu-item" 
              :class="{ active: activeTab === 'notification' }"
              @click="activeTab = 'notification'"
            >
              <el-icon><Bell /></el-icon>
              <span>通知设置</span>
            </div>
          </div>
        </div>
        
        <div class="settings-main">
          <!-- 个人信息设置 -->
          <div v-if="activeTab === 'profile'" class="settings-section">
            <h2>个人信息</h2>
            <el-form :model="profileForm" :rules="profileRules" ref="profileFormRef" label-width="120px">
              <el-form-item label="头像">
                <div class="avatar-upload">
                  <el-avatar :size="80" :src="profileForm.avatar">
                    <el-icon size="30"><User /></el-icon>
                  </el-avatar>
                  <el-button size="small" @click="handleAvatarUpload">更换头像</el-button>
                </div>
              </el-form-item>
              
              <el-form-item label="用户名" prop="username">
                <el-input v-model="profileForm.username" disabled />
                <div class="form-tip">用户名不可修改</div>
              </el-form-item>
              
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="profileForm.email" />
              </el-form-item>
              
              <el-form-item label="个人简介" prop="bio">
                <el-input 
                  v-model="profileForm.bio" 
                  type="textarea" 
                  :rows="4"
                  placeholder="介绍一下你自己..."
                />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveProfile" :loading="loading">
                  保存更改
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          
          <!-- 安全设置 -->
          <div v-if="activeTab === 'security'" class="settings-section">
            <h2>安全设置</h2>
            <el-form :model="securityForm" :rules="securityRules" ref="securityFormRef" label-width="120px">
              <el-form-item label="当前密码" prop="currentPassword">
                <el-input v-model="securityForm.currentPassword" type="password" show-password />
              </el-form-item>
              
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="securityForm.newPassword" type="password" show-password />
              </el-form-item>
              
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="securityForm.confirmPassword" type="password" show-password />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="changePassword" :loading="loading">
                  修改密码
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          
          <!-- 隐私设置 -->
          <div v-if="activeTab === 'privacy'" class="settings-section">
            <h2>隐私设置</h2>
            <div class="privacy-options">
              <div class="privacy-item">
                <div class="privacy-info">
                  <h3>个人资料可见性</h3>
                  <p>控制其他用户是否可以查看您的个人资料</p>
                </div>
                <el-switch v-model="privacySettings.profileVisible" />
              </div>
              
              <div class="privacy-item">
                <div class="privacy-info">
                  <h3>作品列表可见性</h3>
                  <p>控制其他用户是否可以查看您的作品列表</p>
                </div>
                <el-switch v-model="privacySettings.artworksVisible" />
              </div>
              
              <div class="privacy-item">
                <div class="privacy-info">
                  <h3>收藏列表可见性</h3>
                  <p>控制其他用户是否可以查看您的收藏列表</p>
                </div>
                <el-switch v-model="privacySettings.favoritesVisible" />
              </div>
              
              <div class="privacy-item">
                <div class="privacy-info">
                  <h3>在线状态</h3>
                  <p>控制是否显示您的在线状态</p>
                </div>
                <el-switch v-model="privacySettings.onlineStatus" />
              </div>
            </div>
          </div>
          
          <!-- 通知设置 -->
          <div v-if="activeTab === 'notification'" class="settings-section">
            <h2>通知设置</h2>
            <div class="notification-options">
              <div class="notification-item">
                <div class="notification-info">
                  <h3>新评论通知</h3>
                  <p>当有人评论您的作品时通知您</p>
                </div>
                <el-switch v-model="notificationSettings.newComments" />
              </div>
              
              <div class="notification-item">
                <div class="notification-info">
                  <h3>收藏通知</h3>
                  <p>当有人收藏您的作品时通知您</p>
                </div>
                <el-switch v-model="notificationSettings.newFavorites" />
              </div>
              
              <div class="notification-item">
                <div class="notification-info">
                  <h3>关注通知</h3>
                  <p>当有人关注您时通知您</p>
                </div>
                <el-switch v-model="notificationSettings.newFollows" />
              </div>
              
              <div class="notification-item">
                <div class="notification-info">
                  <h3>系统通知</h3>
                  <p>接收系统重要通知</p>
                </div>
                <el-switch v-model="notificationSettings.systemNotifications" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock, View, Bell } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

defineOptions({
  name: 'SettingsView'
})

const userStore = useUserStore()
const activeTab = ref('profile')
const loading = ref(false)
const profileFormRef = ref<FormInstance>()
const securityFormRef = ref<FormInstance>()

const profileForm = reactive({
  username: userStore.userInfo?.username || '',
  email: userStore.userInfo?.email || '',
  bio: '',
  avatar: ''
})

const securityForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const privacySettings = reactive({
  profileVisible: true,
  artworksVisible: true,
  favoritesVisible: false,
  onlineStatus: true
})

const notificationSettings = reactive({
  newComments: true,
  newFavorites: true,
  newFollows: true,
  systemNotifications: true
})

const profileRules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const securityRules: FormRules = {
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 50, message: '密码长度在 6 到 50 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== securityForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const handleAvatarUpload = () => {
  ElMessage.info('头像上传功能暂未实现')
}

const saveProfile = async () => {
  if (!profileFormRef.value) return
  
  await profileFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 模拟保存操作
        await new Promise(resolve => setTimeout(resolve, 1000))
        ElMessage.success('个人信息保存成功')
      } catch (error) {
        ElMessage.error('保存失败，请重试')
      } finally {
        loading.value = false
      }
    }
  })
}

const changePassword = async () => {
  if (!securityFormRef.value) return
  
  await securityFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 模拟修改密码操作
        await new Promise(resolve => setTimeout(resolve, 1000))
        ElMessage.success('密码修改成功')
        // 清空表单
        securityForm.currentPassword = ''
        securityForm.newPassword = ''
        securityForm.confirmPassword = ''
      } catch (error) {
        ElMessage.error('密码修改失败，请重试')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.settings-page {
  padding: 20px 0;
  background: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.settings-content {
  display: flex;
  gap: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.settings-sidebar {
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #eee;
}

.settings-menu {
  padding: 20px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.menu-item:hover {
  background: #e9ecef;
  color: #333;
}

.menu-item.active {
  background: #409eff;
  color: white;
}

.settings-main {
  flex: 1;
  padding: 30px;
}

.settings-section h2 {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 15px;
}

.form-tip {
  color: #999;
  font-size: 0.8rem;
  margin-top: 5px;
}

.privacy-options,
.notification-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.privacy-item,
.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #f8f9fa;
}

.privacy-info,
.notification-info {
  flex: 1;
}

.privacy-info h3,
.notification-info h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1rem;
}

.privacy-info p,
.notification-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .settings-content {
    flex-direction: column;
  }
  
  .settings-sidebar {
    width: 100%;
  }
  
  .settings-menu {
    display: flex;
    overflow-x: auto;
    padding: 10px 0;
  }
  
  .menu-item {
    flex-shrink: 0;
    white-space: nowrap;
  }
  
  .privacy-item,
  .notification-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>