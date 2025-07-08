<template>
  <div class="categories-page">
    <div class="container">
      <div class="page-header">
        <h1>作品分类</h1>
        <p>探索不同类型的创意作品</p>
      </div>
      
      <div class="categories-grid">
        <div class="category-card" v-for="category in categories" :key="category.id">
          <div class="category-image">
            <img :src="category.image" :alt="category.name" />
          </div>
          <div class="category-info">
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <div class="category-stats">
              <span class="stat">{{ category.count }} 作品</span>
              <span class="stat">{{ category.artists }} 创作者</span>
            </div>
            <el-button type="primary" @click="viewCategory(category.id)">
              查看作品
            </el-button>
          </div>
        </div>
      </div>
      
      <div class="featured-artworks">
        <h2>精选作品</h2>
        <div class="artworks-grid">
          <div class="artwork-card" v-for="i in 6" :key="i">
            <div class="artwork-image">
              <img src="/api/placeholder/300/200" alt="精选作品" />
            </div>
            <div class="artwork-info">
              <h3>精选作品 {{ i }}</h3>
              <p>创作者: 艺术家{{ i }}</p>
              <div class="artwork-category">
                <el-tag size="small">{{ categories[i % categories.length].name }}</el-tag>
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
import { useRouter } from 'vue-router'

defineOptions({
  name: 'CategoriesView'
})

const router = useRouter()

const categories = ref([
  {
    id: 1,
    name: '数字艺术',
    description: '现代数字技术创作的艺术作品',
    image: '/api/placeholder/400/300',
    count: 245,
    artists: 58
  },
  {
    id: 2,
    name: '传统绘画',
    description: '使用传统绘画技法创作的作品',
    image: '/api/placeholder/400/300',
    count: 189,
    artists: 42
  },
  {
    id: 3,
    name: '摄影',
    description: '用光影记录美好瞬间',
    image: '/api/placeholder/400/300',
    count: 356,
    artists: 89
  },
  {
    id: 4,
    name: '设计',
    description: '创意设计与视觉传达',
    image: '/api/placeholder/400/300',
    count: 198,
    artists: 67
  },
  {
    id: 5,
    name: '雕塑',
    description: '立体艺术的魅力展现',
    image: '/api/placeholder/400/300',
    count: 78,
    artists: 23
  },
  {
    id: 6,
    name: '手工艺',
    description: '传统工艺与现代创新',
    image: '/api/placeholder/400/300',
    count: 134,
    artists: 45
  }
])

const viewCategory = (categoryId: number) => {
  router.push(`/artworks?category=${categoryId}`)
}
</script>

<style scoped>
.categories-page {
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
  margin-bottom: 40px;
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.category-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.category-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover .category-image img {
  transform: scale(1.05);
}

.category-info {
  padding: 25px;
}

.category-info h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.category-info p {
  margin: 0 0 15px 0;
  color: #666;
  line-height: 1.6;
}

.category-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat {
  color: #999;
  font-size: 0.9rem;
}

.featured-artworks {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.featured-artworks h2 {
  text-align: center;
  color: #333;
  margin: 0 0 30px 0;
  font-size: 2rem;
}

.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
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
  padding: 20px;
}

.artwork-info h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.1rem;
}

.artwork-info p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.9rem;
}

.artwork-category {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .category-stats {
    flex-direction: column;
    gap: 5px;
  }
  
  .featured-artworks {
    padding: 20px;
  }
  
  .artworks-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}
</style>