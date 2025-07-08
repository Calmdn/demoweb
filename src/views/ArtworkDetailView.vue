<template>
  <div class="artwork-detail-page">
    <div class="container">
      <div class="artwork-detail">
        <div class="artwork-image">
          <img src="/api/placeholder/600/400" alt="作品图片" />
        </div>
        
        <div class="artwork-info">
          <h1>作品标题 {{ $route.params.id }}</h1>
          <div class="artwork-meta">
            <span class="author">作者: 创作者名称</span>
            <span class="date">发布时间: 2024-01-01</span>
            <span class="views">浏览: 1234</span>
          </div>
          
          <div class="artwork-description">
            <h3>作品描述</h3>
            <p>这是一个精美的作品，展现了创作者的独特创意和技艺。</p>
          </div>
          
          <div class="artwork-actions">
            <el-button type="primary" size="large">
              <el-icon><Star /></el-icon>
              收藏
            </el-button>
            <el-button size="large">
              <el-icon><Share /></el-icon>
              分享
            </el-button>
          </div>
        </div>
      </div>
      
      <div class="related-artworks">
        <h2>相关作品</h2>
        <div class="artworks-grid">
          <div class="artwork-card" v-for="i in 4" :key="i">
            <div class="artwork-image">
              <img src="/api/placeholder/300/200" alt="相关作品" />
            </div>
            <div class="artwork-info">
              <h3>相关作品 {{ i }}</h3>
              <p>作者: 用户{{ i }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, Share } from '@element-plus/icons-vue'

defineOptions({
  name: 'ArtworkDetailView'
})
</script>

<style scoped>
.artwork-detail-page {
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.artwork-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.artwork-image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.artwork-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.artwork-info h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.artwork-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  color: #666;
}

.artwork-description {
  margin-bottom: 30px;
}

.artwork-description h3 {
  color: #333;
  margin-bottom: 10px;
}

.artwork-description p {
  color: #666;
  line-height: 1.6;
}

.artwork-actions {
  display: flex;
  gap: 10px;
}

.related-artworks {
  margin-top: 40px;
}

.related-artworks h2 {
  color: #333;
  margin-bottom: 20px;
}

.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

.artwork-card .artwork-image {
  height: 150px;
  box-shadow: none;
}

.artwork-card .artwork-info {
  padding: 15px;
}

.artwork-card .artwork-info h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1rem;
}

.artwork-card .artwork-info p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .artwork-detail {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>