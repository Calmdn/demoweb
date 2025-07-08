<template>
  <div class="orders-page">
    <div class="container">
      <div class="page-header">
        <h1>我的订单</h1>
        <p>查看您的所有订单记录</p>
      </div>
      
      <div class="orders-content">
        <div class="orders-filter">
          <el-tabs v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane label="全部订单" name="all" />
            <el-tab-pane label="待支付" name="pending" />
            <el-tab-pane label="已完成" name="completed" />
            <el-tab-pane label="已取消" name="cancelled" />
          </el-tabs>
        </div>
        
        <div class="orders-list">
          <div class="order-card" v-for="i in 5" :key="i">
            <div class="order-header">
              <div class="order-info">
                <span class="order-number">订单号: ORDER2024010{{ i }}</span>
                <span class="order-date">2024-01-0{{ i }}</span>
              </div>
              <div class="order-status">
                <el-tag :type="getStatusType(i)" size="large">
                  {{ getStatusText(i) }}
                </el-tag>
              </div>
            </div>
            
            <div class="order-content">
              <div class="order-items">
                <div class="order-item">
                  <div class="item-image">
                    <img src="https://picsum.photos/80/80" alt="商品图片" />
                  </div>
                  <div class="item-info">
                    <h4>作品授权使用权 {{ i }}</h4>
                    <p>数字版权 | 个人使用</p>
                    <div class="item-price">
                      <span class="price">¥{{ (i * 10).toFixed(2) }}</span>
                      <span class="quantity">x1</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="order-total">
                <div class="total-info">
                  <span class="total-label">总计:</span>
                  <span class="total-amount">¥{{ (i * 10).toFixed(2) }}</span>
                </div>
              </div>
            </div>
            
            <div class="order-actions">
              <el-button v-if="i <= 2" type="primary" size="small">
                {{ i === 1 ? '立即支付' : '查看详情' }}
              </el-button>
              <el-button v-if="i <= 2" size="small">
                {{ i === 1 ? '取消订单' : '再次购买' }}
              </el-button>
            </div>
          </div>
          
          <div class="empty-state" v-if="false">
            <el-empty description="暂无订单记录" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'OrdersView'
})

const activeTab = ref('all')

const handleTabClick = (tab: any) => {
  console.log('切换到:', tab.name)
}

const getStatusType = (index: number) => {
  const types = ['warning', 'success', 'info', 'danger']
  return types[index % types.length]
}

const getStatusText = (index: number) => {
  const texts = ['待支付', '已完成', '已发货', '已取消']
  return texts[index % texts.length]
}
</script>

<style scoped>
.orders-page {
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

.orders-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.orders-filter {
  padding: 20px 20px 0;
}

.orders-list {
  padding: 20px;
}

.order-card {
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.order-info {
  display: flex;
  gap: 20px;
}

.order-number {
  font-weight: 600;
  color: #333;
}

.order-date {
  color: #666;
  font-size: 0.9rem;
}

.order-content {
  padding: 20px;
}

.order-items {
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-info h4 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1rem;
}

.item-info p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.9rem;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e6a23c;
}

.quantity {
  color: #666;
  font-size: 0.9rem;
}

.order-total {
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.total-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.total-label {
  color: #666;
  font-size: 1rem;
}

.total-amount {
  font-size: 1.2rem;
  font-weight: 600;
  color: #e6a23c;
}

.order-actions {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.empty-state {
  text-align: center;
  padding: 40px;
}

@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .order-info {
    flex-direction: column;
    gap: 5px;
  }
  
  .order-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
  }
  
  .order-total {
    justify-content: flex-start;
  }
}
</style>