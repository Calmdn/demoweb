// 基础API响应类型
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 分页参数
export interface PageParams {
  page: number
  pageSize: number
}

// 分页响应
export interface PageResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 用户相关类型
export interface User {
  id: number
  username: string
  email?: string
  phone?: string
  avatar?: string
  role: number
  status: number
  createTime: string
  updateTime: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  username: string
  token: string
  role: number
}

export interface RegisterRequest {
  username: string
  password: string
  email?: string
  phone?: string
}

// 作品相关类型
export interface Artwork {
  id: number
  title: string
  description: string
  imageUrl: string
  thumbnailUrl: string
  categoryId: number
  categoryName?: string
  userId: number
  authorName?: string
  authorAvatar?: string
  price: number
  originalPrice?: number
  tags: string
  tagList?: string[]
  viewCount: number
  likeCount: number
  favoriteCount: number
  commentCount: number
  status: number
  isFeatured: boolean
  isForSale: boolean
  uploadTime: string
  updateTime: string
}

export interface ArtworkCategory {
  id: number
  name: string
  description: string
  icon?: string
  sort: number
  status: number
}

// 订单相关类型
export interface Order {
  id: number
  orderNo: string
  userId: number
  buyerName?: string
  totalAmount: number
  originalAmount: number
  discountAmount: number
  status: number
  statusName?: string
  paymentMethod: string
  paymentTime?: string
  remark?: string
  createTime: string
  updateTime: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: number
  artworkId: number
  artworkTitle?: string
  artworkImage?: string
  price: number
  quantity: number
  totalAmount: number
}

export interface CreateOrderRequest {
  artworkIds: number[]
  paymentMethod: string
  remark?: string
}