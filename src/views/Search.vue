<template>
  <div class="search-page">
    <div class="container">
      <div class="hot-tags" v-if="!searchKeyword">
        <h3 class="section-title">热门搜索</h3>
        <div class="tags-list">
          <button 
            v-for="tag in hotTags" 
            :key="tag"
            class="tag-btn"
            @click="searchByTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
      
      <div class="search-results" v-if="searchKeyword">
        <div class="results-header">
          <h3 class="section-title">搜索结果：{{ searchKeyword }}</h3>
          <button class="clear-btn" @click="clearSearch">
            <el-icon><Close /></el-icon>
            清除搜索
          </button>
        </div>
        <div v-if="results.length > 0" class="results-grid">
          <NoteCard v-for="note in results" :key="note.id" :note="note" />
        </div>
        <div v-else class="empty-state">
          <el-icon :size="64" color="#ccc"><Search /></el-icon>
          <p>没有找到相关笔记</p>
          <p class="tip">试试其他关键词吧~</p>
          <button class="btn btn-outline back-btn" @click="clearSearch">返回全部</button>
        </div>
      </div>
      
      <div class="recommend-notes" v-if="!searchKeyword">
        <h3 class="section-title">热门推荐</h3>
        <div class="notes-grid">
          <NoteCard v-for="note in recommendNotes" :key="note.id" :note="note" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'
import NoteCard from '@/components/NoteCard.vue'
import { Search, Close } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const noteStore = useNoteStore()

const hotTags = [
  '咖啡探店',
  '春季穿搭',
  '美食教程',
  '大理旅行',
  '护肤分享',
  '健身打卡',
  '居家好物',
  '书单推荐'
]

const recommendNotes = computed(() => {
  return noteStore.notes.slice(0, 6)
})

const searchKeyword = computed(() => route.query.keyword || '')

const results = computed(() => {
  if (!searchKeyword.value) return []
  return noteStore.searchNotes(searchKeyword.value)
})

const searchByTag = (tag) => {
  router.push({
    path: '/search',
    query: { keyword: tag }
  })
}

const clearSearch = () => {
  router.push({
    path: '/search'
  })
}
</script>

<style scoped>
.search-page {
  padding: 40px 0;
}

.search-header {
  max-width: 500px;
  margin: 0 auto 40px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.hot-tags {
  margin-bottom: 40px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-btn {
  padding: 10px 20px;
  border-radius: var(--radius-xl);
  background: white;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 14px;
  transition: var(--transition);
}

.tag-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background: #FFF5F7;
  transform: translateY(-2px);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  background: var(--bg-color);
  color: var(--text-secondary);
  font-size: 14px;
  transition: var(--transition);
}

.clear-btn:hover {
  background: var(--primary-light);
  color: var(--primary-color);
}

.back-btn {
  margin-top: 20px;
  padding: 10px 24px;
}

.search-results {
}

.results-grid,
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
  padding: 80px 20px;
  color: var(--text-light);
}

.empty-state svg {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 14px;
}

.empty-state .tip {
  font-size: 12px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .search-page {
    padding: 20px 0;
  }
  
  .search-header {
    margin-bottom: 30px;
  }
  
  .results-grid,
  .notes-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .tags-list {
    gap: 8px;
  }
  
  .tag-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>
