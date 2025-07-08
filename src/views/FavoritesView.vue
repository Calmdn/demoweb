<template>
  <div class="favorites-page">
    <div class="container">
      <div class="page-header">
        <h1>我的收藏</h1>
        <p>您收藏的精彩作品</p>
      </div>
      
      <div class="favorites-content">
        <div class="favorites-toolbar">
          <div class="toolbar-left">
            <span class="total-count">共 {{ totalCount }} 件作品</span>
          </div>
          <div class="toolbar-right">
            <el-button @click="selectAll">
              {{ isAllSelected ? '取消全选' : '全选' }}
            </el-button>
            <el-button type="danger" :disabled="selectedItems.length === 0" @click="removeSelected">
              删除选中
            </el-button>
          </div>
        </div>
        
        <div class="favorites-grid">
          <div 
            class="favorite-card" 
            v-for="item in favoriteItems" 
            :key="item.id"
            :class="{ selected: selectedItems.includes(item.id) }"
            @click="toggleSelect(item.id)"
          >
            <div class="card-overlay">
              <el-checkbox 
                :model-value="selectedItems.includes(item.id)" 
                @change="toggleSelect(item.id)"
                @click.stop
              />
            </div>
            
            <div class="favorite-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            
            <div class="favorite-info">
              <h3>{{ item.title }}</h3>
              <p class="author">作者: {{ item.author }}</p>
              <p class="collect-time">收藏于: {{ item.collectTime }}</p>
              
              <div class="favorite-actions">
                <el-button size="small" @click.stop="viewArtwork(item.id)">
                  查看作品
                </el-button>
                <el-button size="small" type="danger" @click.stop="removeFavorite(item.id)">
                  取消收藏
                </el-button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="empty-state" v-if="favoriteItems.length === 0">
          <el-empty description="还没有收藏任何作品">
            <el-button type="primary" @click="$router.push('/artworks')">
              去发现作品
            </el-button>
          </el-empty>
        </div>
        
        <div class="pagination" v-if="favoriteItems.length > 0">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

defineOptions({
  name: 'FavoritesView'
})

const router = useRouter()

const currentPage = ref(1)
const pageSize = ref(12)
const totalCount = ref(8)
const selectedItems = ref<number[]>([])

const favoriteItems = ref([
  {
    id: 1,
    title: '梦幻森林',
    author: '张艺术',
    image: '/api/placeholder/300/200',
    collectTime: '2024-01-01'
  },
  {
    id: 2,
    title: '城市夜景',
    author: '李创作',
    image: '/api/placeholder/300/200',
    collectTime: '2024-01-02'
  },
  {
    id: 3,
    title: '抽象艺术',
    author: '王设计',
    image: '/api/placeholder/300/200',
    collectTime: '2024-01-03'
  },
  {
    id: 4,
    title: '自然风光',
    author: '赵摄影',
    image: '/api/placeholder/300/200',
    collectTime: '2024-01-04'
  },
  {
    id: 5,
    title: '人物肖像',
    author: '孙画家',
    image: '/api/placeholder/300/200',
    collectTime: '2024-01-05'
  },
  {
    id: 6,
    title: '建筑美学',
    author: '周建筑',
    image: '/api/placeholder/300/200',
    collectTime: '2024-01-06'
  },
  {
    id: 7,
    title: '数字艺术',
    author: '吴数字',
    image: '/api/placeholder/300/200',
    collectTime: '2024-01-07'
  },
  {
    id: 8,
    title: '传统工艺',
    author: '郑传统',
    image: '/api/placeholder/300/200',
    collectTime: '2024-01-08'
  }
])

const isAllSelected = computed(() => {
  return favoriteItems.value.length > 0 && selectedItems.value.length === favoriteItems.value.length
})

const toggleSelect = (id: number) => {
  const index = selectedItems.value.indexOf(id)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(id)
  }
}

const selectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = favoriteItems.value.map(item => item.id)
  }
}

const removeSelected = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedItems.value.length} 件作品吗？`,
      '批量删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    // 模拟删除操作
    favoriteItems.value = favoriteItems.value.filter(item => !selectedItems.value.includes(item.id))
    totalCount.value = favoriteItems.value.length
    selectedItems.value = []
    ElMessage.success('删除成功')
  } catch {
    // 用户取消
  }
}

const removeFavorite = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要取消收藏这件作品吗？', '取消收藏', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    // 模拟删除操作
    favoriteItems.value = favoriteItems.value.filter(item => item.id !== id)
    totalCount.value = favoriteItems.value.length
    selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
    ElMessage.success('已取消收藏')
  } catch {
    // 用户取消
  }
}

const viewArtwork = (id: number) => {
  router.push(`/artworks/${id}`)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  // 这里可以加载新页面的数据
}

onMounted(() => {
  // 加载收藏数据
})
</script>

<style scoped>
.favorites-page {
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

.favorites-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.favorites-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.toolbar-left {
  color: #666;
  font-size: 0.9rem;
}

.toolbar-right {
  display: flex;
  gap: 10px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.favorite-card {
  position: relative;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.favorite-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.favorite-card.selected {
  border: 2px solid #409eff;
}

.card-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 5px;
}

.favorite-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.favorite-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.favorite-card:hover .favorite-image img {
  transform: scale(1.05);
}

.favorite-info {
  padding: 15px;
}

.favorite-info h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.1rem;
}

.favorite-info p {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 0.9rem;
}

.favorite-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .favorites-toolbar {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .toolbar-right {
    justify-content: center;
  }
  
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>