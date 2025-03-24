<script setup>
import { ref } from 'vue'

// Mock user data
const user = ref({
  id: 1,
  name: 'Max Mustermann',
  email: 'max@example.com',
  role: 'Admin',
  department: 'IT',
  phone: '+49 123 456789',
  location: 'Berlin',
  joinDate: '2022-01-15',
  bio: 'Systementwickler mit Erfahrung in Frontend- und Backend-Technologien.',
  skills: ['Vue.js', 'JavaScript', 'Node.js', 'SQL', 'Git']
})

// Form state
const editMode = ref(false)
const formData = ref({ ...user.value })
const avatarUrl = ref('https://avatars.githubusercontent.com/u/9064066?v=4') // Example avatar

// Toggle edit mode
const toggleEdit = () => {
  if (editMode.value) {
    // In a real app, this would save changes to the backend
    user.value = { ...formData.value }
    editMode.value = false
  } else {
    formData.value = { ...user.value }
    editMode.value = true
  }
}

// Cancel edit
const cancelEdit = () => {
  formData.value = { ...user.value }
  editMode.value = false
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Benutzerprofil</span>
        <v-btn
          :color="editMode ? 'success' : 'primary'"
          @click="toggleEdit"
        >
          <v-icon start>{{ editMode ? 'mdi-content-save' : 'mdi-pencil' }}</v-icon>
          {{ editMode ? 'Speichern' : 'Bearbeiten' }}
        </v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <!-- Profile Picture Section -->
          <v-col cols="12" md="3">
            <div class="text-center">
              <v-avatar size="150" class="mb-3">
                <v-img :src="avatarUrl" alt="Avatar"></v-img>
              </v-avatar>
              
              <div v-if="editMode">
                <v-btn size="small" class="mt-2">
                  <v-icon start>mdi-camera</v-icon>
                  Bild ändern
                </v-btn>
              </div>
              
              <div class="mt-4">
                <v-chip v-for="skill in user.skills" :key="skill" class="ma-1">
                  {{ skill }}
                </v-chip>
              </div>
            </div>
          </v-col>
          
          <!-- Profile Details Section -->
          <v-col cols="12" md="9">
            <v-row>
              <!-- Display Mode -->
              <template v-if="!editMode">
                <v-col cols="12" md="6">
                  <v-list>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-account</v-icon>
                      </template>
                      <v-list-item-title>Name</v-list-item-title>
                      <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                    </v-list-item>
                    
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-email</v-icon>
                      </template>
                      <v-list-item-title>E-Mail</v-list-item-title>
                      <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    </v-list-item>
                    
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-phone</v-icon>
                      </template>
                      <v-list-item-title>Telefon</v-list-item-title>
                      <v-list-item-subtitle>{{ user.phone }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-list>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-shield-account</v-icon>
                      </template>
                      <v-list-item-title>Rolle</v-list-item-title>
                      <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
                    </v-list-item>
                    
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-domain</v-icon>
                      </template>
                      <v-list-item-title>Abteilung</v-list-item-title>
                      <v-list-item-subtitle>{{ user.department }}</v-list-item-subtitle>
                    </v-list-item>
                    
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-map-marker</v-icon>
                      </template>
                      <v-list-item-title>Standort</v-list-item-title>
                      <v-list-item-subtitle>{{ user.location }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
                
                <v-col cols="12">
                  <v-card variant="outlined" class="mt-2">
                    <v-card-title>
                      <v-icon start>mdi-information</v-icon>
                      Über
                    </v-card-title>
                    <v-card-text>{{ user.bio }}</v-card-text>
                  </v-card>
                </v-col>
              </template>
              
              <!-- Edit Mode -->
              <template v-else>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.name"
                    label="Name"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    class="mb-2"
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="formData.email"
                    label="E-Mail"
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    class="mb-2"
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="formData.phone"
                    label="Telefon"
                    variant="outlined"
                    prepend-inner-icon="mdi-phone"
                    class="mb-2"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.role"
                    label="Rolle"
                    :items="['Admin', 'User', 'Editor']"
                    variant="outlined"
                    prepend-inner-icon="mdi-shield-account"
                    class="mb-2"
                  ></v-select>
                  
                  <v-text-field
                    v-model="formData.department"
                    label="Abteilung"
                    variant="outlined"
                    prepend-inner-icon="mdi-domain"
                    class="mb-2"
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="formData.location"
                    label="Standort"
                    variant="outlined"
                    prepend-inner-icon="mdi-map-marker"
                    class="mb-2"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.bio"
                    label="Über"
                    variant="outlined"
                    rows="4"
                    prepend-inner-icon="mdi-information"
                  ></v-textarea>
                  
                  <v-btn color="error" variant="outlined" @click="cancelEdit" class="mt-2">
                    <v-icon start>mdi-cancel</v-icon>
                    Abbrechen
                  </v-btn>
                </v-col>
              </template>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
