<template>
  <div class="note-card card" @click="goDetail">
    <div class="card-image">
      <img :src="note.cover" :alt="note.title" loading="lazy" />
      <div class="card-overlay"></div>
    </div>
    <div class="card-content">
      <h3 class="card-title text-ellipsis-2">{{ note.title }}</h3>
      <p class="card-desc text-ellipsis-2">{{ note.content }}</p>
    </div>
    <div class="card-footer">
      <div class="user-info">
        <img :src="note.user.avatar" class="avatar" />
        <span class="username">{{ note.user.nickname }}</span>
      </div>
      <div class="likes">
        <Cherry :color="noteStore.isLiked(note.id) ? '#FF2442' : '#999'" :fill="noteStore.isLiked(note.id) ? '#FF2442' : 'none'" />
        <span>{{ note.likes }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Cherry } from '@element-plus/icons-vue'
import { useNoteStore } from '@/stores/noteStore'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const noteStore = useNoteStore()

const goDetail = () => {
  router.push(`/note/${props.note.id}`)
}
</script>

<style scoped>
.note-card {
  cursor: pointer;
  break-inside: avoid;
  margin-bottom: 16px;
}

.card-image {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  transition: transform 0.5s ease;
}

.note-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.1));
  opacity: 0;
  transition: var(--transition);
}

.note-card:hover .card-overlay {
  opacity: 1;
}

.card-content {
  padding: 12px 14px 8px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px 14px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-info .avatar {
  width: 24px;
  height: 24px;
  border: none;
  box-shadow: none;
}

.username {
  font-size: 12px;
  color: var(--text-light);
}

.likes {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-light);
}

.likes svg {
  width: 16px;
  height: 16px;
}
</style>
