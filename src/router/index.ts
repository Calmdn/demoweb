import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false,
        title: '首页'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: false,
        title: '关于我们'
      }
    },
    
    // 作品相关路由
    {
      path: '/artworks',
      name: 'artworks',
      component: () => import('../views/ArtworksView.vue'),
      meta: {
        requiresAuth: false,
        title: '作品列表'
      }
    },
    {
      path: '/artworks/:id',
      name: 'artwork-detail',
      component: () => import('../views/ArtworkDetailView.vue'),
      meta: {
        requiresAuth: false,
        title: '作品详情'
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue'),
      meta: {
        requiresAuth: true,
        title: '发布作品'
      }
    },
    
    // 用户相关路由
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta: {
        requiresAuth: false,
        title: '登录',
        hideForAuth: true // 已登录用户隐藏
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
      meta: {
        requiresAuth: false,
        title: '注册',
        hideForAuth: true // 已登录用户隐藏
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
        title: '个人资料'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true,
        title: '个人中心'
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue'),
      meta: {
        requiresAuth: true,
        title: '我的订单'
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: {
        requiresAuth: true,
        title: '我的收藏'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: {
        requiresAuth: true,
        title: '设置'
      }
    },
    
    // 其他页面路由
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue'),
      meta: {
        requiresAuth: false,
        title: '分类'
      }
    },
    {
      path: '/creators',
      name: 'creators',
      component: () => import('../views/CreatorsView.vue'),
      meta: {
        requiresAuth: false,
        title: '创作者'
      }
    },
  ],
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // 初始化用户信息（如果有token但没有用户信息）
  if (userStore.token && !userStore.userInfo) {
    try {
      await userStore.initUser()
    } catch (error) {
      // 如果初始化失败，清除token
      userStore.logout()
    }
  }
  
  // 检查是否需要登录
  if (to.meta.requiresAuth && !userStore.token) {
    // 需要登录但未登录，重定向到登录页
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // 已登录用户访问登录/注册页面，重定向到首页
  if (to.meta.hideForAuth && userStore.token) {
    next({ name: 'home' })
    return
  }
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 星澜校园创意工坊`
  }
  
  next()
})

export default router
