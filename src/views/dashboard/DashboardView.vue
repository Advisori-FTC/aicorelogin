<script setup>
// This is the container component for dashboard views
</script>

<template>
  <div class="dashboard-container">
    <h1 class="text-h4 mb-4">{{ $route.name }}</h1>
    
    <!-- This router-view is for nested routes within dashboard -->
    <router-view />
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 16px;
}
</style>
