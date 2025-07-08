<template>
  <div class="creators-page">
    <div class="container">
      <div class="page-header">
        <h1>创作者</h1>
        <p>发现才华横溢的艺术家</p>
      </div>
      
      <div class="creators-filters">
        <div class="filter-tabs">
          <el-tabs v-model="activeTab" @tab-click="handleTabChange">
            <el-tab-pane label="全部创作者" name="all" />
            <el-tab-pane label="热门创作者" name="popular" />
            <el-tab-pane label="新晋创作者" name="newcomer" />
          </el-tabs>
        </div>
        
        <div class="filter-controls">
          <el-select v-model="sortBy" placeholder="排序方式" @change="handleSortChange">
            <el-option label="按关注度" value="followers" />
            <el-option label="按作品数量" value="artworks" />
            <el-option label="按注册时间" value="joined" />
          </el-select>
          
          <el-input 
            v-model="searchKeyword" 
            placeholder="搜索创作者..."
            clearable
            @input="handleSearch"
          />
        </div>
      </div>
      
      <div class="creators-grid">
        <div class="creator-card" v-for="creator in creators" :key="creator.id">
          <div class="creator-header">
            <div class="creator-avatar">
              <el-avatar :size="60" :src="creator.avatar">
                <el-icon size="30"><User /></el-icon>
              </el-avatar>
            </div>
            <div class="creator-info">
              <h3>{{ creator.username }}</h3>
              <p class="creator-title">{{ creator.title }}</p>
              <div class="creator-stats">
                <span class="stat">{{ creator.followers }} 关注者</span>
                <span class="stat">{{ creator.artworks }} 作品</span>
              </div>
            </div>
          </div>
          
          <div class="creator-bio">
            <p>{{ creator.bio }}</p>
          </div>
          
          <div class="creator-artworks">
            <div class="artwork-preview" v-for="artwork in creator.recentArtworks" :key="artwork.id">
              <img :src="artwork.image" :alt="artwork.title" />
            </div>
          </div>
          
          <div class="creator-actions">
            <el-button 
              type="primary" 
              :class="{ followed: creator.isFollowed }"
              @click="toggleFollow(creator.id)"
            >
              {{ creator.isFollowed ? '已关注' : '关注' }}
            </el-button>
            <el-button @click="viewProfile(creator.id)">
              查看主页
            </el-button>
          </div>
        </div>
      </div>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="totalCount"
          layout="prev, pager, next, jumper"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User } from '@element-plus/icons-vue'

defineOptions({
  name: 'CreatorsView'
})

const router = useRouter()

const activeTab = ref('all')
const sortBy = ref('followers')
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(12)
const totalCount = ref(100)

const creators = ref([
  {
    id: 1,
    username: '张艺术家',
    title: '数字艺术家',
    bio: '专注于数字艺术创作，擅长概念设计和角色设计',
    avatar: 'https://picsum.photos/60/60',
    followers: 1234,
    artworks: 45,
    isFollowed: false,
    recentArtworks: [
      { id: 1, title: '作品1', image: 'https://picsum.photos/80/80' },
      { id: 2, title: '作品2', image: 'https://picsum.photos/80/80' },
      { id: 3, title: '作品3', image: 'https://picsum.photos/80/80' }
    ]
  },
  {
    id: 2,
    username: '李摄影师',
    title: '风光摄影师',
    bio: '用镜头捕捉世界的美好，专注于自然风光摄影',
    avatar: 'https://picsum.photos/60/60',
    followers: 567,
    artworks: 89,
    isFollowed: true,
    recentArtworks: [
      { id: 4, title: '作品4', image: 'https://picsum.photos/80/80' },
      { id: 5, title: '作品5', image: 'https://picsum.photos/80/80' },
      { id: 6, title: '作品6', image: 'https://picsum.photos/80/80' }
    ]
  },
  {
    id: 3,
    username: '王设计师',
    title: 'UI/UX设计师',
    bio: '专注于用户体验设计，创造美观实用的界面',
    avatar: 'https://picsum.photos/60/60',
    followers: 890,
    artworks: 67,
    isFollowed: false,
    recentArtworks: [
      { id: 7, title: '作品7', image: 'https://picsum.photos/80/80' },
      { id: 8, title: '作品8', image: 'https://picsum.photos/80/80' },
      { id: 9, title: '作品9', image: 'https://picsum.photos/80/80' }
    ]
  },
  {
    id: 4,
    username: '赵画家',
    title: '传统绘画艺术家',
    bio: '传承传统绘画技法，融合现代艺术理念',
    avatar: 'https://picsum.photos/60/60',
    followers: 345,
    artworks: 23,
    isFollowed: false,
    recentArtworks: [
      { id: 10, title: '作品10', image: 'https://picsum.photos/80/80' },
      { id: 11, title: '作品11', image: 'https://picsum.photos/80/80' },
      { id: 12, title: '作品12', image: 'https://picsum.photos/80/80' }
    ]
  },
  {
    id: 5,
    username: '孙雕塑师',
    title: '雕塑艺术家',
    bio: '专注于现代雕塑创作，探索形式与空间的关系',
    avatar: 'https://picsum.photos/60/60',
    followers: 678,
    artworks: 34,
    isFollowed: true,
    recentArtworks: [
      { id: 13, title: '作品13', image: 'https://picsum.photos/80/80' },
      { id: 14, title: '作品14', image: 'https://picsum.photos/80/80' },
      { id: 15, title: '作品15', image: 'https://picsum.photos/80/80' }
    ]
  },
  {
    id: 6,
    username: '周手工匠',
    title: '手工艺术家',
    bio: '传统手工艺与现代设计的完美结合',
    avatar: 'https://picsum.photos/60/60',
    followers: 456,
    artworks: 56,
    isFollowed: false,
    recentArtworks: [
      { id: 16, title: '作品16', image: 'https://picsum.photos/80/80' },
      { id: 17, title: '作品17', image: 'https://picsum.photos/80/80' },
      { id: 18, title: '作品18', image: 'https://picsum.photos/80/80' }
    ]
  }
])

const handleTabChange = (tab: any) => {
  activeTab.value = tab.name
  // 根据tab加载不同的数据
  loadCreators()
}

const handleSortChange = (value: string) => {
  sortBy.value = value
  loadCreators()
}

const handleSearch = () => {
  // 搜索逻辑
  loadCreators()
}

const toggleFollow = (creatorId: number) => {
  const creator = creators.value.find(c => c.id === creatorId)
  if (creator) {
    creator.isFollowed = !creator.isFollowed
    if (creator.isFollowed) {
      creator.followers++
      ElMessage.success('关注成功')
    } else {
      creator.followers--
      ElMessage.success('取消关注')
    }
  }
}

const viewProfile = (creatorId: number) => {
  router.push(`/profile/${creatorId}`)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadCreators()
}

const loadCreators = () => {
  // 这里应该根据activeTab, sortBy, searchKeyword等参数加载数据
  console.log('Loading creators...', { activeTab: activeTab.value, sortBy: sortBy.value, searchKeyword: searchKeyword.value })
}

onMounted(() => {
  loadCreators()
})
</script>

<style scoped>
.creators-page {
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

.creators-filters {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.filter-tabs {
  margin-bottom: 20px;
}

.filter-controls {
  display: flex;
  gap: 15px;
  align-items: center;
}

.filter-controls .el-select {
  width: 150px;
}

.filter-controls .el-input {
  width: 300px;
}

.creators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.creator-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.creator-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.creator-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.creator-info {
  flex: 1;
}

.creator-info h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
}

.creator-title {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.9rem;
}

.creator-stats {
  display: flex;
  gap: 15px;
}

.stat {
  color: #999;
  font-size: 0.8rem;
}

.creator-bio {
  margin-bottom: 15px;
}

.creator-bio p {
  margin: 0;
  color: #666;
  line-height: 1.5;
  font-size: 0.9rem;
}

.creator-artworks {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.artwork-preview {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.artwork-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.creator-actions {
  display: flex;
  gap: 10px;
}

.creator-actions .el-button {
  flex: 1;
}

.creator-actions .el-button.followed {
  background: #f0f0f0;
  border-color: #d0d0d0;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .creators-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-controls .el-select,
  .filter-controls .el-input {
    width: 100%;
  }
  
  .creator-header {
    flex-direction: column;
    text-align: center;
  }
  
  .creator-stats {
    justify-content: center;
  }
}
</style>