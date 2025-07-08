<template>
  <div class="artworks-page">
    <div class="container">
      <div class="page-header">
        <h1>作品列表</h1>
        <p>发现更多精彩作品</p>
      </div>
      
      <div class="artworks-content">
        <div class="filters">
          <el-input 
            v-model="searchKeyword" 
            placeholder="搜索作品..."
            clearable
            class="search-input"
          />
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
        
        <div class="artworks-grid">
          <div class="artwork-card" v-for="i in 8" :key="i">
            <div class="artwork-image">
              <img src="/api/placeholder/300/200" alt="作品图片" />
            </div>
            <div class="artwork-info">
              <h3>作品标题 {{ i }}</h3>
              <p>作品描述...</p>
              <div class="artwork-meta">
                <span class="author">作者: 用户{{ i }}</span>
                <span class="date">2024-01-01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'ArtworksView'
})

const route = useRoute()
const searchKeyword = ref<string>((route.query.keyword as string) || '')

const handleSearch = () => {
  // 搜索逻辑
  console.log('搜索:', searchKeyword.value)
}
</script>

<style scoped>
.artworks-page {
  padding: 20px 0;
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

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
}

.search-input {
  width: 300px;
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
  margin: 0 0 10px 0;
}

.artwork-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #999;
}
</style>