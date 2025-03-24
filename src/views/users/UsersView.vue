<script setup>
// This is the container component for user views
</script>

<template>
  <div class="users-container">
    <h1 class="text-h4 mb-4">{{ $route.name }}</h1>
    
    <!-- This router-view is for nested routes within users -->
    <router-view />
  </div>
</template>

<style scoped>
.users-container {
  padding: 16px;
}
</style>
