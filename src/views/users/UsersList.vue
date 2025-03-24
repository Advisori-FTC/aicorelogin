<script setup>
import { ref } from 'vue'

// Mock user data
const users = ref([
  { id: 1, name: 'Max Mustermann', email: 'max@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-03-24 08:30' },
  { id: 2, name: 'Anna Schmidt', email: 'anna@example.com', role: 'User', status: 'Active', lastLogin: '2023-03-23 14:15' },
  { id: 3, name: 'Thomas Müller', email: 'thomas@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-03-22 11:45' },
  { id: 4, name: 'Julia Weber', email: 'julia@example.com', role: 'User', status: 'Inactive', lastLogin: '2023-03-20 09:00' },
  { id: 5, name: 'Jan Fischer', email: 'jan@example.com', role: 'User', status: 'Active', lastLogin: '2023-03-24 10:20' },
  { id: 6, name: 'Sarah Becker', email: 'sarah@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-03-23 16:40' },
  { id: 7, name: 'Michael Schulz', email: 'michael@example.com', role: 'User', status: 'Inactive', lastLogin: '2023-03-19 13:10' },
  { id: 8, name: 'Laura Meyer', email: 'laura@example.com', role: 'User', status: 'Active', lastLogin: '2023-03-22 15:30' }
])

// Search filter
const search = ref('')

// Table headers
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'E-Mail', key: 'email' },
  { title: 'Rolle', key: 'role' },
  { title: 'Status', key: 'status' },
  { title: 'Letzter Login', key: 'lastLogin' },
  { title: 'Aktionen', key: 'actions', sortable: false }
]

// Status color mapping
const statusColor = (status) => {
  return status === 'Active' ? 'success' : 'error'
}
</script>

<template>
  <div>
    <v-card class="mb-4">
      <v-card-title>
        <v-row align="center">
          <v-col>Benutzerliste</v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              append-inner-icon="mdi-magnify"
              label="Suche"
              single-line
              hide-details
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          class="elevation-1"
        >
          <!-- Status Column -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="statusColor(item.status)"
              text-color="white"
              size="small"
            >
              {{ item.status }}
            </v-chip>
          </template>
          
          <!-- Actions Column -->
          <template v-slot:item.actions="{ item }">
            <v-icon
              size="small"
              class="mr-2"
              @click="null"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              size="small"
              @click="null"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    
    <v-card>
      <v-card-title>Benutzer-Statistiken</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-card variant="outlined">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ users.length }}</div>
                <div class="text-subtitle-1">Gesamt Benutzer</div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card variant="outlined">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ users.filter(u => u.status === 'Active').length }}</div>
                <div class="text-subtitle-1">Aktive Benutzer</div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card variant="outlined">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ users.filter(u => u.status === 'Inactive').length }}</div>
                <div class="text-subtitle-1">Inaktive Benutzer</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
