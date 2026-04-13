<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-card card">
        <div class="profile-header">
          <div class="user-info">
            <img :src="userStore.userInfo.avatar || 'https://picsum.photos/120/120?random=profile'" class="user-avatar" />
            <div class="user-detail">
              <h2 class="nickname">{{ userStore.userInfo.nickname || '小红书用户' }}</h2>
              <p class="bio">{{ userStore.userInfo.bio || '这个人很懒，什么都没写~' }}</p>
              <button class="edit-btn">编辑资料</button>
            </div>
          </div>
          
          <div class="stats">
            <div class="stat-item">
              <span class="stat-number">{{ userStore.userInfo.following || 12 }}</span>
              <span class="stat-label">关注</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ userStore.userInfo.followers || 86 }}</span>
              <span class="stat-label">粉丝</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ userStore.userInfo.likes || 520 }}</span>
              <span class="stat-label">获赞</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="content-tabs card">
        <div class="tabs-header">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab-btn"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <span>{{ tab.name }}</span>
          </button>
        </div>
        
        <div class="tabs-content">
          <div v-if="activeTab === 'notes' && currentNotes.length > 0" class="notes-grid">
            <NoteCard v-for="note in currentNotes" :key="note.id" :note="note" />
          </div>
          <div v-else-if="activeTab === 'notes'" class="empty-state">
            <DocumentCopy />
            <p>还没有发布笔记</p>
            <button class="btn btn-primary" @click="$router.push('/publish')">发布第一篇笔记</button>
          </div>
          
          <div v-if="activeTab === 'collects' && noteStore.myCollections.length > 0" class="notes-grid">
            <NoteCard v-for="note in noteStore.myCollections" :key="note.id" :note="note" />
          </div>
          <div v-else-if="activeTab === 'collects'" class="empty-state">
            <Star />
            <p>还没有收藏任何笔记</p>
          </div>
          
          <div v-if="activeTab === 'likes' && noteStore.myLikes.length > 0" class="notes-grid">
            <NoteCard v-for="note in noteStore.myLikes" :key="note.id" :note="note" />
          </div>
          <div v-else-if="activeTab === 'likes'" class="empty-state">
            <Cherry />
            <p>还没有点赞任何笔记</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useNoteStore } from '@/stores/noteStore'
import NoteCard from '@/components/NoteCard.vue'
import { DocumentCopy, Star, Cherry } from '@element-plus/icons-vue'

const userStore = useUserStore()
const noteStore = useNoteStore()
const activeTab = ref('notes')

const tabs = [
  { id: 'notes', name: '我的笔记' },
  { id: 'collects', name: '我的收藏' },
  { id: 'likes', name: '我的点赞' }
]

const currentNotes = computed(() => {
  return noteStore.myNotes.length > 0 ? noteStore.myNotes : noteStore.notes.slice(0, 3)
})
</script>

<style scoped>
.profile-page {
  padding: 40px 0;
}

.profile-card {
  padding: 40px;
  margin-bottom: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: var(--shadow-md);
}

.user-detail {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nickname {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.bio {
  font-size: 14px;
  color: var(--text-secondary);
}

.edit-btn {
  align-self: flex-start;
  padding: 6px 20px;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color);
  background: white;
  color: var(--text-secondary);
  font-size: 13px;
  transition: var(--transition);
}

.edit-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.content-tabs {
  overflow: hidden;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: var(--transition);
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  color: var(--primary-color);
  background: #FFF5F7;
}

.tab-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.tab-btn svg {
  width: 20px;
  height: 20px;
}

.tabs-content {
  padding: 30px;
  min-height: 400px;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-light);
}

.empty-state svg {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin-bottom: 20px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .profile-page {
    padding: 20px 0;
  }
  
  .profile-card {
    padding: 24px 20px;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  
  .stats {
    width: 100%;
    justify-content: space-around;
    gap: 0;
  }
  
  .stat-number {
    font-size: 24px;
  }
  
  .notes-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .tabs-content {
    padding: 20px 12px;
  }
  
  .tab-btn span {
    display: none;
  }
}
</style>
