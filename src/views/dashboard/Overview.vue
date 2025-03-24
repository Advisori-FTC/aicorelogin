<script setup>
import { ref } from 'vue'

// Mock data for dashboard
const stats = ref([
  { title: 'Benutzer', value: 254, icon: 'mdi-account-group', color: 'primary' },
  { title: 'Aktive Sitzungen', value: 18, icon: 'mdi-clock', color: 'success' },
  { title: 'Neue Anfragen', value: 12, icon: 'mdi-email', color: 'info' },
  { title: 'Offene Tickets', value: 7, icon: 'mdi-alert', color: 'warning' }
])

// Mock data for recent activities
const recentActivities = ref([
  { id: 1, user: 'Max Mustermann', action: 'Login', time: '09:45', date: 'Heute' },
  { id: 2, user: 'Anna Schmidt', action: 'Profil aktualisiert', time: '12:15', date: 'Heute' },
  { id: 3, user: 'Thomas Müller', action: 'Dokument hochgeladen', time: '15:30', date: 'Gestern' },
  { id: 4, user: 'Julia Weber', action: 'Passwort geändert', time: '17:20', date: 'Gestern' }
])
</script>

<template>
  <div>
    <v-row>
      <!-- Stat Cards -->
      <v-col
        v-for="stat in stats"
        :key="stat.title"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card elevation="2" :color="stat.color" class="pa-4 text-white">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-subtitle-1">{{ stat.title }}</div>
              <div class="text-h4">{{ stat.value }}</div>
            </div>
            <v-icon size="42" icon:color="white">{{ stat.icon }}</v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Activities Section -->
    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Dashboard-Übersicht
          </v-card-title>
          <v-card-text>
            <p>Willkommen zum Dashboard! Hier sehen Sie eine Übersicht über die wichtigsten Aktivitäten und Statistiken.</p>
            <v-divider class="my-4"></v-divider>
            <p>Diese Beispiel-Dashboard-Seite zeigt die grundlegende Struktur und Funktionalität. In einer echten Anwendung würden hier relevante Daten und Diagramme angezeigt werden.</p>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-clock-outline</v-icon>
            Letzte Aktivitäten
          </v-card-title>
          <v-list lines="two">
            <v-list-item
              v-for="activity in recentActivities"
              :key="activity.id"
            >
              <v-list-item-title>{{ activity.user }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ activity.action }} - {{ activity.time }}
                <span class="text-caption">{{ activity.date }}</span>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
