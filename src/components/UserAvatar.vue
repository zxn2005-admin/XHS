<template>
  <div class="user-avatar">
    <img :src="src || defaultAvatar" :alt="alt" class="avatar" :class="sizeClass" />
    <span v-if="showName && name" class="username">{{ name }}</span>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: '头像'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (val) => ['small', 'medium', 'large'].includes(val)
  },
  name: {
    type: String,
    default: ''
  },
  showName: {
    type: Boolean,
    default: false
  }
})

const sizeClass = {
  small: 'avatar-sm',
  medium: 'avatar-md',
  large: 'avatar-lg'
}

const defaultAvatar = 'https://picsum.photos/100/100?random=default'
</script>

<style scoped>
.user-avatar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
}

.avatar-sm {
  width: 32px;
  height: 32px;
}

.avatar-md {
  width: 48px;
  height: 48px;
}

.avatar-lg {
  width: 80px;
  height: 80px;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}
</style>
