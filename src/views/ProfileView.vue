<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <div class="profile-avatar">
          <el-avatar :size="80" :src="userStore.userInfo?.avatar">
            <el-icon size="40"><User /></el-icon>
          </el-avatar>
        </div>
        <div class="profile-info">
          <h1>{{ userStore.userInfo?.username || '用户' }}</h1>
          <p>{{ userStore.userInfo?.email || 'user@example.com' }}</p>
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-number">12</span>
              <span class="stat-label">作品</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">56</span>
              <span class="stat-label">收藏</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">128</span>
              <span class="stat-label">关注</span>
            </div>
          </div>
        </div>
        <div class="profile-actions">
          <el-button type="primary" @click="$router.push('/settings')">
            编辑资料
          </el-button>
        </div>
      </div>
      
      <div class="profile-content">
        <el-tabs v-model="activeTab" class="profile-tabs">
          <el-tab-pane label="我的作品" name="artworks">
            <div class="artworks-grid">
              <div class="artwork-card" v-for="i in 6" :key="i">
                <div class="artwork-image">
                  <img src="https://picsum.photos/300/200" alt="作品" />
                </div>
                <div class="artwork-info">
                  <h3>我的作品 {{ i }}</h3>
                  <p>发布时间: 2024-01-0{{ i }}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="收藏作品" name="favorites">
            <div class="artworks-grid">
              <div class="artwork-card" v-for="i in 4" :key="i">
                <div class="artwork-image">
                  <img src="https://picsum.photos/300/200" alt="收藏作品" />
                </div>
                <div class="artwork-info">
                  <h3>收藏作品 {{ i }}</h3>
                  <p>收藏时间: 2024-01-0{{ i }}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="个人信息" name="info">
            <div class="profile-form">
              <el-form :model="profileForm" label-width="100px">
                <el-form-item label="用户名">
                  <el-input v-model="profileForm.username" disabled />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="profileForm.email" />
                </el-form-item>
                <el-form-item label="个人简介">
                  <el-input 
                    v-model="profileForm.bio" 
                    type="textarea" 
                    :rows="3"
                    placeholder="介绍一下你自己..."
                  />
                </el-form-item>
                <el-form-item label="注册时间">
                  <el-input value="2024-01-01" disabled />
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

defineOptions({
  name: 'ProfileView'
})

const userStore = useUserStore()
const activeTab = ref('artworks')

const profileForm = reactive({
  username: userStore.userInfo?.username || '',
  email: userStore.userInfo?.email || '',
  bio: ''
})
</script>

<style scoped>
.profile-page {
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.profile-avatar {
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 2rem;
}

.profile-info p {
  color: #666;
  margin: 0 0 20px 0;
}

.profile-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #409eff;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.profile-actions {
  flex-shrink: 0;
}

.profile-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.profile-tabs {
  margin-top: 20px;
}

.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.artwork-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.artwork-card:hover {
  transform: translateY(-5px);
}

.artwork-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.artwork-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artwork-info {
  padding: 15px;
}

.artwork-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.artwork-info p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.profile-form {
  max-width: 600px;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .profile-stats {
    justify-content: center;
  }
}
</style>