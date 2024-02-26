<template>
    <div>
      <!-- Header Content -->
      <div class="custom-header" 
           @mouseenter="handleMouseEnter" 
           @mouseleave="handleMouseLeave">
        <!-- Header Items -->
        <div class="header-item primary">{{ primaryColor }}</div>
        <div class="header-item secondary">{{ secondaryColor }}</div>
        <div class="header-item tertiary">{{ tertiaryColor }}</div>
        
        <!-- Info Icon -->
        <div class="info-icon" v-show="showIcon" @click="openAnnotation">
          <i class="fas fa-info-circle"></i>
        </div>
      </div>
      
      <!-- Annotation Modal -->
      <div class="annotation-modal" v-if="isAnnotationOpen" ref="annotationModal">

        <div class="annotation-content">
          <!-- Your annotation content goes here -->
          This is the annotation content.
        </div>
        <button @click="closeAnnotation">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  import Draggable from 'draggable';
  import {ref, onMounted} from 'vue'
  export default {
    name: 'CustomColorsHeader',
    props: ['params'],
    setup(props) {
        console.log("props...",props)
      const showIcon = ref(false);
      const isAnnotationOpen = ref(false);
  
      const handleMouseEnter = () => {
        showIcon.value = true;
      };
  
      const handleMouseLeave = () => {
        showIcon.value = false;
      };
  
      const openAnnotation = () => {
       
        isAnnotationOpen.value = true;
        // Initialize Draggable for the annotation modal
        new Draggable(document.querySelector('.annotation-modal'), {
            draggable: '.annotation-modal',
            handle: '.annotation-content'
        });
       
      };
  
      const closeAnnotation = () => {
        isAnnotationOpen.value = false;
        
      };

      onMounted(() => {
            const annotationModal = document.querySelector('.annotation-modal');
            if (annotationModal) {
                new Draggable(annotationModal, {
                    draggable: '.annotation-modal',
                    handle: '.annotation-content'
                });
            }
        });
  
      return {
        primaryColor: props.params.column.colDef.primaryColor,
        secondaryColor: props.params.column.colDef.secondaryColor,
        tertiaryColor: props.params.column.colDef.tertiaryColor,
        showIcon,
        handleMouseLeave,
        handleMouseEnter,
        openAnnotation,
        closeAnnotation,
        isAnnotationOpen
      };
    }
  };
  </script>
  
  <style scoped>
  .custom-header {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  
  .header-item {
    padding: 5px 0;
    text-align: left; /* Align text to the left */
  }
  
  .info-icon {
    cursor: pointer;
  }
  
  .annotation-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    z-index: 9999;
  }
  
  .annotation-content {
    margin-bottom: 10px;
    cursor: move; /* Make the content draggable */
  }
  </style>
  