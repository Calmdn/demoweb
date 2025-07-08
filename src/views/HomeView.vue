<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Star, User, ShoppingBag, Camera, Palette, Music,
  Picture, Trophy, ArrowRight, Eye, Heart
} from '@element-plus/icons-vue'
import type { Artwork, ArtworkCategory, User as UserType } from '@/types/api'
import { apiRequest } from '@/utils/request'

const router = useRouter()

// 响应式数据
const loading = ref(true)
const featuredArtworks = ref<Artwork[]>([])
const latestArtworks = ref<Artwork[]>([])
const categories = ref<ArtworkCategory[]>([])
const featuredCreators = ref<UserType[]>([])

// 模拟数据，实际项目中应该从API获取
const mockFeaturedArtworks: Artwork[] = [
  {
    id: 1,
    title: '星空下的梦境',
    description: '用水彩描绘的梦幻星空场景',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
    categoryId: 1,
    categoryName: '插画',
    userId: 1,
    authorName: '小星',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    price: 299,
    originalPrice: 399,
    tags: '插画,水彩,星空',
    viewCount: 1250,
    likeCount: 89,
    favoriteCount: 32,
    commentCount: 15,
    status: 1,
    isFeatured: true,
    isForSale: true,
    uploadTime: '2024-01-15 10:30:00',
    updateTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    title: '现代城市印象',
    description: '用线条和色彩表现的都市风景',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
    thumbnailUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300',
    categoryId: 2,
    categoryName: '摄影',
    userId: 2,
    authorName: '城市猎人',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    price: 199,
    tags: '摄影,城市,风景',
    viewCount: 980,
    likeCount: 67,
    favoriteCount: 28,
    commentCount: 12,
    status: 1,
    isFeatured: true,
    isForSale: true,
    uploadTime: '2024-01-14 15:20:00',
    updateTime: '2024-01-14 15:20:00'
  },
  {
    id: 3,
    title: '手工陶艺花瓶',
    description: '纯手工制作的青花瓷风格花瓶',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
    categoryId: 3,
    categoryName: '手工艺',
    userId: 3,
    authorName: '陶艺师',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    price: 599,
    tags: '陶艺,手工,花瓶',
    viewCount: 756,
    likeCount: 45,
    favoriteCount: 19,
    commentCount: 8,
    status: 1,
    isFeatured: true,
    isForSale: true,
    uploadTime: '2024-01-13 09:45:00',
    updateTime: '2024-01-13 09:45:00'
  }
]

const mockLatestArtworks: Artwork[] = [
  {
    id: 4,
    title: '日系小清新插画',
    description: '温暖治愈的日系风格插画',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300',
    categoryId: 1,
    categoryName: '插画',
    userId: 4,
    authorName: '治愈系画师',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    price: 150,
    tags: '插画,日系,治愈',
    viewCount: 432,
    likeCount: 28,
    favoriteCount: 12,
    commentCount: 5,
    status: 1,
    isFeatured: false,
    isForSale: true,
    uploadTime: '2024-01-16 14:30:00',
    updateTime: '2024-01-16 14:30:00'
  },
  {
    id: 5,
    title: '抽象艺术作品',
    description: '现代抽象风格的数字艺术',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300',
    categoryId: 4,
    categoryName: '数字艺术',
    userId: 5,
    authorName: '数字艺术家',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    price: 399,
    tags: '数字艺术,抽象,现代',
    viewCount: 287,
    likeCount: 19,
    favoriteCount: 8,
    commentCount: 3,
    status: 1,
    isFeatured: false,
    isForSale: true,
    uploadTime: '2024-01-16 11:15:00',
    updateTime: '2024-01-16 11:15:00'
  }
]

const mockCategories: ArtworkCategory[] = [
  { id: 1, name: '插画', description: '手绘和数字插画作品', icon: 'Palette', sort: 1, status: 1 },
  { id: 2, name: '摄影', description: '摄影作品和图片', icon: 'Camera', sort: 2, status: 1 },
  { id: 3, name: '手工艺', description: '手工制作的艺术品', icon: 'Trophy', sort: 3, status: 1 },
  { id: 4, name: '数字艺术', description: '数字创作和设计', icon: 'Picture', sort: 4, status: 1 },
  { id: 5, name: '音乐', description: '原创音乐作品', icon: 'Music', sort: 5, status: 1 },
  { id: 6, name: '视频', description: '视频创作和动画', icon: 'VideoCamera', sort: 6, status: 1 }
]

const mockFeaturedCreators: UserType[] = [
  {
    id: 1,
    username: '小星',
    email: 'star@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    role: 0,
    status: 1,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    username: '城市猎人',
    email: 'hunter@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    role: 0,
    status: 1,
    createTime: '2024-01-02 11:00:00',
    updateTime: '2024-01-14 15:20:00'
  },
  {
    id: 3,
    username: '陶艺师',
    email: 'potter@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    role: 0,
    status: 1,
    createTime: '2024-01-03 12:00:00',
    updateTime: '2024-01-13 09:45:00'
  }
]

// 获取数据的方法
const fetchData = async () => {
  try {
    loading.value = true
    
    // 在实际项目中，这里应该调用真实的API
    // const [featuredRes, latestRes, categoriesRes, creatorsRes] = await Promise.all([
    //   apiRequest.get('/api/artworks/featured'),
    //   apiRequest.get('/api/artworks/latest'),
    //   apiRequest.get('/api/categories'),
    //   apiRequest.get('/api/creators/featured')
    // ])
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    featuredArtworks.value = mockFeaturedArtworks
    latestArtworks.value = mockLatestArtworks
    categories.value = mockCategories
    featuredCreators.value = mockFeaturedCreators
    
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取数据失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 事件处理方法
const goToArtworks = () => {
  router.push('/artworks')
}

const goToPublish = () => {
  router.push('/publish')
}

const goToCategory = (categoryId: number) => {
  router.push(`/artworks?category=${categoryId}`)
}

const goToCreator = (userId: number) => {
  router.push(`/creators/${userId}`)
}

const viewArtwork = (artworkId: number) => {
  router.push(`/artworks/${artworkId}`)
}

// 获取分类图标组件
const getCategoryIcon = (iconName?: string) => {
  const iconMap: Record<string, any> = {
    'Palette': Palette,
    'Camera': Camera,
    'Trophy': Trophy,
    'Picture': Picture,
    'Music': Music,
    'VideoCamera': Camera // 暂时使用Camera图标
  }
  return iconMap[iconName || 'Picture'] || Picture
}

// 组件挂载时获取数据
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="home-page">
    <!-- Hero 区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">星澜校园创意工坊</h1>
          <p class="hero-subtitle">发现创意，分享艺术，让每一个创作都闪闪发光</p>
          <p class="hero-description">
            在这里，每个人都是艺术家。无论是插画、摄影、手工艺还是数字创作，
            都能找到属于自己的舞台。加入我们，一起创造美好！
          </p>
          <div class="hero-actions">
            <el-button 
              type="primary" 
              size="large" 
              @click="goToArtworks"
              class="hero-btn primary-btn"
            >
              <el-icon><Eye /></el-icon>
              浏览作品
            </el-button>
            <el-button 
              size="large" 
              @click="goToPublish"
              class="hero-btn secondary-btn"
            >
              <el-icon><Camera /></el-icon>
              开始创作
            </el-button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-image-grid">
            <div class="grid-item item-1">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200" alt="创意作品" />
            </div>
            <div class="grid-item item-2">
              <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200" alt="创意作品" />
            </div>
            <div class="grid-item item-3">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200" alt="创意作品" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 推荐作品区域 -->
    <section class="featured-section">
      <div class="section-header">
        <h2 class="section-title">
          <el-icon><Star /></el-icon>
          精选推荐
        </h2>
        <p class="section-subtitle">发现最受欢迎的优质作品</p>
      </div>
      
      <div class="artworks-grid" v-loading="loading">
        <div 
          v-for="artwork in featuredArtworks" 
          :key="artwork.id" 
          class="artwork-card"
          @click="viewArtwork(artwork.id)"
        >
          <div class="artwork-image">
            <img :src="artwork.thumbnailUrl" :alt="artwork.title" />
            <div class="artwork-overlay">
              <div class="artwork-stats">
                <span class="stat-item">
                  <el-icon><Eye /></el-icon>
                  {{ artwork.viewCount }}
                </span>
                <span class="stat-item">
                  <el-icon><Heart /></el-icon>
                  {{ artwork.likeCount }}
                </span>
              </div>
            </div>
          </div>
          <div class="artwork-info">
            <h3 class="artwork-title">{{ artwork.title }}</h3>
            <div class="artwork-author">
              <el-avatar :size="24" :src="artwork.authorAvatar" />
              <span class="author-name">{{ artwork.authorName }}</span>
            </div>
            <div class="artwork-price">
              <span class="current-price">¥{{ artwork.price }}</span>
              <span v-if="artwork.originalPrice && artwork.originalPrice > artwork.price" class="original-price">
                ¥{{ artwork.originalPrice }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section-actions">
        <el-button type="primary" @click="goToArtworks">
          查看更多作品
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
    </section>

    <!-- 分类快速导航 -->
    <section class="categories-section">
      <div class="section-header">
        <h2 class="section-title">
          <el-icon><Picture /></el-icon>
          作品分类
        </h2>
        <p class="section-subtitle">快速找到你感兴趣的创作类型</p>
      </div>
      
      <div class="categories-grid" v-loading="loading">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="category-card"
          @click="goToCategory(category.id)"
        >
          <div class="category-icon">
            <el-icon size="32">
              <component :is="getCategoryIcon(category.icon)" />
            </el-icon>
          </div>
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-description">{{ category.description }}</p>
        </div>
      </div>
    </section>

    <!-- 创作者推荐 -->
    <section class="creators-section">
      <div class="section-header">
        <h2 class="section-title">
          <el-icon><User /></el-icon>
          优秀创作者
        </h2>
        <p class="section-subtitle">关注才华横溢的艺术家们</p>
      </div>
      
      <div class="creators-grid" v-loading="loading">
        <div 
          v-for="creator in featuredCreators" 
          :key="creator.id" 
          class="creator-card"
        >
          <div class="creator-avatar">
            <el-avatar :size="80" :src="creator.avatar" />
          </div>
          <div class="creator-info">
            <h3 class="creator-name">{{ creator.username }}</h3>
            <p class="creator-stats">12 件作品 · 256 关注者</p>
            <el-button 
              type="primary" 
              size="small" 
              @click="goToCreator(creator.id)"
              class="follow-btn"
            >
              关注
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新作品区域 -->
    <section class="latest-section">
      <div class="section-header">
        <h2 class="section-title">
          <el-icon><ShoppingBag /></el-icon>
          最新上传
        </h2>
        <p class="section-subtitle">第一时间发现新鲜创作</p>
      </div>
      
      <div class="artworks-list" v-loading="loading">
        <div 
          v-for="artwork in latestArtworks" 
          :key="artwork.id" 
          class="artwork-item"
          @click="viewArtwork(artwork.id)"
        >
          <div class="artwork-thumbnail">
            <img :src="artwork.thumbnailUrl" :alt="artwork.title" />
          </div>
          <div class="artwork-details">
            <h3 class="artwork-title">{{ artwork.title }}</h3>
            <p class="artwork-description">{{ artwork.description }}</p>
            <div class="artwork-meta">
              <div class="artwork-author">
                <el-avatar :size="20" :src="artwork.authorAvatar" />
                <span class="author-name">{{ artwork.authorName }}</span>
              </div>
              <div class="artwork-stats">
                <span class="stat-item">
                  <el-icon><Eye /></el-icon>
                  {{ artwork.viewCount }}
                </span>
                <span class="stat-item">
                  <el-icon><Heart /></el-icon>
                  {{ artwork.likeCount }}
                </span>
              </div>
            </div>
          </div>
          <div class="artwork-price">
            <span class="current-price">¥{{ artwork.price }}</span>
          </div>
        </div>
      </div>
      
      <div class="section-actions">
        <el-button type="primary" @click="goToArtworks">
          查看更多作品
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Hero 区域样式 */
.hero-section {
  background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
  color: white;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 20px;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.8;
}

.hero-actions {
  display: flex;
  gap: 20px;
}

.hero-btn {
  height: 50px;
  padding: 0 30px;
  font-size: 16px;
  border-radius: 25px;
  font-weight: 600;
}

.primary-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.primary-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.secondary-btn {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  color: white;
  transform: translateY(-2px);
}

.hero-visual {
  position: relative;
}

.hero-image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  transform: perspective(1000px) rotateY(-10deg);
}

.grid-item {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-10px);
}

.grid-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.item-3 {
  grid-column: 1 / -1;
  height: 120px;
}

.item-3 img {
  height: 120px;
}

/* 通用section样式 */
section {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #303133;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.section-title .el-icon {
  color: #409eff;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #606266;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 推荐作品样式 */
.featured-section {
  background: white;
  margin: 0 24px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.artworks-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.artwork-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.artwork-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
}

.artwork-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.artwork-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.artwork-card:hover .artwork-image img {
  transform: scale(1.05);
}

.artwork-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.artwork-card:hover .artwork-overlay {
  opacity: 1;
}

.artwork-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 14px;
}

.artwork-info {
  padding: 20px;
}

.artwork-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
  line-height: 1.4;
}

.artwork-author {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.author-name {
  color: #606266;
  font-size: 14px;
}

.artwork-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #409eff;
}

.original-price {
  font-size: 0.9rem;
  color: #909399;
  text-decoration: line-through;
}

/* 分类导航样式 */
.categories-section {
  background: #f8f9fa;
}

.categories-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.category-card {
  background: white;
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.category-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #409eff, #67c23a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.category-description {
  color: #606266;
  font-size: 14px;
  line-height: 1.4;
}

/* 创作者推荐样式 */
.creators-section {
  background: white;
}

.creators-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.creator-card {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.creator-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.creator-avatar {
  margin-bottom: 20px;
}

.creator-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.creator-stats {
  color: #606266;
  font-size: 14px;
  margin-bottom: 20px;
}

.follow-btn {
  border-radius: 20px;
}

/* 最新作品样式 */
.latest-section {
  background: #f8f9fa;
}

.artworks-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.artwork-item {
  background: white;
  padding: 20px;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 20px;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.artwork-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.artwork-thumbnail {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.artwork-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artwork-details {
  flex: 1;
}

.artwork-details .artwork-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.artwork-details .artwork-description {
  color: #606266;
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.4;
}

.artwork-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.artwork-meta .artwork-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.artwork-meta .author-name {
  font-size: 14px;
  color: #606266;
}

.artwork-meta .artwork-stats {
  display: flex;
  gap: 12px;
}

.artwork-meta .stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #909399;
  font-size: 12px;
}

.artwork-item .artwork-price {
  text-align: right;
}

.artwork-item .current-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #409eff;
}

/* section actions */
.section-actions {
  text-align: center;
  margin-top: 40px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-image-grid {
    transform: none;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .artworks-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .creators-grid {
    grid-template-columns: 1fr;
  }
  
  .artwork-item {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .artwork-meta {
    justify-content: center;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
