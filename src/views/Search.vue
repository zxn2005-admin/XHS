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
            清除搜索
          </button>
        </div>
        <div v-if="results.length > 0" class="results-grid">
          <NoteCard v-for="note in results" :key="note.id" :note="note" />
        </div>
        <div v-else class="empty-state">
          <Search />
          <p>没有找到相关笔记</p>
          <p class="tip">试试其他关键词吧~</p>
          <button class="clear-btn" @click="clearSearch">
            清除搜索条件
          </button>
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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'
import NoteCard from '@/components/NoteCard.vue'
import { Search } from '@element-plus/icons-vue'

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
  if (searchKeyword.value === tag) {
    clearSearch()
    return
  }
  router.push({
    path: '/search',
    query: { keyword: tag }
  })
}

const clearSearch = () => {
  router.push({
    path: '/search',
    query: {}
  })
}
</script>

<style scoped>
.search-page {
  padding: 40px 0;
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
  cursor: pointer;
}

.tag-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background: #FFF5F7;
  transform: translateY(-2px);
}

.tag-btn.active {
  background: var(--primary-gradient);
  border-color: transparent;
  color: white;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.results-header .section-title {
  margin-bottom: 0;
}

.clear-btn {
  padding: 8px 16px;
  border-radius: var(--radius-md);
  background: white;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.clear-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
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
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .search-page {
    padding: 20px 0;
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
