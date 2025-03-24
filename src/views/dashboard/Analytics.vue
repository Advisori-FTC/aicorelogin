<script setup>
import { ref } from 'vue'

// Mock data for analytics charts
const months = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const currentMonth = new Date().getMonth()

// Generate mock data for the last 6 months
const generateMockData = () => {
  const data = []
  for (let i = 0; i < 6; i++) {
    const monthIndex = (currentMonth - 5 + i) % 12
    const month = months[monthIndex >= 0 ? monthIndex : monthIndex + 12]
    const value = Math.floor(Math.random() * 100) + 20
    data.push({ month, value })
  }
  return data
}

const userData = ref(generateMockData())
const sessionData = ref(generateMockData())

// Performance metrics
const performanceMetrics = ref([
  { name: 'CPU-Auslastung', value: '42%', icon: 'mdi-cpu-64-bit', color: 'info' },
  { name: 'Speichernutzung', value: '2.4 GB', icon: 'mdi-memory', color: 'success' },
  { name: 'Durchschn. Ladezeit', value: '1.2s', icon: 'mdi-timer', color: 'warning' },
  { name: 'Erfolgsrate', value: '99.7%', icon: 'mdi-check-circle', color: 'primary' }
])
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-chart-bar</v-icon>
            Nutzungsstatistiken
          </v-card-title>
          <v-card-text>
            <p class="mb-4">Diese Seite zeigt Analysebeispiele mit simulierten Daten. In einer echten Anwendung würden hier reale Daten und interaktive Diagramme angezeigt werden.</p>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="mb-4">
                  <v-card-title>Benutzeraktivität</v-card-title>
                  <v-card-text>
                    <v-sheet height="250">
                      <!-- Simple chart visualization using v-progress-linear -->
                      <div v-for="(item, index) in userData" :key="index" class="my-2">
                        <div class="d-flex justify-space-between">
                          <span>{{ item.month }}</span>
                          <span>{{ item.value }}</span>
                        </div>
                        <v-progress-linear
                          :model-value="item.value"
                          color="primary"
                          height="10"
                          rounded
                        ></v-progress-linear>
                      </div>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="mb-4">
                  <v-card-title>Sitzungsdauer</v-card-title>
                  <v-card-text>
                    <v-sheet height="250">
                      <!-- Simple chart visualization using v-progress-linear -->
                      <div v-for="(item, index) in sessionData" :key="index" class="my-2">
                        <div class="d-flex justify-space-between">
                          <span>{{ item.month }}</span>
                          <span>{{ item.value }} min</span>
                        </div>
                        <v-progress-linear
                          :model-value="item.value"
                          color="accent"
                          height="10"
                          rounded
                        ></v-progress-linear>
                      </div>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <!-- Performance Metrics -->
      <v-col
        v-for="metric in performanceMetrics"
        :key="metric.name"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card elevation="2" class="pa-4">
          <div class="d-flex align-center">
            <v-avatar :color="metric.color" class="mr-4">
              <v-icon color="white">{{ metric.icon }}</v-icon>
            </v-avatar>
            <div>
              <div class="text-subtitle-2">{{ metric.name }}</div>
              <div class="text-h5">{{ metric.value }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
