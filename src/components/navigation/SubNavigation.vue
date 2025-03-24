<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  mainItem: {
    type: Object,
    required: true
  }
})

const route = useRoute()

// Determine if a sub-route is active
const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <div v-if="mainItem && mainItem.children && mainItem.children.length" class="sub-navigation">
    <v-card flat>
      <v-tabs
        v-model="tab"
        color="primary"
        align-tabs="center"
      >
        <v-tab
          v-for="item in mainItem.children"
          :key="item.path"
          :to="item.path"
          :value="item.path"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-card>
  </div>
</template>

<style scoped>
.sub-navigation {
  margin-bottom: 16px;
}
</style>
