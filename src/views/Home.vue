<template>
  <div class="home-page">
    <div class="container">
      <div class="category-tabs">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          class="tab-btn"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>
      
      <div class="waterfall-container">
        <div class="waterfall-column">
          <NoteCard 
            v-for="note in leftColumn" 
            :key="note.id" 
            :note="note" 
          />
        </div>
        <div class="waterfall-column">
          <NoteCard 
            v-for="note in rightColumn" 
            :key="note.id" 
            :note="note" 
          />
        </div>
        <div class="waterfall-column" v-if="!isMobile">
          <NoteCard 
            v-for="note in thirdColumn" 
            :key="note.id" 
            :note="note" 
          />
        </div>
      </div>
      
      <div class="load-more" v-if="hasMore">
        <button class="btn btn-outline" @click="loadMore" :loading="loading">
          {{ loading ? '加载中...' : '加载更多' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import NoteCard from '@/components/NoteCard.vue'

const noteStore = useNoteStore()
const activeCategory = ref(0)
const loading = ref(false)
const hasMore = ref(true)
const isMobile = ref(window.innerWidth < 768)

const categories = [
  { id: 0, name: '推荐' },
  { id: 1, name: '穿搭' },
  { id: 2, name: '美食' },
  { id: 3, name: '旅行' },
  { id: 4, name: '美妆' },
  { id: 5, name: '家居' }
]

const displayedNotes = ref([])

const leftColumn = computed(() => {
  return displayedNotes.value.filter((_, i) => isMobile.value ? i % 2 === 0 : i % 3 === 0)
})

const rightColumn = computed(() => {
  return displayedNotes.value.filter((_, i) => isMobile.value ? i % 2 === 1 : i % 3 === 1)
})

const thirdColumn = computed(() => {
  return displayedNotes.value.filter((_, i) => i % 3 === 2)
})

const loadMore = () => {
  loading.value = true
  setTimeout(() => {
    const start = displayedNotes.value.length
    const end = Math.min(start + 6, noteStore.notes.length)
    if (start < noteStore.notes.length) {
      displayedNotes.value.push(...noteStore.notes.slice(start, end))
    }
    if (displayedNotes.value.length >= noteStore.notes.length) {
      hasMore.value = false
    }
    loading.value = false
  }, 500)
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  displayedNotes.value = noteStore.notes.slice(0, 9)
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
.home-page {
  padding: 30px 0;
}

.category-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 20px;
  border-radius: var(--radius-xl);
  background: white;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 14px;
  transition: var(--transition);
}

.tab-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.tab-btn.active {
  background: var(--primary-gradient);
  border-color: transparent;
  color: white;
}

.waterfall-container {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.waterfall-column {
  flex: 1;
  min-width: 0;
}

.load-more {
  text-align: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .home-page {
    padding: 20px 0;
  }
  
  .category-tabs {
    gap: 8px;
    margin-bottom: 20px;
    overflow-x: auto;
    padding-bottom: 8px;
    flex-wrap: nowrap;
  }
  
  .tab-btn {
    padding: 6px 16px;
    font-size: 13px;
    white-space: nowrap;
  }
  
  .waterfall-container {
    gap: 12px;
  }
}
</style>
