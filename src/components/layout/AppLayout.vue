<template>
    <div class="app-layout">
      <!-- 顶部导航 -->
      <header class="app-header">
        <div class="container">
          <div class="header-content">
            <!-- Logo -->
            <div class="logo" @click="$router.push('/')">
              <el-icon size="24" color="#409eff"><Brush /></el-icon>
              <span>星澜工坊</span>
            </div>
  
            <!-- 导航菜单 -->
            <nav class="nav-menu">
              <el-menu
                mode="horizontal"
                :default-active="activeMenu"
                class="header-menu"
                @select="handleMenuSelect"
              >
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/artworks">作品</el-menu-item>
                <el-menu-item index="/categories">分类</el-menu-item>
                <el-menu-item index="/creators">创作者</el-menu-item>
              </el-menu>
            </nav>
  
            <!-- 搜索框 -->
            <div class="search-box">
              <el-input
                v-model="searchKeyword"
                placeholder="搜索作品..."
                class="search-input"
                @keyup.enter="handleSearch"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </div>
  
            <!-- 用户操作区 -->
            <div class="user-actions">
              <template v-if="userStore.token">
                <!-- 发布作品按钮 -->
                <el-button
                  type="primary"
                  @click="$router.push('/publish')"
                  class="publish-btn"
                >
                  <el-icon><Plus /></el-icon>
                  发布作品
                </el-button>
  
                <!-- 消息通知 -->
                <el-badge :value="12" class="notification-badge">
                  <el-button circle>
                    <el-icon><Bell /></el-icon>
                  </el-button>
                </el-badge>
  
                <!-- 用户头像菜单 -->
                <el-dropdown @command="handleUserCommand">
                  <div class="user-avatar">
                    <el-avatar
                      :size="36"
                      :src="userStore.userInfo?.avatar"
                      :icon="UserFilled"
                    />
                    <span class="username">{{ userStore.userInfo?.username }}</span>
                    <el-icon><ArrowDown /></el-icon>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="profile">
                        <el-icon><User /></el-icon>个人资料
                      </el-dropdown-item>
                      <el-dropdown-item command="dashboard">
                        <el-icon><DataAnalysis /></el-icon>个人中心
                      </el-dropdown-item>
                      <el-dropdown-item command="orders">
                        <el-icon><ShoppingBag /></el-icon>我的订单
                      </el-dropdown-item>
                      <el-dropdown-item command="favorites">
                        <el-icon><Star /></el-icon>我的收藏
                      </el-dropdown-item>
                      <el-dropdown-item divided command="settings">
                        <el-icon><Setting /></el-icon>设置
                      </el-dropdown-item>
                      <el-dropdown-item command="logout">
                        <el-icon><SwitchButton /></el-icon>退出登录
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
  
              <template v-else>
                <!-- 未登录状态 -->
                <el-button @click="$router.push('/login')">登录</el-button>
                <el-button type="primary" @click="$router.push('/register')">
                  注册
                </el-button>
              </template>
            </div>
          </div>
        </div>
      </header>
  
      <!-- 主要内容区域 -->
      <main class="app-main">
        <router-view />
      </main>
  
      <!-- 底部 -->
      <footer class="app-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h4>关于我们</h4>
              <p>星澜校园创意工坊，发现创意，分享艺术</p>
            </div>
            <div class="footer-section">
              <h4>帮助中心</h4>
              <ul>
                <li><a href="#">使用指南</a></li>
                <li><a href="#">常见问题</a></li>
                <li><a href="#">联系我们</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>法律信息</h4>
              <ul>
                <li><a href="#">用户协议</a></li>
                <li><a href="#">隐私政策</a></li>
                <li><a href="#">版权声明</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 星澜校园创意工坊. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import {
    Brush, Search, Plus, Bell, User, UserFilled, ArrowDown,
    DataAnalysis, ShoppingBag, Star, Setting, SwitchButton
  } from '@element-plus/icons-vue'
  import { useUserStore } from '@/stores/user'
  
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  
  const searchKeyword = ref('')
  
  // 计算当前激活的菜单
  const activeMenu = computed(() => {
    const path = route.path
    if (path.startsWith('/artworks')) return '/artworks'
    if (path.startsWith('/categories')) return '/categories'
    if (path.startsWith('/creators')) return '/creators'
    return '/'
  })
  
  // 菜单选择处理
  const handleMenuSelect = (index: string) => {
    router.push(index)
  }
  
  // 搜索处理
  const handleSearch = () => {
    if (searchKeyword.value.trim()) {
      router.push(`/artworks?keyword=${encodeURIComponent(searchKeyword.value)}`)
    }
  }
  
  // 用户菜单命令处理
  const handleUserCommand = async (command: string) => {
    switch (command) {
      case 'profile':
        router.push('/profile')
        break
      case 'dashboard':
        router.push('/dashboard')
        break
      case 'orders':
        router.push('/orders')
        break
      case 'favorites':
        router.push('/favorites')
        break
      case 'settings':
        router.push('/settings')
        break
      case 'logout':
        try {
          await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          userStore.logout()
          ElMessage.success('已退出登录')
          router.push('/')
        } catch {
          // 用户取消
        }
        break
    }
  }
  
  // 监听路由变化，关闭移动端菜单等
  watch(() => route.path, () => {
    // 可以在这里处理路由变化后的逻辑
  })
  </script>
  
  <style scoped>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  /* 头部样式 */
  .app-header {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .header-content {
    display: flex;
    align-items: center;
    height: 64px;
    gap: 20px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    color: #409eff;
  }
  
  .nav-menu {
    flex: 1;
  }
  
  .header-menu {
    border-bottom: none;
  }
  
  .header-menu .el-menu-item {
    border-bottom: none;
  }
  
  .search-box {
    width: 300px;
  }
  
  .search-input {
    border-radius: 20px;
  }
  
  .user-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .publish-btn {
    border-radius: 20px;
  }
  
  .notification-badge {
    cursor: pointer;
  }
  
  .user-avatar {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 20px;
    transition: background-color 0.3s;
  }
  
  .user-avatar:hover {
    background-color: #f5f7fa;
  }
  
  .username {
    font-size: 14px;
    color: #606266;
  }
  
  /* 主要内容区域 */
  .app-main {
    flex: 1;
    background: #f5f7fa;
  }
  
  /* 底部样式 */
  .app-footer {
    background: #303133;
    color: white;
    padding: 40px 0 20px;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
  }
  
  .footer-section h4 {
    margin-bottom: 15px;
    color: #409eff;
  }
  
  .footer-section ul {
    list-style: none;
  }
  
  .footer-section ul li {
    margin-bottom: 8px;
  }
  
  .footer-section ul li a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-section ul li a:hover {
    color: #409eff;
  }
  
  .footer-bottom {
    border-top: 1px solid #444;
    padding-top: 20px;
    text-align: center;
    color: #999;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .header-content {
      flex-wrap: wrap;
      height: auto;
      padding: 10px 0;
    }
  
    .nav-menu {
      order: 3;
      width: 100%;
    }
  
    .search-box {
      width: 200px;
    }
  
    .user-avatar .username {
      display: none;
    }
  }
  </style>