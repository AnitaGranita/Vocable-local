<script setup>
import Navbar from './components/Navbar.vue';
</script>


<template>
  <div class=" mx-auto">
    <Navbar />
    <RouterView />
  </div>
</template>


<style>
body{
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
