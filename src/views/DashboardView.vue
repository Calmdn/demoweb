<template>
  <div class="dashboard-page">
    <div class="container">
      <div class="page-header">
        <h1>个人中心</h1>
        <p>欢迎回来，{{ userStore.userInfo?.username || '用户' }}</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-header">
            <h3>数据统计</h3>
          </div>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <el-icon size="24" color="#409eff"><PictureRounded /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">12</div>
                <div class="stat-label">作品总数</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <el-icon size="24" color="#67c23a"><View /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">1,234</div>
                <div class="stat-label">总浏览量</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <el-icon size="24" color="#e6a23c"><Star /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">56</div>
                <div class="stat-label">收藏数</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <el-icon size="24" color="#f56c6c"><UserFilled /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">89</div>
                <div class="stat-label">关注者</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="dashboard-card">
          <div class="card-header">
            <h3>快速操作</h3>
          </div>
          <div class="actions-grid">
            <el-button type="primary" @click="$router.push('/publish')" class="action-btn">
              <el-icon><Plus /></el-icon>
              发布作品
            </el-button>
            <el-button @click="$router.push('/artworks')" class="action-btn">
              <el-icon><View /></el-icon>
              浏览作品
            </el-button>
            <el-button @click="$router.push('/profile')" class="action-btn">
              <el-icon><User /></el-icon>
              我的资料
            </el-button>
            <el-button @click="$router.push('/settings')" class="action-btn">
              <el-icon><Setting /></el-icon>
              账户设置
            </el-button>
          </div>
        </div>
        
        <div class="dashboard-card">
          <div class="card-header">
            <h3>最新活动</h3>
          </div>
          <div class="activity-list">
            <div class="activity-item" v-for="i in 5" :key="i">
              <div class="activity-icon">
                <el-icon><Bell /></el-icon>
              </div>
              <div class="activity-content">
                <p>你的作品《作品标题{{ i }}》获得了新的评论</p>
                <span class="activity-time">2024-01-0{{ i }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="dashboard-card">
          <div class="card-header">
            <h3>最近作品</h3>
          </div>
          <div class="recent-artworks">
            <div class="artwork-item" v-for="i in 3" :key="i">
              <div class="artwork-thumbnail">
                <img src="https://picsum.photos/80/80" alt="作品缩略图" />
              </div>
              <div class="artwork-info">
                <h4>作品标题{{ i }}</h4>
                <p>发布于 2024-01-0{{ i }}</p>
                <span class="artwork-stats">浏览: 123 | 收藏: 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  PictureRounded, View, Star, UserFilled, Plus, User, Setting, Bell 
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

defineOptions({
  name: 'DashboardView'
})

const userStore = useUserStore()
</script>

<style scoped>
.dashboard-page {
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

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.dashboard-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 20px;
}

.action-btn {
  height: 60px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.activity-list {
  padding: 20px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.activity-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 0.9rem;
}

.activity-time {
  color: #999;
  font-size: 0.8rem;
}

.recent-artworks {
  padding: 20px;
}

.artwork-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.artwork-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.artwork-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.artwork-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artwork-info {
  flex: 1;
}

.artwork-info h4 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1rem;
}

.artwork-info p {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 0.9rem;
}

.artwork-stats {
  color: #999;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>