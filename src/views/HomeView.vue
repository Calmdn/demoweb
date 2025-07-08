<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 类型定义
interface Category {
  id: number
  name: string
  icon: string
}
interface Artwork {
  id: number
  title: string
  imageUrl: string
  authorName: string
}
interface Creator {
  id: number
  username: string
  avatar: string
  bio: string
}

// 明确指定类型
const categories = ref<Category[]>([])
const hotArtworks = ref<Artwork[]>([])
const featuredCreators = ref<Creator[]>([])

onMounted(() => {
  // TODO: 调用API获取数据
})
</script>

<template>
  <div class="home-page">
    <!-- 分类导航 -->
    <section class="category-section">
      <h2>热门分类</h2>
      <div class="category-list">
        <div v-for="cat in categories" :key="cat.id" class="category-item">
          <img :src="cat.icon" alt="" class="category-icon" />
          <span>{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <!-- 热门作品 -->
    <section class="artwork-section">
      <h2>热门作品</h2>
      <div class="artwork-list">
        <div v-for="art in hotArtworks" :key="art.id" class="artwork-card">
          <img :src="art.imageUrl" alt="" class="artwork-img" />
          <div class="artwork-info">
            <h3>{{ art.title }}</h3>
            <p>{{ art.authorName }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 优秀创作者 -->
    <section class="creator-section">
      <h2>优秀创作者</h2>
      <div class="creator-list">
        <div v-for="creator in featuredCreators" :key="creator.id" class="creator-card">
          <img :src="creator.avatar" alt="" class="creator-avatar" />
          <div class="creator-info">
            <h3>{{ creator.username }}</h3>
            <p>{{ creator.bio }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  background: #f5f7fa;
}

.category-section,
.artwork-section,
.creator-section {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 20px;
}

.category-list,
.artwork-list,
.creator-list {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.category-item {
  background: #fff;
  border-radius: 12px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.category-item:hover {
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.15);
}

.category-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}

.artwork-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  width: 220px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s;
  cursor: pointer;
}

.artwork-card:hover {
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.15);
}

.artwork-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.artwork-info {
  padding: 12px;
}

.creator-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  width: 180px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s;
}

.creator-card:hover {
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.15);
}

.creator-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 8px;
  object-fit: cover;
}
</style>