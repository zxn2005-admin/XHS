<template>
  <div class="publish-page">
    <div class="container">
      <div class="publish-card card">
        <h2 class="page-title">发布笔记</h2>
        
        <div class="form-section">
          <label class="form-label">上传图片</label>
          <div class="upload-area">
            <div class="image-list">
              <div 
                v-for="(img, index) in images" 
                :key="index"
                class="image-item"
              >
                <img :src="img" />
                <button class="remove-btn" @click="removeImage(index)">
                  <Close />
                </button>
              </div>
              <div v-if="images.length < 9" class="upload-btn" @click="triggerUpload">
                <Plus />
                <span>添加图片</span>
                <input 
                  ref="fileInput" 
                  type="file" 
                  accept="image/*" 
                  multiple
                  @change="handleUpload"
                  hidden
                />
              </div>
            </div>
            <p class="upload-tip">支持 JPG、PNG 格式，最多上传 9 张</p>
          </div>
        </div>
        
        <div class="form-section">
          <label class="form-label">标题</label>
          <el-input
            v-model="form.title"
            placeholder="给你的笔记起个吸引人的标题"
            maxlength="50"
            show-word-limit
            class="title-input"
          />
        </div>
        
        <div class="form-section">
          <label class="form-label">正文</label>
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="6"
            placeholder="分享你的经验、心得、攻略..."
            maxlength="1000"
            show-word-limit
            class="content-input"
          />
        </div>
        
        <div class="form-section">
          <label class="form-label">添加标签</label>
          <div class="tags-area">
            <el-tag 
              v-for="(tag, index) in form.tags" 
              :key="index"
              closable
              @close="removeTag(index)"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-model="tagInput"
              placeholder="输入标签后按回车添加"
              class="tag-input"
              @keyup.enter="addTag"
              maxlength="20"
            />
          </div>
          <p class="tags-tip">建议添加 2-5 个标签，帮助更多人发现你的笔记</p>
        </div>
        
        <div class="form-actions">
          <button class="btn btn-outline cancel-btn" @click="$router.back()">
            取消
          </button>
          <button class="btn btn-primary submit-btn" @click="handleSubmit" :loading="submitting">
            发布笔记
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'
import { useUserStore } from '@/stores/userStore'
import { Plus, Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const noteStore = useNoteStore()
const userStore = useUserStore()

const fileInput = ref(null)
const submitting = ref(false)
const images = ref([])
const tagInput = ref('')

const form = ref({
  title: '',
  content: '',
  tags: []
})

const triggerUpload = () => {
  fileInput.value.click()
}

const handleUpload = (e) => {
  const files = e.target.files
  if (files.length + images.value.length > 9) {
    ElMessage.warning('最多上传 9 张图片')
    return
  }
  
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (event) => {
      images.value.push(event.target.result)
    }
    reader.readAsDataURL(file)
  })
  
  fileInput.value.value = ''
}

const removeImage = (index) => {
  images.value.splice(index, 1)
}

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !form.value.tags.includes(tag)) {
    if (form.value.tags.length >= 5) {
      ElMessage.warning('最多添加 5 个标签')
      return
    }
    form.value.tags.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  form.value.tags.splice(index, 1)
}

const handleSubmit = () => {
  if (!form.value.title.trim()) {
    ElMessage.warning('请输入标题')
    return
  }
  if (!form.value.content.trim()) {
    ElMessage.warning('请输入正文内容')
    return
  }
  if (images.value.length === 0) {
    ElMessage.warning('请至少上传一张图片')
    return
  }
  
  submitting.value = true
  
  setTimeout(() => {
    const note = {
      title: form.value.title,
      content: form.value.content,
      cover: images.value[0],
      images: images.value,
      tags: form.value.tags,
      user: {
        id: userStore.userInfo.id || Date.now(),
        nickname: userStore.userInfo.nickname || '用户',
        avatar: userStore.userInfo.avatar || 'https://picsum.photos/100/100?random=user'
      }
    }
    
    noteStore.addNote(note)
    
    ElMessage.success('发布成功！')
    submitting.value = false
    router.push('/home')
  }, 1000)
}
</script>

<style scoped>
.publish-page {
  padding: 40px 0;
}

.publish-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 30px;
  text-align: center;
}

.form-section {
  margin-bottom: 28px;
}

.form-label {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.upload-area {
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.image-item {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.remove-btn:hover {
  background: var(--primary-color);
}

.remove-btn svg {
  width: 14px;
  height: 14px;
}

.upload-btn {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-md);
  border: 2px dashed var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-light);
}

.upload-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background: #FFF5F7;
}

.upload-btn svg {
  width: 28px;
  height: 28px;
}

.upload-btn span {
  font-size: 13px;
}

.upload-tip {
  font-size: 12px;
  color: var(--text-light);
}

:deep(.title-input .el-input__wrapper),
:deep(.content-input .el-textarea__inner) {
  border-radius: var(--radius-md);
  border-color: var(--border-color);
  box-shadow: none;
}

:deep(.title-input .el-input__wrapper:hover),
:deep(.content-input .el-textarea__inner:hover),
:deep(.title-input .el-input__wrapper.is-focus),
:deep(.content-input .el-textarea__inner:focus) {
  border-color: var(--primary-color);
}

.tags-area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

:deep(.tag-item) {
  border-radius: var(--radius-md);
  background: #FFF5F7;
  border: none;
  color: var(--primary-color);
}

.tag-input {
  width: 150px;
}

:deep(.tag-input .el-input__wrapper) {
  border-radius: var(--radius-md);
  border-color: var(--border-color);
  box-shadow: none;
}

.tags-tip {
  font-size: 12px;
  color: var(--text-light);
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.cancel-btn,
.submit-btn {
  min-width: 120px;
  padding: 12px 24px;
}

@media (max-width: 768px) {
  .publish-page {
    padding: 20px 0;
  }
  
  .publish-card {
    padding: 24px 20px;
  }
  
  .page-title {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  .image-item,
  .upload-btn {
    width: 80px;
    height: 80px;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .cancel-btn,
  .submit-btn {
    width: 100%;
  }
}
</style>
