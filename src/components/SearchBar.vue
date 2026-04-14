<template>
  <div class="search-bar">
    <el-input
      v-model="keyword"
      placeholder="搜索笔记、标签、用户..."
      prefix-icon="Search"
      class="search-input"
      @keyup.enter="handleSearch"
      @clear="handleClear"
      clearable
    />
    <button class="search-btn" @click="handleSearch">搜索</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const keyword = ref(route.query.keyword || '')

watch(() => route.query.keyword, (newVal) => {
  keyword.value = newVal || ''
})

const handleSearch = () => {
  if (keyword.value.trim()) {
    router.push({
      path: '/search',
      query: { keyword: keyword.value.trim() }
    })
  }
}

const handleClear = () => {
  keyword.value = ''
  router.push({
    path: '/search'
  })
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: var(--radius-xl);
  background: var(--bg-color);
  box-shadow: none;
  padding: 6px 16px;
  transition: var(--transition);
}

.search-input :deep(.el-input__wrapper:hover),
.search-input :deep(.el-input__wrapper.is-focus) {
  background: white;
  box-shadow: 0 0 0 2px var(--primary-light);
}

.search-input :deep(.el-input__inner) {
  font-size: 14px;
}

.search-btn {
  padding: 8px 20px;
  border-radius: var(--radius-xl);
  background: var(--primary-gradient);
  color: white;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.search-btn:hover {
  box-shadow: 0 4px 12px rgba(255, 36, 66, 0.3);
}
</style>
