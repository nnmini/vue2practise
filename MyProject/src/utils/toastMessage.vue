<template>
    <div v-if="isVisible" class="toast" :class="[type]">
      {{ message }}
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'success'
      },
      duration: {
        type: Number,
        default: 3000
      }
    },
    setup(props) {
      const isVisible = ref(true);
  
      // Automatically hide the toast after a duration
      watch(() => props.message, () => {
        setTimeout(() => {
          isVisible.value = false;
        }, props.duration);
      });
  
      return {
        isVisible
      };
    }
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    z-index: 9999;
  }
  
  .toast.success {
    background-color: #4CAF50;
  }
  
  .toast.error {
    background-color: #f44336;
  }
  
  .toast.warning {
    background-color: #ff9800;
  }
  </style>
  