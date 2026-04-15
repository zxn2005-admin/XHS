<template>
  <router-view />
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.initUser()
})
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
