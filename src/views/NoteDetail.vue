<template>
  <div class="note-detail">
    <div class="container">
      <div class="detail-content" v-if="note">
        <div class="image-gallery">
          <div class="main-image">
            <img :src="note.images[0]" :alt="note.title" />
          </div>
          <div class="thumbnails" v-if="note.images.length > 1">
            <div 
              v-for="(img, index) in note.images" 
              :key="index"
              class="thumbnail"
              :class="{ active: currentImage === index }"
              @click="currentImage = index"
            >
              <img :src="img" />
            </div>
          </div>
        </div>
        
        <div class="note-info">
          <h1 class="note-title">{{ note.title }}</h1>
          
          <div class="author-info">
            <img :src="note.user.avatar" class="avatar" />
            <div class="author-detail">
              <span class="nickname">{{ note.user.nickname }}</span>
              <span class="publish-time">{{ note.createTime }}</span>
            </div>
            <button class="follow-btn btn btn-primary">+ 关注</button>
          </div>
          
          <div class="note-content">
            <p>{{ note.content }}</p>
          </div>
          
          <div class="tags">
            <el-tag 
              v-for="tag in note.tags" 
              :key="tag"
              size="large"
              class="tag-item"
            >
              #{{ tag }}
            </el-tag>
          </div>
          
          <div class="action-bar">
            <button 
              class="action-btn like-btn"
              :class="{ active: noteStore.isLiked(note.id) }"
              @click="handleLike"
            >
              <Cherry />
              <span>{{ note.likes }}</span>
            </button>
            <button 
              class="action-btn collect-btn"
              :class="{ active: noteStore.isCollected(note.id) }"
              @click="handleCollect"
            >
              <Star />
              <span>{{ note.collects }}</span>
            </button>
            <button class="action-btn share-btn">
              <Share />
              <span>分享</span>
            </button>
          </div>
          
          <div class="comment-section">
            <h3 class="section-title">评论 ({{ note.comments }})</h3>
            
            <div class="comment-input">
              <el-input
                v-model="commentText"
                type="textarea"
                :rows="3"
                placeholder="说点什么..."
                maxlength="200"
                show-word-limit
              />
              <div class="comment-actions">
                <button class="btn btn-primary submit-btn" @click="submitComment">
                  发表评论
                </button>
              </div>
            </div>
            
            <div class="comment-list">
              <div class="comment-item" v-for="c in comments" :key="c.id">
                <img :src="c.avatar" class="comment-avatar" />
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-user">{{ c.user }}</span>
                    <span class="comment-time">{{ c.time }}</span>
                  </div>
                  <p class="comment-text">{{ c.text }}</p>
                  <div class="comment-footer">
                    <button class="comment-like">
                      <Cherry /> {{ c.likes }}
                    </button>
                    <button class="comment-reply">回复</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'
import { Cherry, Star, Share } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const noteStore = useNoteStore()

const note = ref(null)
const currentImage = ref(0)
const commentText = ref('')
const comments = ref([
  {
    id: 1,
    user: '小明同学',
    avatar: 'https://picsum.photos/40/40?random=c1',
    text: '太赞了！收藏了，周末就去打卡！',
    time: '2小时前',
    likes: 23
  },
  {
    id: 2,
    user: '爱吃的小姐姐',
    avatar: 'https://picsum.photos/40/40?random=c2',
    text: '请问具体地址在哪里呀？看起来好好吃～',
    time: '5小时前',
    likes: 8
  }
])

const handleLike = () => {
  noteStore.toggleLike(note.value.id)
  ElMessage.success(noteStore.isLiked(note.value.id) ? '已点赞' : '已取消点赞')
}

const handleCollect = () => {
  noteStore.toggleCollect(note.value.id)
  ElMessage.success(noteStore.isCollected(note.value.id) ? '已收藏' : '已取消收藏')
}

const submitComment = () => {
  if (!commentText.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }
  comments.value.unshift({
    id: Date.now(),
    user: '我',
    avatar: 'https://picsum.photos/40/40?random=me',
    text: commentText.value,
    time: '刚刚',
    likes: 0
  })
  commentText.value = ''
  ElMessage.success('评论成功')
}

onMounted(() => {
  note.value = noteStore.getNoteById(route.params.id)
})
</script>

<style scoped>
.note-detail {
  padding: 40px 0;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.image-gallery {
  position: sticky;
  top: 100px;
  align-self: start;
}

.main-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--bg-color);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  transition: var(--transition);
  border: 2px solid transparent;
}

.thumbnail.active {
  opacity: 1;
  border-color: var(--primary-color);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.note-info {
  padding: 30px 30px 30px 0;
}

.note-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 20px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.author-info .avatar {
  width: 48px;
  height: 48px;
}

.author-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nickname {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.publish-time {
  font-size: 12px;
  color: var(--text-light);
}

.follow-btn {
  padding: 6px 16px;
  font-size: 13px;
}

.note-content {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;
}

:deep(.tag-item) {
  border-radius: var(--radius-md);
  background: #FFF5F7;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  transition: var(--transition);
}

:deep(.tag-item:hover) {
  background: var(--primary-color);
  color: white;
}

.action-bar {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 30px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-xl);
  background: var(--bg-color);
  color: var(--text-secondary);
  font-size: 14px;
  transition: var(--transition);
}

.action-btn:hover {
  background: #FFE8EB;
  color: var(--primary-color);
}

.action-btn.active {
  background: #FFE8EB;
  color: var(--primary-color);
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.comment-section {
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.comment-input {
  margin-bottom: 30px;
}

:deep(.comment-input .el-textarea__inner) {
  border-radius: var(--radius-md);
  border-color: var(--border-color);
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.submit-btn {
  padding: 8px 24px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 12px;
}

.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.comment-user {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.comment-time {
  font-size: 12px;
  color: var(--text-light);
}

.comment-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 8px;
}

.comment-footer {
  display: flex;
  gap: 20px;
}

.comment-like,
.comment-reply {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-light);
  transition: var(--transition);
}

.comment-like:hover,
.comment-reply:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .note-detail {
    padding: 20px 0;
  }
  
  .detail-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .note-info {
    padding: 0 20px 20px;
  }
  
  .note-title {
    font-size: 20px;
  }
  
  .image-gallery {
    position: static;
  }
}
</style>
