<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Preloader from './components/Preloader.vue'; 

const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1200);
});
</script>

<template>
  <div class="mx-auto">
    <Preloader v-if="isLoading" />
    <Navbar v-if="!isLoading" />
    <RouterView v-if="!isLoading" />
  </div>
</template>

<style>
body {
  font-family: Tahoma, sans-serif;
}

.wrapperwords {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 548px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-evenly;
}
</style>
