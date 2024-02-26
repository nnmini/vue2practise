<template>
  <div class="custom-header">
    <div class="header-item primary">Primary Color</div>
    <div class="header-item secondary">Secondary Color</div>
    <div class="header-item tertiary">Tertiary Color</div>
  </div>
</template>

<script>
export default {
  name: 'CustomHeader'
}
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

.primary {
  /* Any specific styling for primary color if needed */
}

.secondary {
  /* Any specific styling for secondary color if needed */
}

.tertiary {
  /* Any specific styling for tertiary color if needed */
}
</style>
