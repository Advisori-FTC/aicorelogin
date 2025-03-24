<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarMenu from '../components/navigation/SidebarMenu.vue'
import SubNavigation from '../components/navigation/SubNavigation.vue'

// Sidebar expanded state
const sidebarExpanded = ref(false)

// Get current route
const route = useRoute()

// Navigation items (same as in SidebarMenu for consistency)
const navItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    path: '/app/dashboard',
    children: [
      { title: 'Übersicht', path: '/app/dashboard/overview' },
      { title: 'Analytik', path: '/app/dashboard/analytics' }
    ]
  },
  {
    title: 'Benutzer',
    icon: 'mdi-account-group',
    path: '/app/users',
    children: [
      { title: 'Benutzerliste', path: '/app/users/list' },
      { title: 'Benutzerprofil', path: '/app/users/profile' }
    ]
  },
  {
    title: 'Einstellungen',
    icon: 'mdi-cog',
    path: '/app/settings'
  }
]

// Get current main menu item for SubNavigation
const currentMainItem = computed(() => {
  return navItems.find(item => route.path.startsWith(item.path))
})
</script>

<template>
  <div class="app-container">
    <!-- Sidebar Menu -->
    <SidebarMenu v-model:expanded="sidebarExpanded" />
    
    <!-- Main Content -->
    <div class="content-container" :class="{ 'content-shifted': sidebarExpanded }">
      <!-- Sub Navigation if applicable -->
      <SubNavigation v-if="currentMainItem" :mainItem="currentMainItem" />
      
      <!-- Page Content -->
      <v-fade-transition>
        <router-view />
      </v-fade-transition>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.content-container {
  flex: 1;
  padding: 16px;
  transition: padding-left var(--transition-speed) ease;
}

.content-shifted {
  padding-left: 256px;
}
</style>
