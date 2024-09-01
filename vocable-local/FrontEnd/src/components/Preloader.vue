<template>
    <div class="preloader" v-if="isLoading">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: true
      };
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1200);
    }
  };
  </script>
  
  <style scoped>
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .spinner {
    border: 4px solid rgba(26, 0, 194, 0.1);
    border-left: 4px solid #2e65e7;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  