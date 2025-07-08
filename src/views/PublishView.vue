<template>
  <div class="publish-page">
    <div class="container">
      <div class="page-header">
        <h1>发布作品</h1>
        <p>分享你的创意作品</p>
      </div>
      
      <div class="publish-form">
        <el-form :model="publishForm" :rules="publishRules" ref="publishFormRef" label-width="100px">
          <el-form-item label="作品标题" prop="title">
            <el-input v-model="publishForm.title" placeholder="请输入作品标题" />
          </el-form-item>
          
          <el-form-item label="作品描述" prop="description">
            <el-input 
              v-model="publishForm.description" 
              type="textarea" 
              :rows="4"
              placeholder="请描述你的作品..."
            />
          </el-form-item>
          
          <el-form-item label="作品分类" prop="category">
            <el-select v-model="publishForm.category" placeholder="请选择分类">
              <el-option label="数字艺术" value="digital-art" />
              <el-option label="传统绘画" value="traditional-art" />
              <el-option label="摄影" value="photography" />
              <el-option label="设计" value="design" />
              <el-option label="其他" value="others" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="作品标签" prop="tags">
            <el-tag
              v-for="tag in publishForm.tags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="tagInputVisible"
              ref="tagInputRef"
              v-model="tagInputValue"
              class="tag-input"
              size="small"
              @keyup.enter="handleTagConfirm"
              @blur="handleTagConfirm"
            />
            <el-button v-else class="tag-button" size="small" @click="showTagInput">
              + 添加标签
            </el-button>
          </el-form-item>
          
          <el-form-item label="作品图片" prop="images">
            <el-upload
              v-model:file-list="publishForm.images"
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeUpload"
              multiple
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="handlePublish" :loading="loading">
              发布作品
            </el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

defineOptions({
  name: 'PublishView'
})

const router = useRouter()
const publishFormRef = ref<FormInstance>()
const loading = ref(false)
const tagInputVisible = ref(false)
const tagInputValue = ref('')
const tagInputRef = ref()

const publishForm = reactive({
  title: '',
  description: '',
  category: '',
  tags: [] as string[],
  images: [] as any[]
})

const publishRules: FormRules = {
  title: [
    { required: true, message: '请输入作品标题', trigger: 'blur' },
    { min: 2, max: 50, message: '标题长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入作品描述', trigger: 'blur' },
    { min: 10, max: 500, message: '描述长度在 10 到 500 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择作品分类', trigger: 'change' }
  ]
}

const handleTagClose = (tag: string) => {
  publishForm.tags.splice(publishForm.tags.indexOf(tag), 1)
}

const showTagInput = () => {
  tagInputVisible.value = true
  nextTick(() => {
    tagInputRef.value?.focus()
  })
}

const handleTagConfirm = () => {
  if (tagInputValue.value && !publishForm.tags.includes(tagInputValue.value)) {
    publishForm.tags.push(tagInputValue.value)
  }
  tagInputVisible.value = false
  tagInputValue.value = ''
}

const handlePictureCardPreview = (file: any) => {
  console.log('Preview:', file)
}

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  return true
}

const handlePublish = async () => {
  if (!publishFormRef.value) return
  
  await publishFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 这里应该调用API发布作品
        await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟API调用
        ElMessage.success('作品发布成功!')
        router.push('/artworks')
      } catch (error) {
        ElMessage.error('发布失败，请重试')
      } finally {
        loading.value = false
      }
    }
  })
}

const handleCancel = () => {
  router.back()
}
</script>

<style scoped>
.publish-page {
  padding: 20px 0;
}

.container {
  max-width: 800px;
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

.publish-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tag-input {
  width: 78px;
  margin-left: 8px;
  vertical-align: bottom;
}

.tag-button {
  margin-left: 8px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

:deep(.el-tag) {
  margin-right: 8px;
  margin-bottom: 8px;
}

:deep(.el-upload--picture-card) {
  width: 100px;
  height: 100px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 100px;
  height: 100px;
}
</style>