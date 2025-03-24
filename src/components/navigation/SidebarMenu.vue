<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '../../stores/theme'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  expanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:expanded'])

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const authStore = useAuthStore()

// Navigation items
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

// Local state for hover
const isHovered = ref(false)
const localExpanded = computed({
  get: () => props.expanded || isHovered.value,
  set: (value) => emit('update:expanded', value)
})

// Current active route
const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// Get current main menu item
const currentMainItem = computed(() => {
  return navItems.find(item => route.path.startsWith(item.path))
})

// Toggle theme
const toggleTheme = () => {
  themeStore.toggleTheme()
}

// Logout function
const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <v-navigation-drawer
    permanent
    :rail="!localExpanded"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :width="240"
    class="sidebar"
  >
    <v-list>
      <!-- App Logo -->
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        :title="localExpanded ? 'Login App' : ''"
        class="my-4"
      />
      
      <v-divider />
      
      <!-- Navigation Items -->
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.path"
        :active="isActive(item.path)"
        :title="localExpanded ? item.title : ''"
        :prepend-icon="item.icon"
        rounded="lg"
        class="mb-1"
      />

      <v-divider class="my-4" />

      <!-- Theme Toggle -->
      <v-list-item
        @click="toggleTheme"
        :title="localExpanded ? (themeStore.isDark ? 'Helles Theme' : 'Dunkles Theme') : ''"
        :prepend-icon="themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        rounded="lg"
        class="mb-1"
      />
      
      <!-- Logout -->
      <v-list-item
        @click="logout"
        :title="localExpanded ? 'Abmelden' : ''"
        prepend-icon="mdi-logout"
        rounded="lg"
        class="mb-1"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.sidebar {
  background-color: var(--sidebar-background);
  transition: width var(--transition-speed) ease;
}

.v-list-item--active {
  color: var(--sidebar-active) !important;
}
</style>
